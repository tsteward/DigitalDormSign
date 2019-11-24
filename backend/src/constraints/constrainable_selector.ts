import {IConstrainable} from "./constraint";

export class Constrainable_selector {
	/**
	 * Randomly selects a single constrainable object whose constraints are currently satisfied
	 * @param choices The choices to pick from
	 */
	pick(choices: IConstrainable[]): IConstrainable | null {
		if (choices) {
			const validChoices = choices.filter(choice => {
				if (choice.constraint) {
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
