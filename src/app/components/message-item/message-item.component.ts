import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from './../../models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input('message')
  public message: Message;

  @Output() sendSimpleMessage = new EventEmitter<string>();

  sendSuggestion(suggestionText: string) {
    this.sendSimpleMessage.emit(suggestionText);
  }

  constructor() { }

  ngOnInit() {
  }

}
