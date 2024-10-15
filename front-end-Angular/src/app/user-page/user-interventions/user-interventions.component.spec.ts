import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterventionsComponent } from './user-interventions.component';

describe('UserInterventionsComponent', () => {
  let component: UserInterventionsComponent;
  let fixture: ComponentFixture<UserInterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInterventionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
