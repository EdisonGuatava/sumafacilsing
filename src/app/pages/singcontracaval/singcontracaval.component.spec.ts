import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingcontracavalComponent } from './singcontracaval.component';

describe('SingcontracavalComponent', () => {
  let component: SingcontracavalComponent;
  let fixture: ComponentFixture<SingcontracavalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingcontracavalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingcontracavalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
