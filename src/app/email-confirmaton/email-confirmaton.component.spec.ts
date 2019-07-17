import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmatonComponent } from './email-confirmaton.component';

describe('EmailConfirmatonComponent', () => {
  let component: EmailConfirmatonComponent;
  let fixture: ComponentFixture<EmailConfirmatonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailConfirmatonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfirmatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
