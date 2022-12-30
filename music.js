class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}


const musicList = [
    new Music("Rüzgar Sesi", "Doğa","doga.jpeg","ruzgar.mp3"),    
    new Music("Havlama Sesi", "Köpek","kopek.jpeg","kopek.mp3"),    
    new Music("Karışık Sesler", "Gök Gürültüsü/Yağmur","yagmur.jpeg","yagmur.mp3"),
    new Music("Nehir/Göl Sesi", "Su","susesi.jpeg","susesi.mp3")    
];
