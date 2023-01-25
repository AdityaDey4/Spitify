console.log("Hello world.............");

let songIndex = 0;
let gif = document.getElementById("gif");
let myProgressBar = document.getElementById("myProgressBar");
let masterPlay = document.getElementById("masterPlay");
let audioElement = new Audio("songs/Agar Tum Mil Jao.mp3");
let songItems = document.getElementsByClassName("songitem");
let songitemplay = document.getElementsByClassName("songitemplay");
let playingSongName = document.getElementById("playingsongname");
let prevSong = document.getElementsByClassName("myicons")[0];
let nextSong = document.getElementsByClassName("myicons")[2];

let songs = [
    {songName : "Agar Tum Mil Jao", filePath : "songs/Agar Tum Mil Jao.mp3", coverPath : "pics/pic1.png"},
    {songName : "Deewana Kar Raha Hai", filePath : "songs/Deewana Kar Raha Hai.mp3", coverPath : "pics/pic2.png"},
    {songName : "Dil Ibaadat", filePath : "songs/Dil Ibaadat.mp3", coverPath : "pics/pic3.png"},
    {songName : "Dil Ko Churaya", filePath : "songs/Dil Ko Churaya.mp3", coverPath : "pics/pic4.png"},
    {songName : "Haan Tu Hain", filePath : "songs/Haan Tu Hain.mp3", coverPath : "pics/pic5.png"},
    {songName : "Hale Dil", filePath : "songs/Hale Dil.mp3", coverPath : "pics/pic6.png"},
    {songName : "Tera Mera Rishta", filePath : "songs/Tera Mera Rishta.mp3", coverPath : "pics/pic7.png"},
    {songName : "Teri Yadon Main", filePath : "songs/Teri Yadon Main.mp3", coverPath : "pics/pic8.png"},
    {songName : "Tu Hi Meri Shab Hai", filePath : "songs/Tu Hi Meri Shab Hai.mp3", coverPath : "pics/pic9.png"},
    {songName : "Zara Sa", filePath : "songs/Zara Sa.mp3", coverPath : "pics/pic10.jpg"}
];


Array.from(songItems).forEach((element, index)=> {
    element.getElementsByTagName("img")[0].src = songs[index].coverPath;
    element.getElementsByClassName("songname")[0].innerHTML = songs[index].songName;

});


masterPlay.addEventListener("click", ()=> {
    
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("whiteplay");
        masterPlay.classList.add("whitepause");
        changeIcon();
    }else {
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove("whitepause");
        masterPlay.classList.add("whiteplay");
        allPause();
    }
});

prevSong.addEventListener("click", ()=> {
    songIndex = (songIndex-1+10)%10;
    changeSong();
    changeIcon();
});

nextSong.addEventListener("click", ()=> {
    songIndex = (songIndex+1+10)%10;
    changeSong();
    changeIcon();
});

audioElement.addEventListener("timeupdate", ()=> {

    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", ()=> {

    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
});

Array.from(songitemplay).forEach((element, index)=> {
    element.addEventListener("click", (e)=> {

        if(element.classList.contains("blackpause")) {

            element.classList.remove("blackpause");
            element.classList.add("blackplay");

            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove("whitepause");
            masterPlay.classList.add("whiteplay");

        }else {
            allPause(); 
            element.classList.remove("blackplay");
            element.classList.add("blackpause");
    
            audioElement.src = songs[index].filePath;
            audioElement.play();
    
            gif.style.opacity = 1;
            masterPlay.classList.remove("whiteplay");
            masterPlay.classList.add("whitepause");
            
            playingSongName.innerHTML = songs[index].songName;
        }       

        songIndex = index;
    });
});

const allPause = ()=> {
    Array.from(songitemplay).forEach(it=> {
        it.classList.remove("blackpause");
        it.classList.add("blackplay");
    });
}

const changeIcon = ()=> {
    allPause();
    let element = songItems[songIndex].getElementsByClassName("songitemplay")[0];
    element.classList.remove("blackplay");
    element.classList.add("blackpause");
}

const changeSong = ()=> {
    Array.from(songitemplay).forEach(it=> {
        it.classList.remove("blackpause");
        it.classList.add("blackplay");
    }); 

    audioElement.src = songs[songIndex].filePath;
    audioElement.play();

    gif.style.opacity = 1;
    masterPlay.classList.remove("whiteplay");
    masterPlay.classList.add("whitepause");

    playingSongName.innerHTML = songs[songIndex].songName;
}

function formatSecondsAsTime(secs) {
  var hr  = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600))/60);
  var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

  if (min < 10){ 
    min = "0" + min; 
  }
  if (sec < 10){ 
    sec  = "0" + sec;
  }

  return min + ':' + sec;
}