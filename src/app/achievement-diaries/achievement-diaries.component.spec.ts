import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementDiariesComponent } from './achievement-diaries.component';

describe('AchievementDiariesComponent', () => {
  let component: AchievementDiariesComponent;
  let fixture: ComponentFixture<AchievementDiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementDiariesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AchievementDiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
