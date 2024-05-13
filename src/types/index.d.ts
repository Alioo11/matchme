import type { Request, Response } from "express";

type visa_status = "true" | "false" | "unknown";
type platform = "io-consultancy";

type httpHandler = (req: Request, res: Response) => any
