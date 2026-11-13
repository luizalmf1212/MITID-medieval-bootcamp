
let board;
let bodyPose;
let video;
let poses = [];

let glassesColor;
let lastButtonState = 1;
let lastChangeTime = 0;

async function setup() {

    createCanvas(700, 500);

    // Connect Arduino
    board = createBoard();
    createConnectButton(board);

    // Initial glasses color
    glassesColor = color(0, 255, 0);

    // Start webcam
    video = createCapture(VIDEO);
    video.size(700, 500);
    video.hide();

    // Start body detection
    bodyPose = await ml5.bodyPose();

    bodyPose.detectStart(video, function(results) {
        poses = results;
    });

    noFill();
    strokeWeight(3);
}

function draw() {

    // Display webcam
    image(video, 0, 0);

    // Read button connected to D3
    if (board.isConnected) {

        let buttonState = board.digitalRead(3);
        console.log("Button D3",buttonState);
        // Change color once per press
        if (buttonState == 0 &&
            lastButtonState == 1 &&
            millis() - lastChangeTime > 200) {

            glassesColor = color(
                random(255),
                random(255),
                random(255)
            );

            lastChangeTime = millis();
        }

        lastButtonState = buttonState;
    }

    // Set glasses color
    stroke(glassesColor);
    strokeWeight(3);
    noFill();

    // Detect face
    if (poses.length > 0) {

        let le = poses[0].left_eye;
        let re = poses[0].right_eye;

        let rea = poses[0].right_ear;
        let lea = poses[0].left_ear;

        let d = 60;

        // Left lens
        circle(le.x, le.y, d);

        // Right lens
        circle(re.x, re.y, d);

        // Glasses bridge
        line(
            le.x - d/2, le.y,
            re.x + d/2, re.y
        );

        // Left glasses arm
        line(
            le.x + d/2, le.y,
            lea.x, lea.y - 20
        );

        // Right glasses arm
        line(
            re.x - d/2, re.y,
            rea.x, rea.y - 20
        );
    }
}


