import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClueScrollHelper } from 'osrs-tools';
import { OsrsAssetsService } from '../services/osrs-assets.service';

interface CasketReward {
  items: any[];
  count: number;
}

interface LootItem {
  name: string;
  quantity: number;
  image?: string;
}

interface OpeningRecord {
  casketType: string;
  items: any[];
  timestamp: Date;
}

@Component({
  selector: 'app-casket-simulator',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './casket-simulator.component.html',
  styleUrls: ['./casket-simulator.component.scss'],
})
export class CasketSimulatorComponent implements OnInit {
  public selectedCasketType: string = 'easy';
  public quantity: number = 1;
  public clueHelper = ClueScrollHelper;
  public clueForm: UntypedFormGroup | undefined;
  public Math = Math;

  public casketTypes: string[] = [
    'beginner',
    'easy',
    'medium',
    'hard',
    'elite',
    'master',
  ];

  public totalLoot: LootItem[] = [];
  public latestOpening: OpeningRecord | null = null;
  public activeTab: 'latest' | 'total' = 'latest';
  public openingHistory: OpeningRecord[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clueForm = this.fb.group({
      casketType: ['easy'],
      quantity: [1],
    });
  }

  public selectCasket(casketType: string): void {
    this.selectedCasketType = casketType;
  }

  public simulate(): void {
    if (this.quantity < 1) {
      this.quantity = 1;
    }

    for (let i = 0; i < this.quantity; i++) {
      const result = (this.clueHelper as any).openCasket(
        this.selectedCasketType,
      );

      // Update latest opening
      this.latestOpening = {
        casketType: this.selectedCasketType,
        items: result.items,
        timestamp: new Date(),
      };

      // Add to history
      this.openingHistory.unshift(this.latestOpening);

      // Update total loot
      this.updateTotalLoot(result.items);
    }

    // Switch to latest tab to show results
    this.activeTab = 'latest';
  }

  private updateTotalLoot(items: any[]): void {
    for (const item of items) {
      const itemName = item.name || String(item);
      const existingItem = this.totalLoot.find((l) => l.name === itemName);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.totalLoot.push({
          name: itemName,
          quantity: 1,
          image: this.getItemImage(itemName),
        });
      }
    }

    // Sort by quantity descending
    this.totalLoot.sort((a, b) => b.quantity - a.quantity);
  }

  public resetLoot(): void {
    this.totalLoot = [];
    this.latestOpening = null;
    this.openingHistory = [];
  }

  public getCasketImage(casketType: string): string {
    // Convert item name to image filename (lowercase, hyphens)
    return `assets/items/reward-casket-${casketType.toLowerCase()}.png`;
  }

  public getItemImage(itemName: string): string {
    // Convert item name to image filename (lowercase, hyphens)
    const filename = itemName.toLowerCase().replace(/ /g, '-');
    return `assets/items/${filename}.png`;
  }

  public switchTab(tab: 'latest' | 'total'): void {
    this.activeTab = tab;
  }
}
