"use strict";
var L10_OldMacDonals;
(function (L10_OldMacDonals) {
    class Chicken extends L10_OldMacDonals.Animal {
        constructor(species, name, sound, foodTypes, foodAmount) {
            super(species, name, sound, foodTypes, foodAmount);
        }
        doSpecialAction() {
            return "I lay eggs";
        }
    }
    L10_OldMacDonals.Chicken = Chicken;
})(L10_OldMacDonals || (L10_OldMacDonals = {}));
//# sourceMappingURL=chicken.js.map