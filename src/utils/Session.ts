import { User } from "../models/User";
import { Session } from "../types/utils/Session";
import { verifyToken } from "node-2fa";

export async function getSessionUser(session: Session): Promise<User> {

	const user: User | null = await User.findByPk(session.id, {
		attributes: {
			exclude: [
				"hashedPassword"
			]
		}
	});

	if(!user)
		throw new Error("No user in this session");
	
	return user;
}

export async function validate2FA(user: User, token: string): Promise<boolean> {

	if(!user.TWOFASecret)
		return false;

	const res = verifyToken(user.TWOFASecret, token);

	if(!res?.delta)
		return false;

	return res?.delta === 0;
}