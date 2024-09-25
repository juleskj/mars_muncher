window.addEventListener("load", sidenVises);

let point = 0;
let liv = 3;

const marsCon1 = document.querySelector("#marsbar_container1");
const marsSprit1 = document.querySelector("#marsbar_sprite1");

const marsCon2 = document.querySelector("#marsbar_container2");
const marsSprit2 = document.querySelector("#marsbar_sprite2");

const marsCon3 = document.querySelector("#marsbar_container3");
const marsSprit3 = document.querySelector("#marsbar_sprite3");

const marsCon4 = document.querySelector("#marsbar_container4");
const marsSprit4 = document.querySelector("#marsbar_sprite4");

const astroCon1 = document.querySelector("#astroide_container1");
const astroSprit1 = document.querySelector("#astroide_sprite1");

const astroCon2 = document.querySelector("#astroide_container2");
const astroSprit2 = document.querySelector("#astroide_sprite2");

const astroCon3 = document.querySelector("#astroide_container3");
const astroSprit3 = document.querySelector("#astroide_sprite3");

const gameOverScreen = document.querySelector("#game_over");
const levelCompleteScreen = document.querySelector("#level_complete");
const startScreen = document.querySelector("#start");

function randomTal(max) {
  return (mitRandom = Math.floor(Math.random() * max) + 1);
}

function sidenVises() {
  console.log("vis start skærm");

  //Skjul andre skærme
  gameOverScreen.classList.add("hide");
  levelCompleteScreen.classList.add("hide");
  //Vis start skærm
  startScreen.classList.remove("hide");
  //Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startSpil);
}

function startSpil() {
  console.log("spillet starter");

  //skjul ander skærme
  startScreen.classList.add("hide");
  gameOverScreen.classList.add("hide");
  levelCompleteScreen.classList.add("hide");
  //nulstil point
  point = 0;

  //skriv point og liv ud
  document.getElementById("life2").style.backgroundImage = "url('svg/liv.svg')";
  document.getElementById("life1").style.backgroundImage = "url('svg/liv.svg')";
  document.getElementById("life3").style.backgroundImage = "url('svg/liv.svg')";

  liv = 3;

  //start timer -animation
  document.querySelector("#timer").classList.add("timer");

  document.querySelector("#timer").addEventListener("animationend", stopSpil);

  //random position og random delay

  marsCon1.classList.add(
    "pos" + randomTal(7),
    "falde_drej",
    "speed" + randomTal(5),
    "delay" + randomTal(4)
  );
  marsCon2.classList.add(
    "pos" + randomTal(7),
    "falde_drej",
    "speed" + randomTal(5),
    "delay" + randomTal(4)
  );
  marsCon3.classList.add(
    "pos" + randomTal(7),
    "falde_drej",
    "speed" + randomTal(5),
    "delay" + randomTal(4)
  );
  marsCon4.classList.add(
    "pos" + randomTal(7),
    "falde_drej",
    "speed" + randomTal(5),
    "delay" + randomTal(4)
  );

  astroCon1.classList.add(
    "pos" + randomTal(7),
    "falde",
    "speed" + randomTal(5),
    "delay" + randomTal(4)
  );
  astroCon2.classList.add(
    "pos" + randomTal(7),
    "falde",
    "speed" + randomTal(5),
    "delay" + randomTal(4)
  );

  astroCon3.classList.add(
    "pos" + randomTal(7),
    "falde",
    "speed" + randomTal(5),
    "delay" + randomTal(4)
  );

  //start fald animation på elementer

  marsCon1.addEventListener("animationiteration", marsBarReset);
  marsCon2.addEventListener("animationiteration", marsBarReset);
  marsCon3.addEventListener("animationiteration", marsBarReset);
  marsCon4.addEventListener("animationiteration", marsBarReset);

  marsCon1.addEventListener("mousedown", clickObjekterGod);
  marsCon2.addEventListener("mousedown", clickObjekterGod);
  marsCon3.addEventListener("mousedown", clickObjekterGod);
  marsCon4.addEventListener("mousedown", clickObjekterGod);

  astroCon1.addEventListener("animationiteration", astroideReset);
  astroCon2.addEventListener("animationiteration", astroideReset);
  astroCon3.addEventListener("animationiteration", astroideReset);

  astroCon1.addEventListener("mousedown", clickObjekterDaarlig);
  astroCon2.addEventListener("mousedown", clickObjekterDaarlig);
  astroCon3.addEventListener("mousedown", clickObjekterDaarlig);
}

function clickObjekterGod() {
  console.log("der bliver klikket");

  this.classList.add("stop");
  this.firstElementChild.classList.add("klik_god");
  this.removeEventListener("mousedown", clickObjekterGod);

  this.addEventListener("animationend", marsBarReset);

  point++;
  document.querySelector("#point_tal").textContent = point;

  // her kommer der lyd på
  document.querySelector("#sound_marsbar").volume = 0.2;
  document.querySelector("#sound_marsbar").currentTime = 0;
  document.querySelector("#sound_marsbar").play();
}

