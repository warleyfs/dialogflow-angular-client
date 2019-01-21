import { Content } from './content';

export class LinkOutChip extends Content {
  public type = 'link_out_chip';

  constructor(public destinationName: string, public url: string) {
    super();
  }
}
