import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OsrsAssetsService {
  private readonly ASSETS_PATH = '/assets/items';

  getCasketImagePath(casketType: string): string {
    return `${this.ASSETS_PATH}/reward-casket-${casketType.toLowerCase()}.png`;
  }

  getItemImagePath(itemName: string): string {
    const formattedName = itemName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    return `${this.ASSETS_PATH}/${formattedName}.png`;
  }

  getAllCasketTypes(): { type: string; image: string }[] {
    const types = ['beginner', 'easy', 'medium', 'hard', 'elite', 'master'];
    return types.map(type => ({
      type,
      image: this.getCasketImagePath(type)
    }));
  }
}
