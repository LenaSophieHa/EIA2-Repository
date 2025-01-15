"use strict";
var L10_OldMacDonals;
(function (L10_OldMacDonals) {
    class Pig extends L10_OldMacDonals.Animal {
        constructor(species, name, sound, foodTypes, foodAmount) {
            super(species, name, sound, foodTypes, foodAmount);
        }
        doSpecialAction() {
            return "I wash myself";
        }
    }
    L10_OldMacDonals.Pig = Pig;
})(L10_OldMacDonals || (L10_OldMacDonals = {}));
//# sourceMappingURL=pig.js.map