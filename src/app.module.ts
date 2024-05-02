import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './app/account/account.module';
import { AuthModule } from './app/auth/auth.module';
import { DatabaseModule } from './app/database/database.module';
import { DormitoryModule } from './app/dormitory/dormitory.module';
import { LoggerModule } from './app/logger/logger.module';
import { ProfileModule } from './app/profile/profile.module';
import { TransactionModule } from './app/transaction/transaction.module';
import { MainModule } from './app/main/main.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    DatabaseModule.forRootAsync({
      useFactory: () => ({
        logs: false,
      }),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    AccountModule,
    AuthModule,
    DormitoryModule,
    ProfileModule,
    TransactionModule,
    DatabaseModule,
    LoggerModule,
    MainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
