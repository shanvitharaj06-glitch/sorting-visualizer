let array = [];
let steps = [];
let currentStep = 0;
let speed = 300;

// Generate Array
function generateArray() {
  array = [];
  for (let i = 0; i < 20; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  steps = [];
  currentStep = 0;
  renderArray();
}

// Render Bars
function renderArray() {
  const container = document.getElementById("array-container");
  container.innerHTML = "";

  array.forEach(value => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 3 + "px";
    container.appendChild(bar);
  });
}

// Bubble Sort
function bubbleSort() {
  steps = [];
  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push([...arr]);
      }
    }
  }

  currentStep = 0;
}

// Selection Sort
function selectionSort() {
  steps = [];
  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
    steps.push([...arr]);
  }

  currentStep = 0;
}

// Insertion Sort
function insertionSort() {
  steps = [];
  let arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      steps.push([...arr]);
    }
    arr[j + 1] = key;
    steps.push([...arr]);
  }

  currentStep = 0;
}

// Next Step
function nextStep() {
  if (currentStep < steps.length) {
    array = steps[currentStep];
    renderArray();
    currentStep++;
  }
}

// Previous Step
function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    array = steps[currentStep];
    renderArray();
  }
}

// Speed Control
document.getElementById("speed").oninput = function () {
  speed = this.value;
};

// Auto Play
function play() {
  let interval = setInterval(() => {
    if (currentStep >= steps.length) {
      clearInterval(interval);
    } else {
      nextStep();
    }
  }, speed);
}

// Initial Load
generateArray();