'use strict';

import dom from "./dom.js";
import formular from "./formular.js";
import { elements } from "./settings.js";
import { typewriteEffect } from "./typewrite-effect.js";

const render = {
  createHero(hero) {
    const elFigure = dom.create(false, 'figure', dom.$(hero.container), 'hero_image');
    const elPicture = dom.create(false, 'picture', elFigure);

    for (let source of hero.source) {
      const srcset = `./assets/img/${source.srcset}`;
      dom.createSource(elPicture, source.media, srcset);
    }
    const src = `./assets/img/${hero.img.src}`;
    dom.createImg(elPicture, src, hero.img.alt, 'cover');

    const elCaption = dom.create(false, 'figcaption', elFigure, 'hero_text flex_container flex_column flex_jc_even flex_ai_center');

    dom.create(hero.content[0].paragraph, 'p', elCaption);
    const heading = dom.create(hero.header, 'h1', elCaption, 'typewriter');
    document.addEventListener('DOMContentLoaded', typewriteEffect(heading))
    
    dom.create(hero.content[1].paragraph, 'p', elCaption, 'h2');

    const btn = hero.button;
    const elBtn = dom.create(btn.content, 'a', elCaption, 'button');
    elBtn.href = btn.href
    const elIcon = dom.create(false, 'i', false, btn.icon);
    elBtn.prepend(elIcon);

    elements.animatedBtns.push(elBtn);
  },

  createArticle(content) {
    const elHeader = dom.create(content.header, 'h2', dom.$(content.container));
    for (let item of content.content) {
      dom.create(item.paragraph, 'p', dom.$(content.container))
    }
    if (content.info) render.createContactInfo(content.info, elHeader.parentElement);
  },

  createContactInfo(info, parent) {
    const elContainer = dom.create(false, 'div', parent, 'kontakt');

    const elContactInfo = dom.create(false, 'div', elContainer, 'kontakt_info');

    const imgContainer = dom.create(false, 'div', elContactInfo, 'small_foto');
    const src = `./assets/img/${info.img.src}`;
    dom.createImg(imgContainer, src, info.img.alt);

    const contactContainer = dom.create(false, 'div', elContactInfo);
    for (let contact of info.contact) {
      const elParagraph = dom.create(contact.text, 'p', contactContainer);

      const elIcon = dom.create(false, 'i', false, contact.icon);
      elParagraph.prepend(elIcon);
    }

    const btn = info.button;
    const elBtn = dom.create(btn.content, 'a', elContainer, 'button');
    elBtn.href = btn.href
    elBtn.download = btn.download

    const elIcon = dom.create(false, 'i', false, btn.icon);
    elBtn.prepend(elIcon);
  },

  createSkill(skill) {
    // Quellen für Logos
    // By W3C - http://www.w3.org/html/logo/index.html, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=12868160
    // By daPhyre (File:CSS3 and HTML5 logos and wordmarks.svg)Elfi (File:CSS3 logo and wordmark.svg)ExE Boss - File:CSS3 and HTML5 logos and wordmarks.svgFile:CSS3 logo and wordmark.svg, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=107268458
    // By JavaScript Corp. - The javascript foundation, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=103235118
    // By jQuery Team - Own work based on: JQuery-Logo.svg, Public Domain, https://commons.wikimedia.org/w/index.php?curid=154093185

    const elParent = dom.$('.skill_container');
    const elFigure = dom.create(false, 'figure', elParent, `rahmen ${skill.class}`);
    const src = `./assets/img/skill_img/${skill.img.src}`;
    dom.createImg(elFigure, src, skill.img.alt, 'skill_icon');

    const elCaption = dom.create(false, 'figcaption', elFigure);

    dom.create(skill.name, 'h3', elCaption);
    for (let key of skill.keywords) {
      dom.create(`${key.keyword} `, 'small', elCaption);
    }
    dom.create(skill.desc, 'p', elCaption)
  },

  createProjectCard(slider) {
    const elParent = dom.$('.card_container');
    const cardContainer = dom.create(false, 'div', elParent, 'card');

    const imgContainer = dom.create(false, 'div', cardContainer, 'card_img');
    const src = `./assets/img/${slider.img.src}`;
    dom.createImg(imgContainer, src, slider.img.alt, 'cover');

    const contentContainer = dom.create(false, 'div', cardContainer, 'card_content');
    dom.create(slider.name, 'h3', contentContainer);
    dom.create(slider.desc, 'p', contentContainer);

    const linkList = dom.create(false, 'ul', contentContainer);
    for (let link in slider.links) {
      const linkData = slider.links[link];
      const listItem = dom.create(false, 'li', linkList);
      const elLink = dom.create(linkData.text, 'a', listItem);
      elLink.href = linkData.href;
      elLink.target = '_blank';

      const elIcon = document.createElement('i');
      if (link === 'github') {
        elIcon.className = 'fa-brands fa-github';
      } else if (link === 'demo') {
        elIcon.className = 'fa-solid fa-arrow-up-right-from-square';
      }
      elLink.prepend(elIcon);
    }
    return cardContainer;
  },

  createFormular(form) {
    if (form.fields) {
      formular.createFields(form.fields);
    }
    if (form.checkbox) {
      formular.createCheckbox(form.checkbox);
    }
    if (form.submit) {
      formular.createSubmit(form.submit);
    }
  },

  createSuccessModal() {
    const h2Txt = "Erfolgreich gesendet!";
    const text = "Vielen Dank für Deine Nachricht. Ich werde mich bald bei Dir melden.";

    const elParent = dom.$('#page4')
    const elContainer = dom.create(false, 'div', elParent, 'modal');
    elContainer.id = 'success_modal';

    elContainer.addEventListener('click', () => {
      render.handleClose(elContainer)
    });

    const contentContainer = dom.create(false, 'div', elContainer, 'modal_content');

    const headerContainer = dom.create(false, 'div', contentContainer, 'flex_container flex_jc_between flex_ai_center');
    dom.create(h2Txt, 'h2', headerContainer);

    const elClose = dom.create('&times;', 'span', headerContainer, 'close_modal');
    elClose.id = 'close_success';
    elClose.addEventListener('click', () => {
      render.handleClose(elContainer)
    });

    dom.create(text, 'p', contentContainer);
    return elContainer;
  },

  createErrorModal() {
    const h2Txt = "Fehler beim Senden!";
    const text = "Es gab ein Problem beim Senden der Nachricht. Bitte versuche es (später) erneut.";

    const elParent = dom.$('#page4')
    const elContainer = dom.create(false, 'div', elParent, 'modal');
    elContainer.id = 'error_modal';

    elContainer.addEventListener('click', () => {
      render.handleClose(elContainer)
    });

    const contentContainer = dom.create(false, 'div', elContainer, 'modal_content');

    const headerContainer = dom.create(false, 'div', contentContainer, 'flex_container flex_jc_between flex_ai_center');
    dom.create(h2Txt, 'h2', headerContainer);

    const elClose = dom.create('&times;', 'span', headerContainer, 'close_modal');
    elClose.id = 'close_error';
    elClose.addEventListener('click', () => {
      render.handleClose(elContainer)
    });

    dom.create(text, 'p', contentContainer);
    return elContainer;
  },

  handleClose(container) {
    const body = dom.$('body');
    body.classList.remove('no_scroll');
    container.classList.remove('show_modal');
    container.remove();
  }

}

export default render;