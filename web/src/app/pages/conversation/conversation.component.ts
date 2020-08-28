import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation.service';
import { Message, EMessageType } from 'src/app/models/message';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  content: string;
  @ViewChild('contentMessage', {static: true}) contentMessage: MatInput;

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

  ngOnInit(): void {
    console.log(this.contentMessage)
    this.contentMessage.focus();
  }

  sendMessage(): void {
    const message: Message = new Message(this.content, EMessageType.Text);
    this.conversationService.sendMessage(message);
    this.content = "";
    this.contentMessage.focus();

    //get the div that contains all the messages
    let div = document.getElementById('message-container');

    //make the last element (a message) to scroll into view, smoothly!
    div.lastElementChild.scrollIntoView({ behavior: 'smooth' });
  }

  onEnterInput(event: KeyboardEvent): void {
    if (event.keyCode == 13) {
      this.sendMessage();
    }
  }

}
