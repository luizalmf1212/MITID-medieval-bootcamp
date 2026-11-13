
let board;
let bodyPose;
let video;
let poses = [];

let glassesColor = "#000000";
let lastButtonState = 1;

async function setup() {
    createCanvas(700, 500);

    board = createBoard();
    createConnectButton(board);


    board.pinMode(3, board.MODES.INPUT_PULLUP);


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
    // Displays the webcam video.
    image(video, 0, 0);
    let buttonState = board.digitalRead(3);
    if (buttonState === 0 && lastButtonState === 1) {
        changeColor();
    }

    lastButtonState = buttonState;
    if (poses.length > 0) {

        // Gets the positions of both eyes.
        let le = poses[0].left_eye;
        let re = poses[0].right_eye;

        // Calculates the distance between the eyes.
        let distance = dist(le.x, le.y, re.x, re.y);

        // Calculates the center of the glasses.
        let x = (le.x + re.x) / 2;
        let y = (le.y + re.y) / 2;

        // Sets the glasses size.
        let size = distance * 0.85;

        // Draws the glasses frames.
        noFill();
        stroke(glassesColor);
        strokeWeight(5);

        // Left lens.
        circle(le.x, le.y, size);

        // Right lens.
        circle(re.x, re.y, size);

        // Draws the bridge between the lenses.
        line(le.x + size/2, le.y,
             re.x - size/2, re.y);

        // Resets the drawing settings.
        noStroke();
    }
}


function changeColor() {
    glassesColor = color(
        random(255),
        random(255),
        random(255)
    );
}
