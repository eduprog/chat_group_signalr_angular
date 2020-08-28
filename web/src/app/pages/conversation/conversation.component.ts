import { Component } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation.service';
import { Message, EMessageType } from 'src/app/models/message';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {

  content: string;

  constructor(
    public conversationService: ConversationService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url == "/initial") {
        this.conversationService.leaveGroup();
      }
    });
  }

  sendMessage(): void {
    const message: Message = new Message(this.content, EMessageType.Text);
    this.conversationService.sendMessage(message);
    this.content = "";
  }

}
