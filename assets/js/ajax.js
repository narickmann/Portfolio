'use strict';

import render from "./render.js";

const ajax = {
  handleLoaded(event) {
    let xhr = event.target;

    if (xhr.status == 200) {
      ajax.processData(JSON.parse(xhr.response));
    } else {
      console.warn(`${xhr.responseURL} konnte nicht geladen werden. Grund: ${xhr.statusText}`);
    }
  },

  processData(payload) {
    if (payload.hero) {
      render.createHero(payload.hero);
    }
    else if (payload.contents) {
      for (let content of payload.contents) {
        render.createArticle(content);
      }
    } else if (payload.skills) {
      for (let skill of payload.skills) {
        render.createSkill(skill);
      }
    }
    else {
      console.log('Keine Skills, was anderes');
    }

  },

  loadData(file) {
    // 1. XMLHttpRequest-Objekt anlegen
    const xhr = new XMLHttpRequest();

    // 2. Definieren, was wie geladen werden soll
    xhr.open('get', `../data/${file}`);

    // 3. Eventlistener für das Laden
    xhr.addEventListener('load', ajax.handleLoaded)

    // 4. Ladeprozess starten
    xhr.send();
  }

}

export default ajax;