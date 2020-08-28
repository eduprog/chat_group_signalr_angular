import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConversationService } from '../services/conversation.service';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class HasConversationGuard implements CanActivate {

  constructor(
    private conversationService: ConversationService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.conversationService.getUserInfo()
        .pipe(
          map((userInfo: UserInfo) => {
            if (!userInfo) {
              this.router.navigateByUrl("initial");
              return false
            }
            return true;
          })
        );
  }

}
