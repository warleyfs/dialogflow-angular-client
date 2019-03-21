import { Content } from './content';
import { Button } from './button';

export class BasicCard extends Content {
    public type = 'basic_card';

    constructor(
        public title: string,
        public text: string,
        public imageUrl: string,
        public buttons: Array<Button>
    ) {
        super();
    }
}
