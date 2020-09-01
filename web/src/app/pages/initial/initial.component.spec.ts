import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { InitialComponent } from './initial.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConversationService } from 'src/app/services/conversation.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('A página InitialComponent', () => {
  let component: InitialComponent;
  let fixture: ComponentFixture<InitialComponent>;
  let conversationService: ConversationService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialComponent ],
      providers: [ConversationService],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    conversationService = TestBed.get(ConversationService);
    fixture = TestBed.createComponent(InitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciada', () => {
    expect(component).toBeTruthy();
  });

  it('redicionar para a pagina de conversation, caso os dados do formulário de entrada forem preenchidos corretamente', fakeAsync(() => {

    const routerSpy = spyOn(router, 'navigateByUrl')

    spyOn(conversationService, 'enterGroup').and.returnValue(Promise.resolve(true));
    spyOn(conversationService, 'receiveMessages').and.returnValue(null);

    component.form.get('groupName').setValue('Nome do grupo');
    component.form.get('userName').setValue('Nome do usuário');
    component.handleEnterGroup();

    tick();

    expect(routerSpy).toHaveBeenCalledWith('conversation');
  }));

  it('Se ocorrer algum erro ao tentar entrar na sala, permanece na tela Initial', fakeAsync(() => {

    spyOn(conversationService, 'enterGroup').and.returnValue(Promise.reject("Erro ao entrar na sala"));

    const consoleSpy = spyOn(console, 'log');

    component.form.get('groupName').setValue('Nome do grupo');
    component.form.get('userName').setValue('Nome do usuário');
    component.handleEnterGroup();

    tick();

    expect(consoleSpy).toHaveBeenCalledWith("Erro ao entrar na sala");
  }));
});
