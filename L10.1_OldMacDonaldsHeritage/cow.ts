namespace L10_OldMacDonals {


    export class Cow extends Animal {
        constructor(species: string, name: string, sound: string, foodTypes: string[], foodAmount: number) {
            super(species, name, sound, foodTypes, foodAmount)
        }
        doSpecialAction(): string {
            return "I drink milk"
        }
    }
    
    }