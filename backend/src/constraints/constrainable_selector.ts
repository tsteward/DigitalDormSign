import {IConstrainable} from "./constraint";

export class ConstrainableSelector {
	/**
	 * Randomly selects a single constrainable object whose constraints are currently satisfied
	 * @param choices The choices to pick from
	 */
	pick(choices: IConstrainable[]): IConstrainable | null {
		if (choices) {
			const validChoices = choices.filter(choice => {
				if (choice.constraint) {
					console.log(choice);
					console.log('constraint: ' + choice.constraint.checkConstraint());
					return choice.constraint.checkConstraint();
				} else {
					return true;
				}
			});

			if (validChoices.length != 0) {
				return validChoices[Math.floor(Math.random()*validChoices.length)]
			}
		}

		// No option could be found that satisfies its constraints
		return null;
	}
}
