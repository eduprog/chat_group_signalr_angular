import { Component, OnInit } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation.service';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/user-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo$: Observable<UserInfo>;

  constructor(private conversationService: ConversationService, private router: Router) { }

  ngOnInit(): void {
    this.userInfo$ = this.conversationService.getUserInfo();
  }

  leaveGroup(): void {
    this.conversationService.leaveGroup().then(
      response => {
        if (response) {
          this.router.navigateByUrl("initial");
        }
        else {
          alert("Erro ao sair no grupo")
        }
      },
      error => {
        alert("Erro ao sair no grupo")
        console.log(error);
      }
    )
  }

}
