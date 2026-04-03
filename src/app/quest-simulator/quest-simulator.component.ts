import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestTool } from 'osrs-tools';

interface QuestData {
  name: string;
  [key: string]: any;
}

interface RequirementData {
  skillName?: string;
  level?: number;
  questName?: string;
  questRequired?: number;
  itemRequired?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'app-quest-simulator',
  imports: [CommonModule, FormsModule],
  templateUrl: './quest-simulator.component.html',
  styleUrl: './quest-simulator.component.scss',
})
export class QuestSimulatorComponent implements OnInit {
  allQuests: QuestData[] = [];
  filteredQuests: QuestData[] = [];
  selectedQuest: QuestData | null = null;
  searchTerm: string = '';
  questTool = QuestTool;

  ngOnInit(): void {
    this.loadAllQuests();
  }

  loadAllQuests(): void {
    try {
      const quests = this.questTool.getAllQuests() as QuestData[];
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

  selectQuest(quest: QuestData): void {
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

  getRewardLabel(reward: RequirementData): string {
    if (reward.skillName) {
      const xp = reward['experience'] || reward['xp'] || 0;
      return `${reward.skillName} ${xp} XP`;
    }
    if (reward['questPoints'] !== undefined) {
      return `${reward['questPoints']} Quest Points`;
    }
    return JSON.stringify(reward);
  }

  isMiniQuest(quest: QuestData): boolean {
    return quest['miniquest'] === true;
  }
}
