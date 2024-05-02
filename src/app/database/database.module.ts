import { DynamicModule, Global, Module, ModuleMetadata } from '@nestjs/common';
import { DiNameConstant } from '../constant/di-name.constant';
import { MainLogger } from '../logger/logger.service';
import { DatabaseService } from './database.service';

@Global()
@Module({})
export class DatabaseModule {
  private static _providers: any[] = [DatabaseService];

  static forRoot(option?: PrismaModuleOptions) {
    return {
      module: DatabaseModule,
      imports: [],
      providers: [
        {
          provide: DiNameConstant.PRISMA_MODULE_OPTIONS,
          useValue: option,
        },
        ...this._providers,
      ],
      exports: [DatabaseService],
    };
  }

  static forRootAsync(option?: PrismaModuleAsyncOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: option?.imports || [],
      providers: [
        {
          inject: option?.inject || [],
          provide: DiNameConstant.PRISMA_MODULE_OPTIONS,
          useFactory: async (...args: any[]) => {
            const result = await option?.useFactory?.(...args);
            return result;
          },
        },
        ...this._providers,
      ],
      exports: [DatabaseService],
    };
  }
}

export interface PrismaModuleOptions {
  logs?: boolean;
  loggingInstance?: MainLogger;
  imports?: any[];
}

export interface PrismaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<PrismaModuleOptions> | PrismaModuleOptions;
  inject?: any[];
  imports?: any[];
}
