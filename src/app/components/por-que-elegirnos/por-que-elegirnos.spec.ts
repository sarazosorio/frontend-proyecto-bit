import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorQueElegirnos } from './por-que-elegirnos';

describe('PorQueElegirnos', () => {
  let component: PorQueElegirnos;
  let fixture: ComponentFixture<PorQueElegirnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorQueElegirnos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorQueElegirnos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
