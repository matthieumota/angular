import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  providers: [
    // On peut "surcharger" "remplacer" les services
    // { provide: MessageService, useValue: { getMessages: () => [] } }
  ],
  template: `
    <div class="alert alert-{{ message.type }} alert-dismissible"
      [ngClass]="['alert-' + message.type]"
      *ngFor="let message of messages; index as i">
      {{ message.content }}
      <button class="btn-close" (click)="messageService.delete(i)"></button>
    </div>
  `
})
export class MessagesComponent implements OnInit {
  messages!: Message[];

  // Mettre le service en public permet d'y accéder dans le template
  constructor(public messageService: MessageService) {
    console.log(messageService);
  }

  ngOnInit(): void {
    this.messageService.getMessages().then(m => this.messages = m);
  }
}
