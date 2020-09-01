let repeat = false;
let fillbar = document.querySelector(".fill");
let audios = ["sounds/Audio_One.mp3","sounds/Audio_Two.mp3","sounds/Audio_Three.mp3"];
let imgs = ["img/cover1.jpg","img/cover2.jpg","img/cover3.jpg"];
let playTime = document.querySelector(".current-time");
let totalTime = document.querySelector(".end-time");
let playBtn = document.querySelector(".play-pause");
let ppContainer = document.querySelector(".play-pause-container");
let img = document.querySelector("img");
let muteBtn = document.querySelector(".mute-btn");
let repeatBtn = document.querySelector(".repeat-btn");
repeatBtn.addEventListener("click",function(){
    if(!repeat){
        repeat = true;
        repeatBtn.style.color = "rgb(255, 40, 40)" ;
    }
    else{
        repeat = false;
        repeatBtn.style.color = "white" ;
    }
})

//create an object of audio
let audio = new Audio(); 
let currentSong = 0;


playBtn.addEventListener("click",playSong);

function playSong(){
    audio.src = audios[currentSong] ; 
    audio.load();
    audio.play();
}

function togglePlayPause(){
    if(audio.paused){
        audio.play();
        ppContainer.innerHTML = '<a href="#"  class="fa fa-pause play-pause" onclick="togglePlayPause()"></a>' ;
    }
    else{
        audio.pause();
        ppContainer.innerHTML = '<a href="#"  class="fa fa-play play-pause" onclick="togglePlayPause()"></a>' ;
    }
}

// audio.currentTime = 168 ; 
// to make a dynamic fillbar and playing time 
audio.addEventListener("timeupdate",function(){
    let position = audio.currentTime / audio.duration ; 
    if(audio.currentTime >= audio.duration){
        if(repeat === true ){
              audio.currentTime = 0 ;
              playSong();
        }
        else nextAudio();
    }
    else{
        fillbar.style.width = position * 100 + "%" ;

        // to manage the time according to the song played
        let minutes = Math.floor(audio.currentTime / 60 ) ;
        let seconds = Math.floor(audio.currentTime % 60 );
        let totMinutes = Math.floor(audio.duration/60) ; 
        let totSeconds = Math.floor(audio.duration%60) ;

        if(seconds < 10){
            seconds = "0" + seconds ; 
        } 
        if(totSeconds < 10){
            totSeconds = "0" + totSeconds ;
        }

        playTime.textContent = `${minutes}:${seconds}` ;
        totalTime.textContent = `${totMinutes}:${totSeconds}` ;
    }
})

// when clicking next btn 
function nextAudio(){
    currentSong++;
    if(currentSong > audios.length - 1 ){
        currentSong = 0 ;
    }
    audio.src = audios[currentSong] ; 
    img.src = imgs[currentSong] ;

    playAudio();
}

// when clicking prev btn 
function prevAudio(){
    currentSong--;
    if(currentSong < 0){
        currentSong = audios.length - 1 ;
    }
    audio.src = audios[currentSong] ; 
    img.src = imgs[currentSong] ;

    playAudio();
}

// autoplay the next audio when clicking btn
function playAudio(){
    audio.play();
    ppContainer.innerHTML = '<a href="#"  class="fa fa-pause play-pause" onclick="togglePlayPause()"></a>' ;
}

// decrease volume, increase volume and mute
function decreaseVolume(){
    if(audio.volume - 0.18 >= 0 )
        audio.volume -= 0.18 ;
}
function increaseVolume(){
    if(audio.volume + 0.18 <= 1 )
        audio.volume += 0.18 ;
}
function muteAudio(){
    if(audio.volume===1){
        audio.volume = 0;
        muteBtn.innerHTML = '<a href="#" class="fa fa-volume-mute" onclick="muteAudio()"></a>' ;
    }
    else{
        audio.volume = 1;
        muteBtn.innerHTML = '<a href="#" class="fa fa-volume-up" onclick="muteAudio()"></a>' ;
    }
}