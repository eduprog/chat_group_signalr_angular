export enum EMessageType {
  Log = 1,
  Text = 2,
  Photo = 3,
  Video = 4,
  Url = 5
}

export class Message {
  userName: string;
  content: string;
  type: EMessageType;
  createdAt: Date;

  constructor(content: string, type: EMessageType) {
    this.content = content;
    this.type = type;
  }
}
