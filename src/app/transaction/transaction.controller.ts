import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { TransactionService } from './transaction.service';

@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Get()
  async getTransactions(@Req() req: any) {
    const id = req.payload.id;

    return await this.service.getTransactions(id);
  }

  @Get('/:id')
  async getTransaction(@Req() req: any, @Param('id') transactionId: string) {
    const id = req.payload.id;

    return await this.service.getTransaction(id, transactionId);
  }
}
