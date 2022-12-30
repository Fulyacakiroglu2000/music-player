const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");
const totalPrice=document.querySelector("#totalPrice");
const price=document.getElementById("tutarBtn");
const buyBtn=document.getElementById("buyBtn");
const fly=document.getElementById("fly")
const labels=document.querySelectorAll("label")
const texts=document.getElementById("text")
const id1=document.getElementById("id1");
const id2=document.getElementById("id2");
const id3=document.getElementById("id3");
const id4=document.getElementById("id4");
const id5=document.getElementById("id5");
const id6=document.getElementById("id6");

const player=new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});


function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}


play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => { prevMusic(); });

next.addEventListener("click", () => { nextMusic(); });

const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const pauseMusic = () => {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

const playMusic = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
    const timelimit=5;
    const interval =setInterval(()=>{
        if(audio.currentTime>=timelimit){
            audio.pause()
            clearInterval(interval)

            //müzik beş saniyede durduğunda butonun da play'e dönmesi 
            fly.classList.remove("playing");
            play.querySelector("i").classList = "fa-solid fa-play";
        }
    },1000)
    
}


const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenenSaniye = saniye < 10 ? `0${saniye}`: `${saniye}`;
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
    
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let sesDurumu = "sesli";

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0) {
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if(sesDurumu==="sesli") {
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});

const displayMusicList = (list) => {
    for(let i=0; i < list.length; i++) {
        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <input id="a" type="checkbox" name="checkbox" onclick="showPrice()"/>
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `
            ;

        ul.insertAdjacentHTML("beforeend", liTag);


        //müzik süresinin tutulduğu kısım
        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
            
        });

    }
}
function showPrice() {
    
    localStorage.clear();
    let checkedCount=document.querySelectorAll('input[type="checkbox"]:checked').length;
    let price=checkedCount*5.99;
    console.log(price)
    totalPrice.value=price;
    localStorage.setItem("totalPrice",JSON.stringify(price));
    localStorage.setItem("checkedCount",JSON.stringify(checkedCount));
    
}
function priceInChart(){
    
    if(localStorage.getItem("checkedCount")!=null){
        price.textContent=localStorage.getItem("totalPrice")+" tl";
        localStorage.clear()
    }else{
        
        price.textContent="0 tl";
        
    }
    
}
function buyFunc(){
    
    if(id1.value==='') { 
        console.log("aaa")
        alert("lütfen bilgilerinizi eksiksiz doldurun.");
    }else if(id2.value===''){
       
        alert("lütfen bilgilerinizi eksiksiz doldurun.");
    }else if(id3.value===''){
        alert("lütfen bilgilerinizi eksiksiz doldurun.");
    }else if(id4.value===''){
       
        alert("lütfen bilgilerinizi eksiksiz doldurun.");
    }else if(id5.value===''){
       
        alert("lütfen bilgilerinizi eksiksiz doldurun.");
    }else if(id6.value===''){
       
        alert("lütfen bilgilerinizi eksiksiz doldurun.");

    
    }else{
        alert("satın alma işleminiz başarıyla gerçekleşmiştir.")
    }
}



const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");    
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}



const isPlayingNow = () => {
    for(let li of ul.querySelectorAll("li")) {
        if(li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index") == player.index) {
            li.classList.add("playing");
        }
    }
}

audio.addEventListener("ended", () => {
    nextMusic();
})