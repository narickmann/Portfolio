'use strict';

import ajax from "./ajax.js";
import dom from "./dom.js";

// KONSTANTEN / VARIABLEN

// FUNKTIONEN

const init = () => {
  ajax.loadData('hero.json');
  ajax.loadData('contents.json');
  ajax.loadData('skills.json');
  dom.mapping();
}

// INIT
init();