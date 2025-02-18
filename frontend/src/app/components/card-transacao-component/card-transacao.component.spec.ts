import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTransacaoComponent } from './card-transacao.component';

describe('CardTransacaoComponent', () => {
  let component: CardTransacaoComponent;
  let fixture: ComponentFixture<CardTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
