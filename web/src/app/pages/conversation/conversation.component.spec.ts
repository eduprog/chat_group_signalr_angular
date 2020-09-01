import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationComponent } from './conversation.component';
import { RouterTestingModule } from "@angular/router/testing";

import { MaterialModule } from '../../modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConversationService } from 'src/app/services/conversation.service';

describe('O componente ConversationComponent', () => {
  let component: ConversationComponent;
  let fixture: ComponentFixture<ConversationComponent>;
  let conversationService: ConversationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationComponent ],
      providers: [ConversationService],
      imports: [RouterTestingModule, MaterialModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    conversationService = TestBed.get(ConversationService);
    fixture = TestBed.createComponent(ConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado', () => {
    expect(component).toBeTruthy();
  });

  it('quando enviar uma mensagem, a variavel content deve ser resetada', () => {
    component.content = "Nova mensagem";

    spyOn(conversationService, 'sendMessage').and.returnValue(null);

    component.sendMessage();

    expect(component.content).toBe('');
  });
});
