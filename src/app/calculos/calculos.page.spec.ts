import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculosPage } from './calculos.page';

describe('CalculosPage', () => {
  let component: CalculosPage;
  let fixture: ComponentFixture<CalculosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
