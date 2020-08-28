import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Message } from '../models/message';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private hubConnection: HubConnection;

  private userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject(null);

  private message: BehaviorSubject<Message[]> = new BehaviorSubject([]);

  public messages$: Observable<Message[]>;

  constructor() {
    this.initConnection();
    this.messages$ = this.message.asObservable();
  }

  getUserInfo(): Observable<UserInfo> {
    return this.userInfo.asObservable();
  }

  private initConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.urlBase + "chatgrouphub")
      .build();
  }

  enterGroup(userInfo: UserInfo): Promise<Boolean> {
    this.resetChat();

    if (this.hubConnection.state == signalR.HubConnectionState.Disconnected) {
      return this.hubConnection.start().then(
        () => {
          this.userInfo.next(userInfo);
          return this.hubConnection.invoke<boolean>('EnterGroup', userInfo.groupName, userInfo.userName);
        }
      )
    }

    this.userInfo.next(userInfo);
    return this.hubConnection.invoke<boolean>('EnterGroup', userInfo.groupName, userInfo.userName)
  }

  private resetChat(): void {
    if (this.userInfo.value) {
      this.hubConnection.off('ReceiveMessages')
    }
    this.message.next([]);
  }

  receiveMessages(): void {
    this.hubConnection.on('ReceiveMessages', (data) => {
      var messages = this.message.value;
      messages.push(data);
      this.message.next(messages);
    });
  }

  sendMessage(message: Message): void {
    const model: UserInfo = this.userInfo.value;
    if (!model) {
      throw "Erro de argumento";
    }
    this.hubConnection.invoke('SendMessage', model.groupName, model.userName, message.content, message.type);
  }

  leaveGroup(): Promise<boolean> {

    try {
      const model: UserInfo = this.userInfo.value;

      if (this.hubConnection.state == signalR.HubConnectionState.Disconnected) {
        return this.hubConnection.start().then(
          () => {
            this.resetChat();
            this.userInfo.next(null);
            return this.hubConnection.invoke('LeaveGroup', model.groupName, model.userName);
          }
        )
      }

      this.resetChat();
      this.userInfo.next(null);
      return this.hubConnection.invoke('LeaveGroup', model.groupName, model.userName);
    } catch (error) {
      throw error;
    } finally {
      this.hubConnection.stop();
    }
  }
}
