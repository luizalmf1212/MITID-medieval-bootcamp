
let board;
let bodyPose;
let video;
let poses = [];
let piezo;
let lastFrequency = 0;

async function setup() {
    createCanvas(700, 500);

    board = createBoard();
    createConnectButton(board);

    // Creates a buzzer on pin 3.
    piezo = new five.Piezo(3);

    // Starts the webcam.
    video = createCapture(VIDEO);
    video.size(700, 500);
    video.hide();

    // Starts body detection.
    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function(results) {
        poses = results;
    });
}

function draw() {
    image(video, 0, 0);

    if (poses.length > 0) {

        // Gets the positions of both eyes.
        let le = poses[0].left_eye;
        let re = poses[0].right_eye;

        // Calculates the distance between the eyes.
        let distance = dist(le.x, le.y, re.x, re.y);

        // Converts the distance into a sound frequency.
        let frequency = map(distance, 20, 150, 100, 900);

        // Keeps the frequency between 100 and 900 Hz.
        frequency = constrain(frequency, 100, 900);

        // Updates the buzzer when the frequency changes.
        if (abs(frequency - lastFrequency) > 20) {
            piezo.tone(frequency);
            lastFrequency = frequency;
        }

        // Displays the frequency on the screen.
        fill("#FFFFFF");
        textSize(30);
        text("Frequency: " + round(frequency) + " Hz", 20, 60);

        // Displays the distance between the eyes.
        text("Distance: " + round(distance), 20, 110);

    } else {
        // Stops the buzzer when no body is detected.
        if (lastFrequency !== 0) {
            piezo.noTone();
            lastFrequency = 0;
        }
    }
}

        






