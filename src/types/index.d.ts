import type { Request, Response } from "express";

type visa_status = "true" | "false" | "unknown";

type platform = "career-jet-(EUROPE)" | "career-jet-(USA)";

type httpHandler = (req: Request, res: Response) => any
