'use strict';

import dom from "./dom.js";
import render from "./render.js";

const prev = dom.$('#arrow_left');
const next = dom.$('#arrow_right');

const handlePrev = (currentCard, slider, index) => {

  let prevCard = render.createProjectCard(slider[index]);
  prevCard.classList.add('hidden');

  currentCard.classList.remove('prev_slide_in');
  currentCard.classList.add('prev_slide_out');

  prevCard.classList.remove('hidden', 'prev_slide_out')
  prevCard.classList.add('prev_slide_in');

  setTimeout(() => {
    currentCard.classList.add('hidden');
    currentCard.classList.remove('prev_slide_out');
    prevCard.classList.remove('prev_slide_in');
    currentCard.remove();
    currentCard = prevCard;
  }, 1000); 

  return prevCard;
}

const handleNext = (currentCard, slider, index) => {
  let nextCard = render.createProjectCard(slider[index]);
  nextCard.classList.add('hidden');

  currentCard.classList.remove('next_slide_in')
  currentCard.classList.add('next_slide_out');

  nextCard.classList.remove('hidden', 'next_slide_out')
  nextCard.classList.add('next_slide_in');

  setTimeout(() => {
    currentCard.classList.add('hidden');
    currentCard.classList.remove('next_slide_out');
    nextCard.classList.remove('next_slide_in');
    currentCard.remove();
    currentCard = nextCard;
  }, 1000);

  return nextCard;
}

export function handleSlider(slider) {
  let index = 0;
  let card = render.createProjectCard(slider[index]);

  prev.addEventListener('click', () => {
    if (index == 0) {
      index = slider.length - 1;
    } else index--;
    card = handlePrev(card, slider, index);
  });

  next.addEventListener('click', () => {
    if (index == slider.length - 1) {
      index = 0;
    } else index++;
    card = handleNext(card, slider, index);
  });

}