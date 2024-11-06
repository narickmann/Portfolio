'use strict';

import {elements} from './settings.js';

const dom = {
  create(
    content = false,
    type = 'div',
    parent = false,
    className = false
  ) {
    const el = document.createElement(type);
    if (content) el.innerHTML = content;
    if (className) el.className = className;
    if (parent) parent.append(el);
    
    return el;
  },
  createImg(
    parent = false,
    source = false,
    alt = false,
    className = false
  ) {
    const el = document.createElement('img');
    if (className) el.className = className;
    if (source) el.src = source;
    if (alt) el.alt = alt;
    if (parent) parent.append(el);
    
    return el;
  },
  createSource(
    parent = false,
    media = false,
    srcset = false,
  ) {
    const el = document.createElement('source');
    if (media) el.media = media;
    if (srcset) el.srcset = srcset;
    if (parent) parent.append(el);
    
    return el;
  },
  createField(
    tag = false,
    type = false,
    id = false,
    name = false,
    parent = false,
    required = false
  ) {
    const el = document.createElement(tag);
    if (type) el.type = type;
    if (id) el.id = id;
    if (name) el.name = name;
    if (required) el.required = required;
    if (parent) parent.append(el);
    
    return el;
  },
  $(selector) {
    return document.querySelector(selector);
  },
  $$(selector) {
    return [...document.querySelectorAll(selector)];
  },
  mapping() {
    elements.parentContents = dom.$('main');
    elements.hero = dom.$('#page1');
    elements.article = dom.$$('article[id*="page"]');
    elements.header = dom.$('#topheader');
    elements.nav = dom.$$('#topnav a');
    elements.form = dom.$('form');
    
    elements.animatedBtns = [dom.$('a[href="#page4"')];
  }
}

export default dom;