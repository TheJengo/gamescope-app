/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GameCreateComponent } from './game-create.component';

describe('GameCreateComponent', () => {
  let component: GameCreateComponent;
  let fixture: ComponentFixture<GameCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
