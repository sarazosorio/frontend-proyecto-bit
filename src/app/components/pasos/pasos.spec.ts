import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pasos } from './pasos';

describe('Pasos', () => {
  let component: Pasos;
  let fixture: ComponentFixture<Pasos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pasos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pasos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
