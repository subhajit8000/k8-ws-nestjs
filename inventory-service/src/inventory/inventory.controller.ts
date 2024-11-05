import { Controller, Get, Post, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Ingredient } from './ingredient.model';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('stock')
  getStock(): Record<string, Ingredient> {
    const stock = this.inventoryService.getStock();
    const stockObject: Record<string, Ingredient> = {};
    stock.forEach((value, key) => {
      stockObject[key] = value;
    });
    return stockObject;
  }

  @Post('used')
  useIngredient(@Body() ingredients: Record<string, number>): boolean {
    return this.inventoryService.useIngredients(ingredients);
  }
}