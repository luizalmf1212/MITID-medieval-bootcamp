
let board;
// Creates a variable to store the Arduino board.

let potentiometer;
// Creates a variable to store the potentiometer.

let currentPotValue = 0;
// Stores the current value of the potentiometer.
// Starts at 0 because no value has been received yet.


function setup() {
    // Runs once when the program starts.

    createCanvas(700, 500);
    // Creates a canvas that is 700 pixels wide
    // and 500 pixels high.

    board = createBoard();
    // Sets up the Arduino board.

    createConnectButton(board);
    // Creates a button to connect the Arduino.

    potentiometer = new five.Sensor("A0");
    // Sets up the potentiometer on analog pin A0.

    potentiometer.on("change", function(latestvalue) {
        // Runs when the potentiometer value changes.

        currentPotValue = latestvalue;
        // Saves the new potentiometer value.
    });
}


function draw() {
    // Runs continuously while the program is running.

    background(220);
    // Sets the background to light gray.

    let max = floor(map(currentPotValue, 0, 1023, 0, 20));
    // Converts the potentiometer value from 0-1023
    // to a number between 0 and 20.
    // floor() rounds the number down.

    for(let h=0;h<max;h++){
        fill("#FF0000");
        // Sets the circle color to red.

        rect(300, 450 - h*10, 50, h);
        // Draws a square.
        // X position: moves 30 pixels to the right each time.
        // Y position: stays at 250.
        // Diameter: 20 pixels.
    }
}






