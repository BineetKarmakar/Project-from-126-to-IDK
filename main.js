song_meet_and_fun=""
song_envelope=""

leftWristX=0
leftWristY=0

rightWristX=0
rightWristY=0

left_wrist_score=0

song_status=""

function preload(){
    song_meet_and_fun = loadSound("Meet & Fun! - Ofshane.mp3")
    song_envelope = loadSound("envelope.mp3")

    song_status = song_meet_and_fun.isPlaying()
}

function setup(){
    canvas = createCanvas(600,500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video,ModelLoaded)
    poseNet.on('pose',gotPoses)

}

function draw(){
    image(video, 0, 0, 600, 500)

    fill("#0223fa")
    stroke("#0223fa")

    if (left_wrist_score > 0.2) {
        circle(leftWristX, leftWristY, 20)
        song_envelope.stop()

       if(song_meet_and_fun == false){
           song_meet_and_fun.play()

           document.getElementById("song_name").innerHTML="Song Name = "+song_status
       }
    }
}

function ModelLoaded(){
    console.log("PoseNet is initialised")
}

function gotPoses(results){
    if (results.length > 0){

        console.log(results)
        left_wrist_score = results[0].pose.keypoints[9].score
        console.log("left Wrist Score = "+left_wrist_score)

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY)

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY)
    }
}
