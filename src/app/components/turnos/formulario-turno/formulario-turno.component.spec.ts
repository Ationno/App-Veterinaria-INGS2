import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTurnoComponent } from './formulario-turno.component';

describe('FormularioTurnoComponent', () => {
  let component: FormularioTurnoComponent;
  let fixture: ComponentFixture<FormularioTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
