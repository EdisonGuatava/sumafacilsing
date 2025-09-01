import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroemailComponent } from './registroemail.component';

describe('RegistroemailComponent', () => {
  let component: RegistroemailComponent;
  let fixture: ComponentFixture<RegistroemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroemailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
