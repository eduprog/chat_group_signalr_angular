import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from "@angular/router/testing";
import { ConversationService } from 'src/app/services/conversation.service';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/modules/material.module';
import { Router } from '@angular/router';

describe('O component HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let conversationService: ConversationService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [ConversationService],
      imports: [RouterTestingModule, MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    conversationService = TestBed.get(ConversationService);

    spyOn(conversationService, 'getUserInfo').and.returnValue(of({
      groupName: 'Nome do Grupo',
      userName: 'Nome do Usuário',
    }));

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado', () => {
    expect(component).toBeTruthy();
  });

  it('Ao clicar no botão de sair, deve sair da conversa atual', fakeAsync(() => {

    spyOn(conversationService, 'leaveGroup').and.returnValue(Promise.resolve(true));
    const routerSpy = spyOn(router, 'navigateByUrl');

    component.leaveGroup();

    tick();

    expect(routerSpy).toHaveBeenCalledWith('initial')
  }));

  it('Se ocorrer algum erro ao sair da conversa, exibir erro e permanecer na página', fakeAsync(() => {

    spyOn(conversationService, 'leaveGroup').and.returnValue(Promise.reject('Erro ao salvar'));
    const consoleSpy = spyOn(console, 'log');

    component.leaveGroup();

    tick();

    expect(consoleSpy).toHaveBeenCalledWith('Erro ao salvar');
  }))
});
