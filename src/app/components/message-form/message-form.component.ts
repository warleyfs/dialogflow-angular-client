import { Component, OnInit, Input } from '@angular/core';
import { DialogflowService } from './../../services';
import { LinkOutChip } from './../../models/link-out-chip';
import { CarouselCard } from './../../models/carousel-card';
import { SuggestionChip } from './../../models/suggestion-chip';
import { ListCard } from './../../models/list-card';
import { BasicCard } from './../../models/basic-card';
import { SimpleText } from './../../models/simple-text';
import { Content } from '../../models/content';
import { Message } from './../../models';
import { Button } from '../../models/button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Input('userMessage')
  public userMessage: string;

  @Input('messages')
  public messages: Message[];

  @Input('settings')
  public settings: any;

  constructor(private dialogFlowService: DialogflowService) { }

  ngOnInit() {
  }

  public sendMessage(userMessageText: Message): void {

    if (userMessageText) {
      this.messages.push(userMessageText);
    } else {
      this.messages.push(new Message('assets/images/user.png', new Date(), new Array<Content>(new SimpleText(this.userMessage))));
    }

    this.dialogFlowService.getResponse(this.userMessage, this.settings.userData.userId, this.settings.agent).subscribe(res => {

      const message = new Message('assets/images/bot.png', res.timestamp, []);

      res.result.fulfillment.messages.forEach(msg => {
        switch (msg.type) {
          case 0:
            {
              message.content.push(new SimpleText(msg.speech));
              break;
            }
          case 1: // Card
            {
              const title = msg.title;
              const text = msg.subtitle;
              const imageUrl = msg.imageUrl;
              const buttons = new Array<Button>();

              msg.buttons.forEach(button => {
                buttons.push(new Button(button.text, button.postback));
              });

              const card = new BasicCard(title, text, imageUrl, buttons);

              message.content.push(card);
              break;
            }
          case 2: // Suggestion Chip
            {
              const suggestions = Array<Button>();

              msg.replies.forEach(suggestion => {
                suggestions.push(new Button(suggestion, ''));
              });

              message.content.push(new SuggestionChip(suggestions));

              break;
            }
          case 'list_card': // List Response
            {
              message.content.push(new ListCard());
              break;
            }
          case 'carousel_card': // Carousel Card
            {
              message.content.push(new CarouselCard());
              break;
            }
          case 'link_out_chip': // Link Out Chip
            {
              message.content.push(new LinkOutChip(msg.payload.destinationName, this.getFormattedUrl(msg.payload.url)));
              break;
            }
          default:
            {
              message.content.push(new SimpleText('Desculpe, não entendi. Poderia repetir?'));
            }
        }
      });

      this.messages.push(message);
      this.userMessage = '';

    });
  }

  public getFormattedUrl(url: string): string {

    if (url.indexOf('http') === -1 && url.indexOf('https') === -1) {
      url = `http://${url}`;
    }

    return url;
  }
}
