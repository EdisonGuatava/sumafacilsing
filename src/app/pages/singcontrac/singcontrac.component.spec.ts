import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingcontracComponent } from './singcontrac.component';

describe('SingcontracComponent', () => {
  let component: SingcontracComponent;
  let fixture: ComponentFixture<SingcontracComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingcontracComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingcontracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
