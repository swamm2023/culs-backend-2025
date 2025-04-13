let decks = Array.from(document.getElementsByTagName("main"));
let nextSlideButton = document.getElementById("next-slide");
let slideCount = document.getElementById("slide-count");
let previousSlideButton = document.getElementById("previous-slide");
let nextDeckButton = document.getElementById("next-deck");
let deckCount = document.getElementById("deck-count");
let previousDeckButton = document.getElementById("previous-deck");
// state
var deckIndex = 0;
var slideIndex = 0;
let moveSlide = (dir) => {
  let currentDeck = decks[deckIndex];
  let slides = Array.from(currentDeck.getElementsByTagName("section"));
  let newSlideIndex = slideIndex + dir;
  if((newSlideIndex >= 0) && (newSlideIndex < slides.length)) {
    slides.forEach((slide) => slide.style.transform = "translateX(-" + newSlideIndex + "00vw)");
    slideCount.innerHTML = newSlideIndex + 1 + "/" + slides.length;
    slideIndex = newSlideIndex;
  } 
}

let moveDeck = (dir) => {
  let newDeckIndex = deckIndex + dir;
  if((newDeckIndex >= 0) && (newDeckIndex < decks.length)) {
    decks.forEach((deck) => deck.style.transform = "translateY(-" + newDeckIndex + "00vh)");
    let slides = Array.from(decks[deckIndex].getElementsByTagName("section"));
    slides.forEach((slide) => slide.style.transform = "");
    deckIndex = newDeckIndex;
    slideIndex = 0;
    slideCount.innerHTML = "1/" + decks[deckIndex].getElementsByTagName("section").length;
    deckCount.innerHTML = deckIndex + 1 + "/" + decks.length;

  }
}

decks.forEach((e) => { var sc = e.getElementsByTagName("section").length; e.style = "width: " + sc + "00vw;transform: translateY(0px);"});
slideCount.innerHTML = "1/" + decks[deckIndex].getElementsByTagName("section").length;
deckCount.innerHTML = "1/" + decks.length;

nextSlideButton.addEventListener("click", (e) => moveSlide(1));
previousSlideButton.addEventListener("click", (e) => moveSlide(-1));
nextDeckButton.addEventListener("click", (e) => moveDeck(1));
previousDeckButton.addEventListener("click", (e) => moveDeck(-1));

document.body.addEventListener("keyup", 
  (e) => {
    if(e.key == " " && e.shiftKey || e.key == "ArrowLeft") moveSlide(-1)
    else if (e.key == " " || e.key == "ArrowRight") moveSlide(1);
  });

document.addEventListener("wheel", (e) => { if(e.deltaY < 0) moveSlide(-1); else moveSlide(1)});