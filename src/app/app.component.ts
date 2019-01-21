import { environment } from './../environments/environment';
import { Component, HostListener } from '@angular/core';
import { Content } from './models/content';
import { Message } from './models';
import { SimpleText } from './models/simple-text';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public userMessage: Message;
  public messages: Message[];
  public settingsLoaded = false;
  public settings: any;

  @HostListener('window:message', ['$event'])
  onmessage(ev: MessageEvent) {
    this.getSettings(ev);
  }

  constructor() {
  }

  public getSettings(evt) {
    if (evt.data != null && evt.data.agent != null) {
      this.settings = evt.data;
      this.settingsLoaded = true;
      this.messages = [
        new Message('assets/images/bot.png', new Date(), new Array<Content>(new SimpleText('Bem vindo ao chatbot da Fundep.')))
      ];
    }
  }
}
