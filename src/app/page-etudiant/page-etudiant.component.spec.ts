import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEtudiantComponent } from './page-etudiant.component';

describe('PageEtudiantComponent', () => {
  let component: PageEtudiantComponent;
  let fixture: ComponentFixture<PageEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
