const container = document.querySelector('.fireworks-container');
const fireworks = new Fireworks(container,
    { 
        sound: { enabled :true , volume: { min: 5, max: 8 }, files: ["https://fireworks.js.org/sounds/explosion0.mp3","https://fireworks.js.org/sounds/explosion1.mp3","https://fireworks.js.org/sounds/explosion2.mp3"]},
        lineWidth: {explosion: { min: 7, max: 7 }, trace: { min: 2, max: 3 }},
        explosion: 10,
    });
//fireworks.start();

const button = document.getElementById("start");

button.addEventListener("click", function() {
    document.querySelector(".container").style.display = "none";
    fireworks.start();
    //fireworks.setOptions({ sound: { enabled :true , volume: { min: 2, max: 4 }, files: [
    //    "https://fireworks.js.org/sounds/explosion0.mp3",
    //    "https://fireworks.js.org/sounds/explosion1.mp3",
    //    "https://fireworks.js.org/sounds/explosion2.mp3"
    //  ]} });
});