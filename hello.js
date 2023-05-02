function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generate100(){
    let numbers = Array.from({length: 100}, (_, i) => i + 1);
    shuffle(numbers);
    return numbers;
}

function drawArray(array, canvas, context){
    for(let i = 0; i < array.length; i++){
        let length = array[i];
        let x = i * (canvas.width / array.length);
        let y = canvas.height;

        //need to normalize height in range
        let normalized = (canvas.height) * (length)/100

        const lightness =
            90 -
            ((length) / (100)) *
            (60);

        let color = `hsl(${0}, ${100}%, ${lightness}%)`;

        context.fillStyle = color;
        context.fillRect(x, y, canvas.width / array.length, -normalized);
    }
}

function bubbleSort() {
    numbers = generate100();
    let i = 0;
    let j = 0;
    let sorting = true;

    function bubbleSortStep() {
        // Perform a single swap
        if (numbers[j] > numbers[j+1]) {
            let temp = numbers[j];
            numbers[j] = numbers[j+1];
            numbers[j+1] = temp;
        }

        // Update the visualization
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawArray(numbers, canvas, ctx);

        // Move to the next pair of elements
        j++;
        if (j == numbers.length-i-1) {
            i++;
            j = 0;
        }

        // Check if the array is sorted
        if (i == numbers.length-1) {
            sorting = false;
        }
    }

    let intervalId = setInterval(() => {
        if (sorting) {
            bubbleSortStep(numbers);
        } else {
            clearInterval(intervalId);
        }
    }, 1 );
}

function selectionSort() {
    numbers = generate100();
    let intervalId = setInterval(selectionSortStep, 10);
    let i = 0;

    function selectionSortStep() {
        let minIndex = i;
        for (let j = i+1; j < numbers.length; j++) {
            if (numbers[j] < numbers[minIndex]) {
                minIndex = j;
            }
        }
        // swap arr[i] and arr[minIndex]
        let temp = numbers[i];
        numbers[i] = numbers[minIndex];
        numbers[minIndex] = temp;

        i++;

        // draw the updated array on the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawArray(numbers, canvas, ctx);

        if (i >= numbers.length-1) {
            clearInterval(intervalId);
        }
    }
}

function insertionSort() {
    numbers = generate100();
    let intervalId = setInterval(insertionSortStep, 10);
    let i = 1;

    function insertionSortStep() {
        let key = numbers[i];
        let j = i-1;

        while (j >= 0 && numbers[j] > key) {
            numbers[j+1] = numbers[j];
            j--;
        }

        numbers[j+1] = key;
        i++;

        // draw the updated array on the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawArray(numbers, canvas, ctx);

        if (i >= numbers.length) {
            clearInterval(intervalId);
        }
    }
}


let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.75;
let ctx = canvas.getContext("2d");
let numbers = generate100();
drawArray(numbers, canvas, ctx);

