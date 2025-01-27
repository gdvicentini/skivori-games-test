import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { SlotMachineModule } from './slot-machine/slot-machine.module';
import { ValidationMiddleware } from './common/middleware/validation.middleware';
import { LoggingMiddleware } from './common/middleware/logging.middleware';

@Module({
  imports: [GamesModule, SlotMachineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware de validação aplicado à rota "/spin"
    consumer.apply(ValidationMiddleware).forRoutes('slot-machine/spin');

    // Middleware de logging aplicado globalmente
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
