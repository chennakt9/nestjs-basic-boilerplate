import { JwtAuthGuard } from '@app/common';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() body: CreateOrderRequest, @Req() req) {
    console.log('hey');
    console.log('lkasd klsdf', req.user);
    return this.ordersService.createOrder(body, req.cookies?.Authentication);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
