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
        let y = 0.75 * canvas.height;

        //need to normalize height in range
        let normalized = (0.75 * canvas.height) * (length)/100

        const lightness =
            90 -
            ((length) / (100)) *
            (60);

        let color = `hsl(${0}, ${100}%, ${lightness}%)`;

        context.fillStyle = color;
        context.fillRect(x, y, canvas.width / array.length, -normalized);
    }
}

function bubbleSort(arr) {
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

let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let numbers = generate100();
drawArray(numbers, canvas, ctx);

