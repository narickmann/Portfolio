'use strict';

import { elements } from "./settings.js";

const button = {
  btnAnimation() {
    const createNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const activateAnimation = () => {
      const randomIndex = createNumber(0, elements.animatedBtns.length - 1);
      const btn = elements.animatedBtns[randomIndex];

      btn.classList.add("button_animation");
      btn.classList.contains('button') ? true : btn.classList.add('bg_animation');
      setTimeout(() => {
        btn.classList.remove("button_animation");
        btn.classList.contains('button') ? true : btn.classList.remove('bg_animation');
      }, 2500);

    };

    const startBtnAnimation = () => {
      activateAnimation();
      setTimeout(startBtnAnimation, createNumber(5000, 8000));
    };

    startBtnAnimation();
  }
};

export const btnAnimation = button.btnAnimation;