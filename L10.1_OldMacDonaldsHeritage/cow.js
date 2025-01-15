"use strict";
var L10_OldMacDonals;
(function (L10_OldMacDonals) {
    class Cow extends L10_OldMacDonals.Animal {
        constructor(species, name, sound, foodTypes, foodAmount) {
            super(species, name, sound, foodTypes, foodAmount);
        }
        doSpecialAction() {
            return "I drink milk";
        }
    }
    L10_OldMacDonals.Cow = Cow;
})(L10_OldMacDonals || (L10_OldMacDonals = {}));
//# sourceMappingURL=cow.js.map