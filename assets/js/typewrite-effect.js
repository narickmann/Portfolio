'use strict';

const typewriter = {
  index: 0,
  speed: 120,
  element: null,
  text: '',
  interval: null,

  typewriteEffect(element, speed = 120, repeatInterval = 10000) {
    typewriter.element = element;
    typewriter.text = element.innerHTML;
    typewriter.index = 0;
    typewriter.speed = speed;
    typewriter.element.innerHTML = '';
    typewriter.type();

    if (repeatInterval > 0) {
      typewriter.interval = setInterval(() => {
        typewriter.index = 0;
        typewriter.element.innerHTML = "";
        typewriter.type();
      }, repeatInterval);
    }
  },

  type() {
    if (typewriter.index < typewriter.text.length) {
      let char = typewriter.text.charAt(typewriter.index);

      if (char === "<") {
        let endTagIndex = typewriter.text.indexOf(">", typewriter.index);
        if (endTagIndex !== -1) {
          char = typewriter.text.substring(typewriter.index, endTagIndex + 1);
          typewriter.index = endTagIndex;
        }
      }

      typewriter.element.innerHTML += char;
      typewriter.index++;
      setTimeout(() => typewriter.type(), typewriter.speed);
    }
  }
}

export const typewriteEffect = typewriter.typewriteEffect;
