import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingfirmadoComponent } from './singfirmado.component';

describe('SingfirmadoComponent', () => {
  let component: SingfirmadoComponent;
  let fixture: ComponentFixture<SingfirmadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingfirmadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingfirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
