var greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    
var gameMode = undefined,
    started=false,
    solution = [],
    played,
    count = 0,
    inputActive = false;

$('document').ready(function(){
    
   
  $("button").on("click",function(){
    var value = $(this).val();
    if(value=="start"){
      if(gameMode){
        started = true;
        play();
      }
    }
    if(value=="reset"){
      resetGame();
    }
    
  })
  
  $(".game-mode").on("click",function(){
    if(!started){
      var value = $(this).data("value");
      if(value=="easy"){
        $("#strict").css("border","5px dotted white");
        $("#easy").css("border","5px dotted orange");
        gameMode = "easy";
      }
      if(value=="strict"){
        $("#easy").css("border","5px dotted white");
        $("#strict").css("border","5px dotted orange");
        gameMode = "strict";
      }
    }
  })
  
});


function play(){
  $("img").unbind();
  count++;
  $("#count").text(count);
  if(count<20){
  newMove = randomMove();
  solution.push(newMove);
  playSolution(solution);
  }else{
    alert("YOU WON !!");
    resetGame();
  }
}

function playerInput(){
  var index = 0;
  
  $("img").on("click",function(evt){
       
    played = event.target.id;
    
    var audio;
    if(played=="green")
      audio = greenAudio;
    else if(played=="red")
      audio = redAudio;
    else if(played=="yellow")
      audio = yellowAudio;
    else audio = blueAudio;
    
    glow(played,audio);
    
    if(played == solution[index]){
      if(index == solution.length-1){
        $("img").unbind();
        play();
        return;
      }else{
        index++;
      }
    }else{
      $("img").unbind();
      if(gameMode == "easy"){
        alert("Almost..! Try again.");
        setTimeout(function(){
          playSolution(solution);
        },1500)
      }else{
        alert("You lost! Better luck next time!");
        setTimeout(function(){
          resetGame();
        },1500)
      }
    }
  })
  
}

function playSolution(arr){
  if(arr&&arr.length>0){
    for(var i=0;i<arr.length;i++){
      console.log(arr);
        if(arr[i]=="green"){
          setTimeout(function(){
            glow("green",greenAudio);
          },1200*(i+1));
        }else if(arr[i] =="red"){
          setTimeout(function(){
            glow("red",redAudio);
          },1200*(i+1)); 
        }else if(arr[i]=="yellow"){
          setTimeout(function(){
            glow("yellow",yellowAudio);
          },1200*(i+1));
        }else{
          setTimeout(function(){
            glow("blue",blueAudio);
          },1200*(i+1));   
        }
    }
  }
  setTimeout(playerInput(),1000*(arr.length)+900);
}

function glow(id,audio){
  setTimeout(function(){
    audio.playbackRate = 0.7;
  $("#"+id+"").css("filter","none");
  audio.play();
  },300)
  setTimeout(function(){
    $("#"+id+"").css("filter","grayscale(75%)");
  },600);  
  audio.load();
}

function resetGame(){
  started = false;
  gameMode = undefined;
  $(".game-mode").css("border","5px dotted white");
  solution = [];
  played = [];
  count = 0;
  $("#count").text("0");
  $("img").unbind();
}


function randomMove(){
  var number = Math.random();
  if(number<0.26)
    return "green";
  else if(number<0.51)
    return "red";
  else if(number<0.76)
    return "yellow";
  else return "blue";
}