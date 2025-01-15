"use strict";
var L10_OldMacDonals;
(function (L10_OldMacDonals) {
    class Dog extends L10_OldMacDonals.Animal {
        constructor(species, name, sound, foodTypes, foodAmount) {
            super(species, name, sound, foodTypes, foodAmount);
        }
        doSpecialAction() {
            return "I lick bones";
        }
    }
    L10_OldMacDonals.Dog = Dog;
})(L10_OldMacDonals || (L10_OldMacDonals = {}));
//# sourceMappingURL=dog.js.map