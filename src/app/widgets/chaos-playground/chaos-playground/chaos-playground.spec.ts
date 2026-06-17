import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaosPlaygroundComponent as ChaosPlayground } from './chaos-playground.component';

describe('ChaosPlayground', () => {
  let component: ChaosPlayground;
  let fixture: ComponentFixture<ChaosPlayground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChaosPlayground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaosPlayground);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
