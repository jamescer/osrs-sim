import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlayerSimulatorComponent } from './slayer-simulator.component';

describe('SlayerSimulatorComponent', () => {
  let component: SlayerSimulatorComponent;
  let fixture: ComponentFixture<SlayerSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlayerSimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlayerSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
