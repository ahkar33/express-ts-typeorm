import { Request, Response, NextFunction } from "express";

const handleJSONParsingError = (
	err: any,
	_: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof SyntaxError) {
		// Handle JSON parsing error
		return res.status(400).json({ error: ["Invalid JSON format"] });
	}
	next();
};

export default handleJSONParsingError;
