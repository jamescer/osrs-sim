import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestSimulatorComponent } from './quest-simulator.component';

describe('QuestSimulatorComponent', () => {
  let component: QuestSimulatorComponent;
  let fixture: ComponentFixture<QuestSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestSimulatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all quests on init', () => {
    expect(component.allQuests.length).toBeGreaterThan(0);
  });

  it('should filter quests by search term', () => {
    component.searchTerm = 'dragon';
    component.searchQuests();
    const allMatching = component.filteredQuests.every((q) =>
      q.name.toLowerCase().includes('dragon'),
    );
    expect(allMatching).toBeTruthy();
  });

  it('should select a quest', () => {
    const firstQuest = component.allQuests[0];
    component.selectQuest(firstQuest);
    expect(component.selectedQuest).toBe(firstQuest);
  });

  it('should clear selection', () => {
    component.selectedQuest = component.allQuests[0];
    component.clearSelection();
    expect(component.selectedQuest).toBeNull();
  });

});
