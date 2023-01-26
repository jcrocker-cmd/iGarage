const brands = [
  {
    iconName: "taxi",
    brandName: "Taxi",
    color: "#ff0000"
  },
  {
    iconName: "ambulance",
    brandName: "Ambulance",
    color: "#fd5c63"
  },
  {
    iconName: "snowplow",
    brandName: "Snowplow",
    color: "#333333"
  },
  {
    iconName: "bus-alt",
    brandName: "Bus",
    color: "#a4c639"
  },
  {
    iconName: "motorcycle",
    brandName: "Motorcyle",
    color: "#000000"
  },
  {
    iconName: "shuttle-van",
    brandName: "Van",
    color: "#b52e31"
  },
  {
    iconName: "sleigh",
    brandName: "Sleigh",
    color: "#5fc9f8"
  },
  {
    iconName: "subway",
    brandName: "Subway",
    color: "#aaaaaa"
  },
  {
    iconName: "train",
    brandName: "Train",
    color: "#d4af37"
  },
  {
    iconName: "truck",
    brandName: "Truck",
    color: "#000000" 
  },
  {
    iconName: "truck-monster",
    brandName: "Monster Truck",
    color: "#f57d00" 
  },
  {
    iconName: "truck-pickup",
    brandName: "Pick-up Truck",
    color: "#3b5998" 
  },
  {
    iconName: "tram",
    brandName: "Cable Car",
    color: "#553c7b" 
  },
  {
    iconName: "space-shuttle",
    brandName: "Space Shuttle",
    color: "#333333" 
  },
  {
    iconName: "helicopter",
    brandName: "Chopper",
    color: "#111111" 
  },
  {
    iconName: "plane",
    brandName: "Airplane",
    color: "#ff6c2c" 
  },
  {
    iconName: "car",
    brandName: "Car",
    color: "#264de4" 
  },
  {
    iconName: "fighter-jet",
    brandName: "Jet Fighter",
    color: "#111111" 
  },
  {
    iconName: "bicycle",
    brandName: "Bicycle",
    color: "#ba0c2f" 
  },
  {
      iconName: "rocket",
      brandName: "Rocket",
      color: "#ba0c2f" 
  },
  {
      iconName: "ship",
      brandName: "Ship",
      color: "#ba0c2f" 
  },
];
let correct = 0;
let total = 0;
const totalDraggableItems = 5;
const totalMatchingPairs = 5; // Should be <= totalDraggableItems

const scoreSection = document.querySelector(".score");
const correctSpan = scoreSection.querySelector(".correct");
const totalSpan = scoreSection.querySelector(".total");
const playAgainBtn = scoreSection.querySelector("#play-again-btn");

const draggableItems = document.querySelector(".draggable-items");
const matchingPairs = document.querySelector(".matching-pairs");
let draggableElements;
let droppableElements;

initiateGame();

function initiateGame() {
  const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, brands);
  const randomDroppableBrands = totalMatchingPairs<totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableBrands) : randomDraggableBrands;
  const alphabeticallySortedRandomDroppableBrands = [...randomDroppableBrands].sort((a,b) => a.brandName.toLowerCase().localeCompare(b.brandName.toLowerCase()));
  
  // Create "draggable-items" and append to DOM
  for(let i=0; i<randomDraggableBrands.length; i++) {
    draggableItems.insertAdjacentHTML("beforeend", `
      <i class="fas fa-${randomDraggableBrands[i].iconName} draggable" draggable="true" style="color: ${randomDraggableBrands[i].color};" id="${randomDraggableBrands[i].iconName}"></i>
    `);
  }
  
  // Create "matching-pairs" and append to DOM
  for(let i=0; i<alphabeticallySortedRandomDroppableBrands.length; i++) {
    matchingPairs.insertAdjacentHTML("beforeend", `
      <div class="matching-pair">
        <span class="label">${alphabeticallySortedRandomDroppableBrands[i].brandName}</span>
        <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName}"></span>
      </div>
    `);
  }
  
  draggableElements = document.querySelectorAll(".draggable");
  droppableElements = document.querySelectorAll(".droppable");
  
  draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
    // elem.addEventListener("drag", drag);
    // elem.addEventListener("dragend", dragEnd);
  });
  
  droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
  });
}

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // or "text/plain"
}

//Events fired on the drop target

function dragEnter(event) {
  if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.preventDefault();
  }
}

function dragLeave(event) {
  if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  const draggableElementBrand = event.dataTransfer.getData("text");
  const droppableElementBrand = event.target.getAttribute("data-brand");
  const isCorrectMatching = draggableElementBrand===droppableElementBrand;
  total++;
  if(isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementBrand);
    event.target.classList.add("dropped");
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.innerHTML = `<i class="fas fa-${draggableElementBrand}" style="color: ${draggableElement.style.color};"></i>`;
    correct++;  
  }
  scoreSection.style.opacity = 0;
  setTimeout(() => {
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    scoreSection.style.opacity = 1;
  }, 200);
  if(correct===Math.min(totalMatchingPairs, totalDraggableItems)) { // Game Over!!
    playAgainBtn.style.display = "block";
    setTimeout(() => {
      playAgainBtn.classList.add("play-again-btn-entrance");
    }, 200);
  }
}

// Other Event Listeners
playAgainBtn.addEventListener("click", playAgainBtnClick);
function playAgainBtnClick() {
  playAgainBtn.classList.remove("play-again-btn-entrance");
  correct = 0;
  total = 0;
  draggableItems.style.opacity = 0;
  matchingPairs.style.opacity = 0;
  setTimeout(() => {
    scoreSection.style.opacity = 0;
  }, 100);
  setTimeout(() => {
    playAgainBtn.style.display = "none";
    while (draggableItems.firstChild) draggableItems.removeChild(draggableItems.firstChild);
    while (matchingPairs.firstChild) matchingPairs.removeChild(matchingPairs.firstChild);
    initiateGame();
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    draggableItems.style.opacity = 1;
    matchingPairs.style.opacity = 1;
    scoreSection.style.opacity = 1;
  }, 500);
}

// Auxiliary functions
function generateRandomItemsArray(n, originalArray) {
  let res = [];
  let clonedArray = [...originalArray];
  if(n>clonedArray.length) n=clonedArray.length;
  for(let i=1; i<=n; i++) {
    const randomIndex = Math.floor(Math.random()*clonedArray.length);
    res.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }
  return res;
}