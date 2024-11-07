'use strict';

import dom from "./dom.js";
import { elements } from "./settings.js";

const impressumAndDs = {
  createImpressum(impressum) {
    const elParent = elements.impressum;
    const overlay = dom.$('#impressum_overlay');
    overlay.addEventListener('click', impressumAndDs.handleClose)

    const closeBtn = dom.create('&times;', 'span', elParent, 'close');
    closeBtn.id = "close_impressum";
    closeBtn.addEventListener('click', impressumAndDs.handleClose);

    for (let section of impressum.sections) {
      dom.create(section.title, 'h2', elParent);
      dom.create(section.content, 'div', elParent);
    }
    const openBtn = dom.$('#open_impressum');
    openBtn.addEventListener('click', impressumAndDs.handleOpenOverlay);
  },

  createDatenschutz(datenschutz) {
    const elParent = elements.datenschutz;
    const overlay = dom.$('#datenschutz_overlay');
    overlay.addEventListener('click', impressumAndDs.handleClose)

    const closeBtn = dom.create('&times;', 'span', elParent, 'close');
    closeBtn.id = "close_datenschutz";
    closeBtn.addEventListener('click', impressumAndDs.handleClose);

    dom.create('Datenschutz', 'h2', elParent);

    for (let section of datenschutz.sections) {
      dom.create(section.title, 'h3', elParent);
      dom.create(section.content, 'div', elParent);
    }

    dom.create('Verwendete Logos', 'h3', elParent);
    for (let quelle of datenschutz.quellen) {
      dom.create(quelle.description, 'h4', elParent);
      dom.create(quelle.source, 'p', elParent);
    }

    const openBtns = [...dom.$$('.open_datenschutz')]
    for (let btn of openBtns) {
      btn.addEventListener('click', impressumAndDs.handleOpenOverlay);
    }
  },

  handleOpenOverlay(event) {
    event.preventDefault();
    const element = event.target;

    const body = dom.$('body');
    body.classList.add('no_scroll');

    if (element.id == 'open_impressum') {
      const overlay = dom.$('#impressum_overlay');
      overlay.classList.remove('hide_overlay');
      overlay.classList.add('show_overlay');
    }
    else if (element.classList.contains('open_datenschutz')) {
      const overlay = dom.$('#datenschutz_overlay');
      overlay.classList.remove('hide_overlay');
      overlay.classList.add('show_overlay');
    }
  },

  handleClose(event) {
    event.preventDefault();
    const element = event.target;

    const body = dom.$('body');
    body.classList.remove('no_scroll');

    if (element.id == 'close_impressum' || element.id == 'impressum_overlay') {
      const overlay = dom.$('#impressum_overlay');
      overlay.classList.remove('show_overlay');
      overlay.classList.add('hide_overlay');
    }
    else if (element.id == 'close_datenschutz' || element.id == 'datenschutz_overlay') {
      const overlay = dom.$('#datenschutz_overlay');
      overlay.classList.remove('show_overlay')
      overlay.classList.add('hide_overlay')
    }
  }
}

export default impressumAndDs;