"use strict";
var RandomPoem;
(function (RandomPoem) {
    RandomPoem.subjekte = ["Magie", "Liebe", "Freundschaft", "Mut", "Schicksal", "Verrat"];
    RandomPoem.prädikate = ["prägt", "verändert", "bestimmt", "enthüllt", "leidet", "verbindet"];
    RandomPoem.objekte = ["das Leben", "die Welt", "die Beziehungen", "die Entscheidungen", "den Kampf", "die Zukunft"];
})(RandomPoem || (RandomPoem = {}));
//console.log(RandomPoem.subjekte);
//console.log(RandomPoem.prädikate);
//console.log(RandomPoem.objekte);
for (let i = RandomPoem.subjekte.length; i > 0; i--) {
    //console.log(i);
    const vers = getVerse(RandomPoem.subjekte, RandomPoem.prädikate, RandomPoem.objekte);
    console.log(vers);
}
function getVerse(_subjekte, _prädikate, _objekte) {
    let vers = "";
    const randomSubjekt = Math.floor(Math.random() * _subjekte.length);
    vers += _subjekte.splice(randomSubjekt, 1)[0] + " ";
    const randomPrädikat = Math.floor(Math.random() * _prädikate.length);
    vers += _prädikate.splice(randomPrädikat, 1)[0] + " ";
    const randomObjekt = Math.floor(Math.random() * _objekte.length);
    vers += _objekte.splice(randomObjekt, 1)[0];
    return vers;
}
//# sourceMappingURL=RandomPoem.js.map