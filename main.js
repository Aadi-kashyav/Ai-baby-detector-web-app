img = "";
status = "";
objects = [];
function preload(){
img = loadImage('dog_cat.jpg');
}
function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for(i = 0 ; i < objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Object detected"; 
            if(objects[i].label == "person") {
            document.getElementById("baby_status").innerHTML = "Baby status : Baby is detected";
            alarm.stop();
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" ,objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y ,objects[i].width , objects[i].height);
            }
            else{
                document.getElementById("baby_status").innerHTML = "Baby status : Baby is not detected";
                alarm.play();
            }
            if(objects.length < 0 ) {
                document.getElementById("baby_status").innerHTML = "Baby status : Baby is not detected";
                alarm.play();
            }
        }
    }  
}
function modelLoaded(){
    console.log("Model loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
