const brands = [
    {
      iconName: "ambulance.png",
      brandName: "Ambulance",
    },
    {
      iconName: "atv.png",
      brandName: "ATV",
    },
    {
      iconName: "bus.png",
      brandName: "Bus",
    },
    {
      iconName: "cement.png",
      brandName: "Cement Truck",
    },
    {
      iconName: "crane.png",
      brandName: "Crane",
    },
    {
      iconName: "dump.png",
      brandName: "Dump Truck",
    },
    {
      iconName: "exca.png",
      brandName: "Excavator",
    },
    {
      iconName: "firetruck.png",
      brandName: "Fire Truck",
    },
    {
      iconName: "fork.png",
      brandName: "Fork Lift",
    },
    {
      iconName: "garbage.png",
      brandName: "Garabage Truck",
    },
    {
      iconName: "golf.png",
      brandName: "Golf Car",
    },
    {
      iconName: "motor.png",
      brandName: "Motorcyle",
    },
    {
      iconName: "pc.png",
      brandName: "Police Car",
    },
    {
      iconName: "pickup.png",
      brandName: "Pick-up Truck",
    },
    {
      iconName: "scooter.png",
      brandName: "Scooter",
    },
    {
      iconName: "snow.png",
      brandName: "Snow Mobile",
    },
    {
      iconName: "tank.png",
      brandName: "Tank",
    },
    {
      iconName: "taxi.png",
      brandName: "Taxi",
    },
    {
      iconName: "tractor.png",
      brandName: "Tractor",
    },
    {
      iconName: "train.png",
      brandName: "Train",
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
        <img src="/assets/vehicle/medium/${randomDraggableBrands[i].iconName}" class="draggable" draggable="true" style="color: ${randomDraggableBrands[i].color}; height: ${randomDraggableBrands[i].height}; width: ${randomDraggableBrands[i].width};" id="${randomDraggableBrands[i].iconName}">
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
    // if(isCorrectMatching) {
    //   const draggableElement = document.getElementById(draggableElementBrand);
    //   event.target.classList.add("dropped");
    //   draggableElement.classList.add("dragged");
    //   draggableElement.setAttribute("draggable", "false");
    //   // event.target.innerHTML = `<i class="fas fa-${draggableElementBrand}" style="color: ${draggableElement.style.color};"></i>`;
    //   event.target.innerHTML = `<img src="/assets/vehicle/medium/${draggableElementBrand}" style="color: ${draggableElement.style.color}; height: 50px; width: 50px;">`;
    //   correct++;  
    // }

    if(isCorrectMatching) {
      const draggableElement = document.getElementById(draggableElementBrand);
      event.target.classList.add("dropped");
      draggableElement.classList.add("dragged");
      draggableElement.setAttribute("draggable", "false");
      let imgElement = document.createElement("img");
      imgElement.src = "/assets/vehicle/medium/" + draggableElementBrand;
      imgElement.style.color = draggableElement.style.color;
      if (window.matchMedia("(max-width: 600px)").matches) {
        imgElement.style.height = "50px";
        imgElement.style.width = "50px";
      } else {
        imgElement.style.height = "90px";
        imgElement.style.width = "90px";
      }
      event.target.appendChild(imgElement);
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