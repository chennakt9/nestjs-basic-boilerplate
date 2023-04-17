import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING } from './constants/services';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING) private readonly billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest, authentication: string) {
    const trxn = await this.ordersRepository.startTransaction();
    try {
      const order = this.ordersRepository.create(request); // pass { session: trxn } as 2nd param
      /*
        Currently transactions will not work as we are not using replica set
        To make transactions work, add a replica set in docker-compose.yml
      */
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
          Authentication: authentication,
          trxn,
        }),
      );

      this.ordersRepository.commitTransaction(trxn);

      return order;
    } catch (error) {
      this.ordersRepository.abortTransaction(trxn);
      throw error;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
