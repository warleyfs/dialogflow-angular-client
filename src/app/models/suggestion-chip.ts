import { Content } from './content';
import { Button } from './button';

export class SuggestionChip extends Content {
    public type = 'suggestion_chip';

    constructor(public suggestions: Array<Button>) {
        super();
    }
}
