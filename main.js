quick_draw_data_set=["envelope", "apple", "cloud", "rain", "alarm clock", "phone", "tree", "necklace", "fan"];
randomNumber = Math.floor((Math.random()*quick_draw_data_set.length)+1);
sketch = quick_draw_data_set[randomNumber];
document.getElementById("Sketch").innerHTML = "Sketch to be drawn: " + sketch;
timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
function setup() {
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
   
}



function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw() {
    strokeWeight(13);
    stroke("black");
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    check_sketch();
    if(drawn_sketch == sketch){
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML = "Score: " + score;
    }

}

function check_sketch() {
    timer_counter++
    document.getElementById("timer").innerHTML = "Timer: " + timer_counter;
    if(timer_counter > 2000){
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check == "completed"|| answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }

}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById('label').innerHTML = 'Label: ' + results[0].label;
    document.getElementById('confidence').innerHTML = 'Confidence: ' +Math.round(results[0].confidence * 100) + '%';
    
} 