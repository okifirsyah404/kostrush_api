import { DynamicModule, Global, Module } from '@nestjs/common';
import { MainLogger } from './logger.service';

/**
 * Module for injecting a logger service as singleton to other depedency.
 *
 * This module following NestJS modular pattern.
 *
 * @example
 * Module({
 *  imports: [
 *   LoggerModule,
 *  ],
 *  controllers: [AppController],
 *  providers: [AppService],
 * })
 * export class AppModule {}
 */

@Global()
@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggerModule,
      providers: [MainLogger],
      exports: [MainLogger],
    };
  }
}