//her for mars baren en ny position
function marsBarReset() {
  console.log("mars bar reset");

  this.addEventListener("mousedown", clickObjekterGod);
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;

  //document.querySelector("#marsbar_container1").classList.add("falde", "pos2");

  this.classList.add(
    "pos" + randomTal(7),
    "falde_drej",
    "speed" + randomTal(5),
    "delay" + randomTal(4)
  );
}

function clickObjekterDaarlig() {
  console.log("der bliver klikket på dårlig");

  this.classList.add("stop");
  this.firstElementChild.classList.add("klik_daarlig");

  this.removeEventListener("mousedown", clickObjekterDaarlig);
  this.addEventListener("animationend", astroideReset);

  liv--;
  document.querySelector(".liv").textContent = liv;

  if (liv <= 0) {
    stopSpil();

    document.getElementById("life1").style.backgroundImage =
      "url('svg/mistet_liv.svg')";
  }

  if (liv == 2) {
    document.getElementById("life3").style.backgroundImage =
      "url('svg/mistet_liv.svg')";
  }

  if (liv == 1) {
    document.getElementById("life2").style.backgroundImage =
      "url('svg/mistet_liv.svg')";
  }

  //*************************her komer der lyd på*************************
  document.querySelector("#sound_astroide").volume = 0.5;
  document.querySelector("#sound_astroide").currentTime = 0;
  document.querySelector("#sound_astroide").play();
}

function astroideReset() {
  console.log("astroide reset");

  this.classList = "";
  this.firstElementChild.classList = "";

  this.offsetLeft;
  this.addEventListener("mousedown", clickObjekterDaarlig);

  this.classList.add(
    "pos" + randomTal(7),
    "falde",
    "speed" + randomTal(5),
    "delay" + randomTal(4)
  );
}

function stopSpil() {
  console.log("stopSpil");
  //stop alle animationer

  marsCon1.classList = "";
  marsCon2.classList = "";
  marsCon3.classList = "";
  marsCon4.classList = "";

  marsSprit1.classList = "";
  marsSprit2.classList = "";
  marsSprit3.classList = "";
  marsSprit4.classList = "";

  astroCon1.classList = "";
  astroCon2.classList = "";
  astroCon3.classList = "";

  astroSprit1.classList = "";
  astroSprit2.classList = "";
  astroSprit3.classList = "";

  //start fald animation på elementer

  marsCon1.removeEventListener("animationiteration", marsBarReset);
  marsCon2.removeEventListener("animationiteration", marsBarReset);
  marsCon3.removeEventListener("animationiteration", marsBarReset);
  marsCon4.removeEventListener("animationiteration", marsBarReset);

  marsCon1.removeEventListener("mousedown", clickObjekterGod);
  marsCon2.removeEventListener("mousedown", clickObjekterGod);
  marsCon3.removeEventListener("mousedown", clickObjekterGod);
  marsCon4.removeEventListener("mousedown", clickObjekterGod);

  astroCon1.removeEventListener("animationiteration", astroideReset);
  astroCon2.removeEventListener("animationiteration", astroideReset);
  astroCon3.removeEventListener("animationiteration", astroideReset);

  astroCon1.removeEventListener("mousedown", clickObjekterDaarlig);
  astroCon2.removeEventListener("mousedown", clickObjekterDaarlig);
  astroCon3.removeEventListener("mousedown", clickObjekterDaarlig);

  //stop alle eventlisternes

  document.querySelector("#timer").classList = "time";
  document
    .querySelector("#timer")
    .removeEventListener("animationend", stopSpil);

  if (liv <= 0) {
    gameOver();
  } else if (point >= 15) {
    levelComplete();
  } else {
    gameOver();
  }
}

function gameOver() {
  console.log("game over");

  //Vis gameover skærm
  gameOverScreen.classList.remove("hide");
  document.querySelector("#game_over_points").textContent =
    "du tabte og fik kun " + point + " points";
  //Klik på genstart1
  document.querySelector("#genstart1").addEventListener("click", startSpil);

  document
    .querySelector(".startside_knap")
    .addEventListener("click", sidenVises);
}

function levelComplete() {
  console.log("level Complete");
  levelCompleteScreen.classList.remove("hide");
  document.querySelector("#level_complete_points").textContent =
    "du vandt og fik " + point + " point";
  //Klik på genstart2

  document.querySelector("#genstart2").addEventListener("click", startSpil);
  document
    .querySelector("#level_complete .startside_knap")
    .addEventListener("click", sidenVises);
}
