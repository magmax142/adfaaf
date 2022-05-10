previousResult="";
newResult="";
newAccuracy="";
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  mobilenet=ml5.imageClassifier("MobileNet", modelloaded)
}
function modelloaded(){
  console.log("model loaded successfully");
}

function draw(){
  image(video,0,0,300,300);
  mobilenet.classify(video,getResult)
}
function getResult(e,r){
if(e){
  console.error(e);
}
else{
  
  newResult=r[0].label;
  newAccuracy=r[0].confidence;
  if(newResult!=previousResult&&newAccuracy>0.5){
    console.log(r);
    document.getElementById("result_object_name").innerHTML=newResult;
    document.getElementById("result_object_accuracy").innerHTML=(newAccuracy*100).toFixed(2)+"%";
    speak_data="THE OBJECT DETECTED IS "+newResult
    speak_audio=new SpeechSynthesisUtterance(speak_data)
    window.speechSynthesis.speak(speak_audio)
    previousResult=newResult;
    
  }
}
}



