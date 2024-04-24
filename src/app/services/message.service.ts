import { Injectable } from '@angular/core';

type MessageType = 'primary' | 'danger';
export interface Message {
  content: string;
  type: MessageType;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [
    { content: 'A', type: 'primary' },
    { content: 'B', type: 'danger' },
  ];

  getMessages(): Promise<Message[]> {
    return new Promise((resolve) => resolve(this.messages));
  }

  add(content: string, type: MessageType = 'primary'): void {
    const message = { content, type };

    this.messages.push(message);

    setTimeout(() => {
      this.delete(this.messages.indexOf(message));
    }, 2000);
  }

  delete(index: number): void {
    // Ne fonctionne pas car on doit jouer sur la référence !
    // this.messages = this.messages.filter((m, i) => i !== index);
    this.messages.splice(index, 1);
  }
}
