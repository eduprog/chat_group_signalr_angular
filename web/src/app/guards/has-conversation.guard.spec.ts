import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HasConversationGuard } from './has-conversation.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { ConversationService } from '../services/conversation.service';
import { UserInfo } from '../models/user-info';
import { of, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

describe('O guard HasConversationGuard', () => {
  let guard: HasConversationGuard;
  let conversationService: ConversationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversationService],
      imports: [RouterTestingModule.withRoutes([])]
    });
    guard = TestBed.get(HasConversationGuard);
    router = TestBed.get(Router);

    conversationService = TestBed.get(ConversationService)
  });

  it('deve ser instanciado', () => {
    expect(guard).toBeTruthy();
  });

  it('se fouver userInfo, retornar true', () => {
    spyOn(conversationService, 'getUserInfo').and.returnValue(of(new UserInfo("Nome do grupo", "Nome do usuário")));

    const result = <Observable<boolean>>guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: 'conversation'})

    result.subscribe(res => {
      expect(res).toBeTrue();
    });
  });

  it('se não tiver userInfo, retornar false e redirecionar para tela inicial', fakeAsync(() => {
    spyOn(conversationService, 'getUserInfo').and.returnValue(of(null));
    const routerSpy = spyOn(router, 'navigateByUrl')

    const result = <Observable<boolean>>guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: 'conversation'})

    result.subscribe(res => {

      tick();
      
      expect(routerSpy).toHaveBeenCalledWith('initial');
      expect(res).toBeFalse();
    });
  }));
});
