import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Order } from './order.model';
import * as dotenv from 'dotenv';

@Injectable()
export class OrderService {
  private readonly inventoryUrl = process.env.INVENTORY_URL;
  private readonly coffees = {
    cappuccino: { espressoShot: 1, milk: 200, milkFoam: 50 },
    americano: { espressoShot: 1, hotWater: 150 },
  };

  constructor(private readonly httpService: HttpService) {}

  async placeOrder(coffeeType: string, quantity: number): Promise<Order> {
    const ingredients = this.getIngredient(coffeeType, quantity);
    const response = await this.httpService
      .post(`${this.inventoryUrl}/inventory/used`, ingredients)
      .toPromise();

    if (response.data) {
      return { coffeeType, quantity, status: 'Confirmed' };
    } else {
      return { coffeeType, quantity, status: 'Out of Stock' };
    }
  }

  private getIngredient(coffeeType: string, quantity: number) {
    const ingredients = { ...this.coffees[coffeeType] };
    for (const key in ingredients) {
      ingredients[key] *= quantity;
    }
    return ingredients;
  }
}