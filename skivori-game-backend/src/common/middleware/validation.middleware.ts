import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.method === 'POST') {
      const { balance } = req.body;
      if (typeof balance !== 'number') {
        throw new BadRequestException('The "balance" field must be a number');
      }
    }
    next();
  }
}
