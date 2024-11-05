import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('place')
  placeOrder(
    @Query('coffeeType') coffeeType: string = 'cappuccino',
    @Query('quantity') quantity: string = '1',
  ): Promise<Order> {
    return this.orderService.placeOrder(coffeeType, parseInt(quantity));
  }
}