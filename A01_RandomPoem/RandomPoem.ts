namespace RandomPoem{
    export const subjekte: string[] = ["Magie", "Liebe", "Freundschaft", "Mut", "Schicksal", "Verrat"];
    export const prädikate: string[] = ["prägt", "verändert", "bestimmt", "enthüllt", "leidet", "verbindet"];
    export const objekte: string[] = ["das Leben", "die Welt", "die Beziehungen", "die Entscheidungen", "den Kampf", "die Zukunft"];

}


//console.log(RandomPoem.subjekte);
//console.log(RandomPoem.prädikate);
//console.log(RandomPoem.objekte);


for(let i = RandomPoem.subjekte.length; i > 0; i--){
    
    //console.log(i);
    const vers:string = getVerse(RandomPoem.subjekte,RandomPoem.prädikate,RandomPoem.objekte);
    console.log(vers);
}


function getVerse(_subjekte: string[], _prädikate: string[], _objekte: string[]): string {
    let vers: string = "";

    const randomSubjekt: number = Math.floor(Math.random() * _subjekte.length);
    vers += _subjekte.splice(randomSubjekt, 1)[0] + " ";  

    const randomPrädikat: number = Math.floor(Math.random() * _prädikate.length);
    vers += _prädikate.splice(randomPrädikat, 1)[0] + " ";  

    const randomObjekt: number = Math.floor(Math.random() * _objekte.length);
    vers += _objekte.splice(randomObjekt, 1)[0]; 

    return vers
}