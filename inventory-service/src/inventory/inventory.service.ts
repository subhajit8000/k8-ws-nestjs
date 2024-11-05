import { Injectable } from '@nestjs/common';
import { Ingredient } from './ingredient.model';
import * as dotenv from 'dotenv';

@Injectable()
export class InventoryService {
  private readonly stock: Map<string, Ingredient> = new Map();

  constructor() {
    this.initializeInventory();
  }

  private initializeInventory() {
    this.stock.set('espressoShot', new Ingredient('Espresso Shot', Number(process.env.ESPRESSO_SHOT_QUANTITY)));
    this.stock.set('milk', new Ingredient('Milk', Number(process.env.MILK_QUANIITY)));
    this.stock.set('milkFoam', new Ingredient('Milk Foam', Number(process.env.MILK_FOAM_QUANTITY)));
    this.stock.set('hotWater', new Ingredient('Hot Water', Number(process.env.HOT_WATER_QUANTITY)));
  }

  getStock(): Map<string, Ingredient> {
    return this.stock;
  }

  useIngredients(ingredients: Record<string, number>): boolean {
    for (const [ingredient, quantity] of Object.entries(ingredients)) {
      const item = this.stock.get(ingredient);
      if (!item || item.quantity < quantity) {
        return false;
      }
    }

    for (const [ingredient, quantity] of Object.entries(ingredients)) {
      const item = this.stock.get(ingredient);
      item.quantity -= quantity;
    }

    return true;
  }
}