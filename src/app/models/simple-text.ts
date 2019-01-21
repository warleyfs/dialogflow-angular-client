import { Content } from './content';

export class SimpleText extends Content {
  public type = 'simple_text';

  constructor(public displayText: string) {
    super();
  }
}
