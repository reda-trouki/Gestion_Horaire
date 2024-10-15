import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantesComponent } from './enseignantes.component';

describe('EnseignantesComponent', () => {
  let component: EnseignantesComponent;
  let fixture: ComponentFixture<EnseignantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnseignantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
