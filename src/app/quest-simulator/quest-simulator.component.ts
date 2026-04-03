import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestTool } from 'osrs-tools';
import { Quest } from 'osrs-tools/quest';

interface RequirementData {
  skillName?: string;
  level?: number;
  questName?: string;
  questRequired?: number;
  itemRequired?: boolean;
  [key: string]: any;
}

interface DisplayReward {
  type: 'skill' | 'item' | 'questpoints' | 'money' | 'misc';
  label: string;
  value: string | number;
  icon?: string;
}

@Component({
  selector: 'app-quest-simulator',
  imports: [CommonModule, FormsModule],
  templateUrl: './quest-simulator.component.html',
  styleUrl: './quest-simulator.component.scss',
})
export class QuestSimulatorComponent implements OnInit {
  allQuests: Quest[] = [];
  filteredQuests: Quest[] = [];
  selectedQuest: Quest | null = null;
  searchTerm: string = '';
  questTool = QuestTool;

  ngOnInit(): void {
    this.loadAllQuests();
  }

  loadAllQuests(): void {
    try {
      const quests = this.questTool.getAllQuests() as Quest[];
      this.allQuests = quests.filter((q) => q && q.name);
      this.filteredQuests = [...this.allQuests];
    } catch (error) {
      console.error('Error loading quests:', error);
      this.allQuests = [];
      this.filteredQuests = [];
    }
  }

  searchQuests(): void {
    if (!this.searchTerm.trim()) {
      this.filteredQuests = [...this.allQuests];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredQuests = this.allQuests.filter((quest) =>
        quest.name.toLowerCase().includes(term),
      );
    }
  }

  selectQuest(quest: Quest): void {
    this.selectedQuest = quest;
  }

  clearSelection(): void {
    this.selectedQuest = null;
  }

  getRequirementLabel(req: RequirementData): string {
    if (req.skillName) {
      return `${req.skillName} Level ${req.level || 0}`;
    }
    if (req.questName) {
      return `Quest: ${req.questName}`;
    }
    if (req.itemRequired) {
      return 'Item Required';
    }
    return JSON.stringify(req);
  }

  /**
   * Transform complex rewards object into a displayable array of typed rewards
   */
  getRewardsList(): DisplayReward[] {
    if (!this.selectedQuest?.rewards) return [];

    const rewards: DisplayReward[] = [];
    const rewardObj = this.selectedQuest.rewards as any;

    // Handle skill rewards (experience/xp in specific skills)
    if (rewardObj.experience) {
      Object.entries(rewardObj.experience).forEach(([skill, xp]) => {
        rewards.push({
          type: 'skill',
          label: `${this.formatSkillName(skill)} Experience`,
          value: Number(xp),
          icon: '✨',
        });
      });
    }

    // Handle quest points
    if (rewardObj.questPoints !== undefined && rewardObj.questPoints > 0) {
      rewards.push({
        type: 'questpoints',
        label: 'Quest Points',
        value: Number(rewardObj.questPoints),
        icon: '🎯',
      });
    }

    // Handle items
    if (rewardObj.items && Array.isArray(rewardObj.items)) {
      rewardObj.items.forEach((item: any) => {
        const name = item.name || item.id || 'Unknown Item';
        const quantity = item.quantity || 1;
        rewards.push({
          type: 'item',
          label: quantity > 1 ? `${name} (x${quantity})` : name,
          value: Number(quantity),
          icon: '📦',
        });
      });
    }

    // Handle money/coins
    if (rewardObj.coins !== undefined && rewardObj.coins > 0) {
      rewards.push({
        type: 'money',
        label: 'Coins',
        value: Number(rewardObj.coins),
        icon: '💰',
      });
    }

    // Handle other miscellaneous rewards
    const knownKeys = ['experience', 'questPoints', 'items', 'coins'];
    Object.entries(rewardObj).forEach(([key, value]) => {
      if (!knownKeys.includes(key) && value && typeof value === 'object') {
        rewards.push({
          type: 'misc',
          label: this.formatLabel(key),
          value: JSON.stringify(value),
          icon: '🎁',
        });
      }
    });

    return rewards;
  }

  /**
   * Format skill names for display (e.g., 'attack' -> 'Attack')
   */
  private formatSkillName(skill: string): string {
    return skill
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Format generic labels for display
   */
  private formatLabel(label: string): string {
    return label
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  /**
   * Get styling class based on reward type
   */
  getRewardTypeClass(type: string): string {
    return `reward-${type}`;
  }

  isMiniQuest(quest: Quest): boolean {
    return quest['miniquest'] === true;
  }
}
