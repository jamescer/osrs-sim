import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasketSimulatorComponent } from './casket-simulator.component';

describe('CasketSimulatorComponent', () => {
  let component: CasketSimulatorComponent;
  let fixture: ComponentFixture<CasketSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasketSimulatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CasketSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
