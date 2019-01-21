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

  public sendMessage(): void {

    this.messages.push(new Message('assets/images/user.png', new Date(), new Array<Content>(new SimpleText(this.userMessage))));

    this.dialogFlowService.getResponse(this.userMessage, this.settings.userData.userName, this.settings.agent).subscribe(res => {

      const message = new Message('assets/images/bot.png', res.timestamp, []);

      res.result.fulfillment.messages.forEach(msg => {

        if (msg.type === 4) {

          switch (msg.payload.type) {
            case 'simple_response':
            {
              message.content.push(new SimpleText(msg.payload.displayText));
              break;
            }
            case 'basic_card': // Card
            {
              const title = msg.payload.title;
              const subtitle = msg.payload.subtitle;
              const imageUrl = msg.payload.image.url;
              const formattedText = msg.payload.formattedText;
              const buttons = new Array<Button>();

              msg.payload.buttons.forEach(button => {
                buttons.push(new Button(button.title, button.openUrlAction.url));
              });

              const card = new BasicCard(title, subtitle, formattedText, imageUrl, buttons);

              message.content.push(card);
              break;
            }
            case 'list_card': // List Response
            {
              message.content.push(new ListCard());
              break;
            }
            case 'suggestion_chips': // Suggestion Chip
            {
              message.content.push(new SuggestionChip());
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
        } else {
          message.content.push(new SimpleText(msg.speech));
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
