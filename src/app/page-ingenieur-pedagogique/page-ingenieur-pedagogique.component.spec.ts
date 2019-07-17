import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageIngenieurPedagogiqueComponent } from './page-ingenieur-pedagogique.component';

describe('PageIngenieurPedagogiqueComponent', () => {
  let component: PageIngenieurPedagogiqueComponent;
  let fixture: ComponentFixture<PageIngenieurPedagogiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageIngenieurPedagogiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageIngenieurPedagogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
