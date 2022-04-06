import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentComponent } from './agent-form.component';

describe('AddAgentComponent', () => {
  let component: AddAgentComponent;
  let fixture: ComponentFixture<AddAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
