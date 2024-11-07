'use strict';

import ajax from "./ajax.js";
import { btnAnimation } from "./btnAnimation.js";
import dom from "./dom.js";
import { handleHeader } from "./header.js";

// KONSTANTEN / VARIABLEN

// FUNKTIONEN

const init = () => {
  ajax.loadData('hero.json');
  ajax.loadData('contents.json');
  ajax.loadData('skills.json');
  ajax.loadData('slider_content.json');
  ajax.loadData('formular.json');
  dom.mapping();
  btnAnimation();
  handleHeader();
}

// INIT
init();