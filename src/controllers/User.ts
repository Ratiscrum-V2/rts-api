import { NextFunction, Request, Response } from "express";
import { Op, ValidationError } from "sequelize";
import { User } from "../models/User";
import InexistantResourceError from "../types/errors/InexistantResourceError";
import InvalidBodyError from "../types/errors/InvalidBodyError";
import InvalidPasswordError from "../types/errors/InvalidPasswordError";
import RessourceAlreadyExistError from "../types/errors/RessourceAlreadyExistError";
import { UserInput } from "../types/models/User";
import {
  isLoginCredentials,
  isRegisterCredentials,
} from "../types/utils/Credentials";
import Hash from "../utils/Hash";
import { encodeSession } from "../utils/Token";
import { generateSecret } from "node-2fa";
import { validate2FA } from "../utils/Session";

export async function register(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  if (!isRegisterCredentials(request.body)) {
    next({
      message: "Invalid request body",
      code: 400,
      name: "InvalidBodyError",
    } as InvalidBodyError);
    return;
  }

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        { email: request.body.email },
        { nickname: request.body.nickname },
      ],
    },
  });

  if (existingUser) {
    next({
      message: "User already exist",
      code: 409,
      name: "RessourceAlreadyExistError",
    } as RessourceAlreadyExistError);
    return;
  }

  const hasher = new Hash();
  const hashedPassword = hasher.hash(request.body.password);

  const input: UserInput = {
    email: request.body.email,
    nickname: request.body.nickname,
    hashedPassword,
  };

  try {
    await User.create(input);
  } catch (error) {
    if (error instanceof ValidationError)
      return next({
        message: error.message,
        code: 400,
        name: "InvalidBodyError",
      } as InvalidBodyError);

    return next(error);
  }

  response.json({ message: "User created ! Please log in" });
  return;
}

export async function login(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  if (!isLoginCredentials(request.body)) {
    next({
      message: "Invalid request body",
      code: 400,
      name: "InvalidBodyError",
    } as InvalidBodyError);
    return;
  }

  const existingUser = await User.findOne({
    where: {
      email: request.body.email,
    },
  });

  if (!existingUser) {
    next({
      message: "Inexistant user",
      code: 404,
      name: "InexistantResourceError",
    } as InexistantResourceError);
    return;
  }

  const hasher = new Hash();

  if (!hasher.compare(request.body.password, existingUser.hashedPassword)) {
    next({
      code: 400,
      message: "Invalid password",
      name: "InvalidPasswordError",
    } as InvalidPasswordError);
    return;
  }

  if(existingUser.TWOFASecret) {
	response.json({ message: "Please enter 2FA code" });
	return;
  }

  const session = encodeSession({
    id: existingUser.id,
    username: existingUser.nickname,
    dateCreated: Date.now(),
  });

  response
    .status(200)
    .json({ message: "Logged in", session, email: existingUser.email });
}

export async function me(request: Request, response: Response) {
  const user = await User.findByPk(response.locals.session.id, {
    attributes: {
      exclude: ["hashedPassword", "TWOFAtoken"],
    },
  });

  response.json(user);
}

export async function enableTwoFactorAuth(request: Request, response: Response) {

	const newSecret = generateSecret({ account: response.locals.user.nickname, name: "Ratisexe" });

	response.locals.user.update({ TWOFASecret: newSecret.secret });

	response.json(newSecret);
}

export async function verifyTwoFactorAuth(request: Request, response: Response, next: NextFunction) {
	if(!request.body.token) {	
		return next({ code: 400, message: "Missing token", name: "InvalidBodyError" } as InvalidBodyError);
	}

	if(!validate2FA(response.locals.user, request.body.token)) {
		response.json({ message: "Invalid token" })
	}

	response.json({ message: "Valid token" })
}

export async function logWithToken(request: Request, response: Response, next: NextFunction) {
	if(request.body.email !== undefined) {
		next({ code: 400, message: "Missing mail", name: "InvalidBodyError"  } as InvalidBodyError);
		return;
	}

	if(request.body.token !== undefined) {
		next({ code: 400, message: "Missing token", name: "InvalidBodyError"  } as InvalidBodyError);
		return;
	}

	const existingUser = await User.findOne({
		where: {
		  email: request.body.email,
		},
	  });
	
	if (!existingUser) {
		next({
			message: "Inexistant user",
			code: 404,
			name: "InexistantResourceError",
		} as InexistantResourceError);
		return;
	}
	

	if(!validate2FA(existingUser, request.body.token)) {
		response.json({ message: "Invalid token" });
	}

	const session = encodeSession({
		id: existingUser.id,
		username: existingUser.nickname,
		dateCreated: Date.now(),
	  });

	response
		.status(200)
		.json({ message: "Logged in", session, email: existingUser.email });
}