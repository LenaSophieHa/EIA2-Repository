namespace L10_OldMacDonals {


    // Hauptprogramm:
    
    document.addEventListener("DOMContentLoaded", () => {
        
        let farm = new Farm(); // erstellung der Farm mit den Tieren
    
        let animals = [
            new Cow("Cow", "Bessie", "Moo", ["Grass"], 150),
            new Chicken("Chicken", "Clucky", "Cluck", ["Grains"], 50),
            new Dog("Dog", "Rex", "Woof", ["Meat"], 100),
            new Horse("Horse", "Spirit", "Neigh", ["Hay"], 200),
            new Pig("Pig", "Porky", "Oink", ["Junk"], 120)
        ];
    
        animals.forEach(animal => farm.addAnimal(animal));
    
        let animalsContainer = document.getElementById("animals")!;
        let foodContainer = document.getElementById("food")!;
        let controlsContainer = document.getElementById("controls")!;
        let dayDisplay = document.getElementById("dayDisplay")!;
    
        // Tier darstellen:
        let updateAnimals = () => {
            animalsContainer.innerHTML = ""; 
    
            farm.animals.forEach(animal => {
                let animalDiv = document.createElement("div");
                animalDiv.className = "animal";
    
                let name = document.createElement("strong");
    
                name.textContent = `${animal.name} the ${animal.species}`;
                animalDiv.appendChild(name);
    
                animalDiv.appendChild(document.createElement("br")); 
    
              
                let sungCheckbox = document.createElement("input");
    
                sungCheckbox.type = "checkbox";
                sungCheckbox.disabled = true;
                sungCheckbox.id = `${animal.name}-sung`;
    
                let sungLabel = document.createElement("label");
    
                sungLabel.textContent = " Sung";
                sungLabel.insertBefore(sungCheckbox, sungLabel.firstChild);
                animalDiv.appendChild(sungLabel);
    
                
                let fedCheckbox = document.createElement("input");
    
                fedCheckbox.type = "checkbox";
                fedCheckbox.disabled = true;
                fedCheckbox.id = `${animal.name}-fed`;
    
                let fedLabel = document.createElement("label");
    
                fedLabel.textContent = " Fed";
                fedLabel.insertBefore(fedCheckbox, fedLabel.firstChild);
                animalDiv.appendChild(fedLabel);
    
                let singButton = document.createElement("button");
                singButton.textContent = "Sing";
                singButton.addEventListener("click", () => { alert(animal.sing());
                    sungCheckbox.checked = true; 
                    checkDayProgress();
                });
    
                animalDiv.appendChild(singButton);
    
               
                let feedButton = document.createElement("button");
    
                feedButton.textContent = "Feed";
                feedButton.addEventListener("click", () => {
    
                    let message = farm.feedAnimal(animal, animal.foodTypes[0]);
                    alert(message);
    
                    if (animal.hasEaten) fedCheckbox.checked = true; 
                    updateFood();
                    checkDayProgress();
                });
    
                animalDiv.appendChild(feedButton);
    
                let specialButton = document.createElement("button");
    
                specialButton.textContent = "DoSpecialAction";
                specialButton.addEventListener("click", () => {
                    alert(animal.doSpecialAction())
    
                })
                animalDiv.appendChild(specialButton)
    
    
                animalsContainer.appendChild(animalDiv);
            });
        };
    
        // Futtervorräte anzuzeigen:
        let updateFood = () => {
            foodContainer.innerHTML = "";
    
            for (let foodType in farm.foodInventory) {
                let foodDiv = document.createElement("div");
                foodDiv.className = "food";
                foodDiv.textContent = `${foodType}: ${farm.foodInventory[foodType]} g`;
                foodContainer.appendChild(foodDiv);
            }
        };
    
        let checkDayProgress = () => {controlsContainer.innerHTML = ""; 
    
            dayDisplay.textContent = `Tag: ${farm.currentDay}`; // Tag anzeigen
    
            let nextDayButton = document.createElement("button");
    
            nextDayButton.textContent = "Start Next Day";
            nextDayButton.disabled = !farm.allAnimalsReady() || !farm.hasEnoughFood();
    
            nextDayButton.addEventListener("click", () => {
                farm.startNextDay();
                updateAnimals();
                updateFood();
                checkDayProgress();
            });
    
            controlsContainer.appendChild(nextDayButton);
    
            if (farm.needsRestocking()) {
    
                let restockButton = document.createElement("button");
                restockButton.textContent = "Order Food";
    
                restockButton.addEventListener("click", () => {
    
                    let foodType = prompt("Enter the food type (Grass, Grains, Meat, Junk, Hay):");
                    let amount = parseInt(prompt("Enter the amount in grams:") || "0", 10);
    
                    if (foodType && amount > 0 && farm.foodInventory.hasOwnProperty(foodType)) {
                        alert(farm.restockFood(foodType, amount));
                        updateFood();
                        checkDayProgress();
                    } else {
                        alert("Invalid input. Please try again.");
                    }
                });
    
                controlsContainer.appendChild(restockButton);
            }
        };
    
       
        updateAnimals();
        updateFood();
        checkDayProgress();
    });
    }