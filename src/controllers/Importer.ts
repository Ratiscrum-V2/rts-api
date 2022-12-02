import { NextFunction, Request, response, Response } from "express";
import { Choice } from "../models/Choice";
import { Question } from "../models/Question";

export async function importer(request: Request, response: Response, next: NextFunction) {
    const json = request.body;

    const q = await Question.create({ 
        title: request.body.question,
        description: request.body.answer,
        medias: request.body.medias
    });

    for(const c of request.body.choices) {
        await Choice.create({
            label: c.name,
            value: "",
            questionId: q.id,
            effects: c.effects
        })
    }

    response.send("C'bon");
}