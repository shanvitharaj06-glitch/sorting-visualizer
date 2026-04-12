let array = [];
let steps = [];
let currentStep = 0;
let speed = 300;

// Update size display
document.getElementById("size").oninput = function () {
  document.getElementById("size-value").innerText = this.value;
};

// Generate Array
function generateArray() {
  array = [];

  let size = document.getElementById("size").value;

  // Validation
  if (size === "" || size < 5) {
    alert("Please enter a valid size (min 5)");
    return;
  }

  if (size > 200) {
    alert("Max allowed size is 200");
    return;
  }

  size = parseInt(size);

  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  steps = [];
  currentStep = 0;
  renderArray();
}
// Render
function renderArray(active = [], swapping = [], sorted = []) {
  const container = document.getElementById("array-container");
  container.innerHTML = "";

  let barWidth = Math.max(3, 800 / array.length);

  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");

    bar.style.height = value * 3 + "px";
    bar.style.width = barWidth + "px";

    if (active.includes(index)) bar.classList.add("compare");
    if (swapping.includes(index)) bar.classList.add("swap");
    if (sorted.includes(index)) bar.classList.add("sorted");

    container.appendChild(bar);
  });
}
// Set Algorithm
function setAlgo(type) {
  if (type === "Bubble") {
    bubbleSort();
    updateInfo("Bubble Sort", "O(n²)");
  }
  if (type === "Selection") {
    selectionSort();
    updateInfo("Selection Sort", "O(n²)");
  }
  if (type === "Insertion") {
    insertionSort();
    updateInfo("Insertion Sort", "O(n²)");
  }
  if (type === "Merge") {
    mergeSortWrapper();
    updateInfo("Merge Sort", "O(n log n)");
  }
  if (type === "Quick") {
    quickSortWrapper();
    updateInfo("Quick Sort", "O(n log n)");
  }
}

// Update Info
function updateInfo(name, time) {
  document.getElementById("algo-name").innerText = "Algorithm: " + name;
  document.getElementById("time").innerText = "Time Complexity: " + time;
}

// Bubble Sort
function bubbleSort() {
  steps = [];
  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({ array: [...arr], active: [j, j+1] });

      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        steps.push({ array: [...arr], swapping: [j, j+1] });
      }
    }
    steps.push({ array: [...arr], sorted: [arr.length-i-1] });
  }

  currentStep = 0;
}

// Selection Sort
function selectionSort() {
  steps = [];
  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i+1; j < arr.length; j++) {
      steps.push({ array: [...arr], active: [min, j] });
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
    steps.push({ array: [...arr], swapping: [i, min] });
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
      arr[j+1] = arr[j];
      j--;
      steps.push({ array: [...arr], swapping: [j+1] });
    }
    arr[j+1] = key;
    steps.push({ array: [...arr], active: [j+1] });
  }

  currentStep = 0;
}

// Merge Sort
function mergeSortWrapper() {
  steps = [];
  let arr = [...array];
  mergeSort(arr, 0, arr.length-1);
  currentStep = 0;
}

function mergeSort(arr, l, r) {
  if (l >= r) return;
  let m = Math.floor((l+r)/2);
  mergeSort(arr, l, m);
  mergeSort(arr, m+1, r);
  merge(arr, l, m, r);
}

function merge(arr, l, m, r) {
  let temp = [];
  let i = l, j = m+1;

  while (i <= m && j <= r) {
    if (arr[i] < arr[j]) temp.push(arr[i++]);
    else temp.push(arr[j++]);
  }
  while (i <= m) temp.push(arr[i++]);
  while (j <= r) temp.push(arr[j++]);

  for (let k = l; k <= r; k++) {
    arr[k] = temp[k-l];
    steps.push({ array: [...arr], active: [k] });
  }
}

// Quick Sort
function quickSortWrapper() {
  steps = [];
  let arr = [...array];
  quickSort(arr, 0, arr.length-1);
  currentStep = 0;
}

function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi-1);
    quickSort(arr, pi+1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low-1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      steps.push({ array: [...arr], swapping: [i, j] });
    }
  }

  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
  steps.push({ array: [...arr], swapping: [i+1, high] });

  return i+1;
}

// Controls
function nextStep() {
  if (currentStep < steps.length) {
    let step = steps[currentStep];
    array = step.array;
    renderArray(step.active || [], step.swapping || [], step.sorted || []);
    currentStep++;
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    array = steps[currentStep].array;
    renderArray();
  }
}

function play() {
  let interval = setInterval(() => {
    if (currentStep >= steps.length) clearInterval(interval);
    else nextStep();
  }, speed);
}

document.getElementById("speed").oninput = function () {
  speed = this.value;
};

generateArray();
