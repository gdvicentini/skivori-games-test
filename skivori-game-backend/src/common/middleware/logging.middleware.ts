import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;

    // Log about req details
    console.log(`[${timestamp}] ${method} ${url}`);

    next();
  }
}
