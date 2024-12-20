'use strict';

import dom from "./dom.js";
import render from "./render.js";
import { elements } from "./settings.js";

const formular = {
  createFields(fields) {
    const elParent = elements.form;
    const nameContainer = dom.create(false, 'div', elParent, 'flex_container flex_100 gap1rem');

    for (let field of fields) {
      if (field.id == "vname" || field.id == "nname") {
        const fieldContainer = dom.create(false, 'div', nameContainer, 'input_label');
        const elInput = dom.createField(field.tag, field.type, field.id, field.name, fieldContainer, field.required);

        const elLabel = dom.create(field.label, 'label', fieldContainer);
        elLabel.htmlFor = field.id;

        dom.create('', 'small', fieldContainer, 'error_message hide_message');

        elInput.addEventListener('input', formular.checkValidation);

      } else {
        const fieldContainer = dom.create(false, 'div', elParent, 'input_label');
        const elInput = dom.createField(field.tag, field.type, field.id, field.name, fieldContainer, field.required);

        if (elInput.rows) elInput.rows = field.rows;
        if (elInput.type == "textarea" && !elInput.placeholder) elInput.placeholder = field.placeholder;

        const elLabel = dom.create(field.label, 'label', fieldContainer);
        elLabel.htmlFor = field.id;

        dom.create('', 'small', fieldContainer, 'error_message hide_message');
        elInput.addEventListener('input', formular.checkValidation);

      }
    }
  },

  createCheckbox(checkbox) {
    const elParent = elements.form;
    const elContainer = dom.create(false, 'div', elParent, 'flex_container flex_ai_base gap1rem ds_container');

    const elCheck = dom.createField(checkbox.tag, checkbox.type, checkbox.id, checkbox.name, elContainer, checkbox.required);
    elCheck.value = checkbox.value;
    elCheck.classList.add('ds_checker')

    const labelContent = checkbox.label.replace("[LINK]", `<a href="${checkbox.link.href}" class="${checkbox.link.class}">${checkbox.link.text}</a>`);
    const elLabel = dom.create(labelContent, 'label', elContainer, 'ds_label');
    elLabel.classList.add('ds_label');

    dom.create('', 'small', elContainer, 'error_message hide_message');
    elCheck.addEventListener('change', formular.checkValidation);
  },

  createSubmit(submit) {
    const elParent = elements.form;
    const elBtn = dom.create(submit.value, submit.tag, elParent, submit.class);
    elBtn.type = submit.type;

    elBtn.addEventListener('click', formular.checkOnSubmit);
  },

  checkValidation(event) {
    const input = event.target;
    const label = input.nextElementSibling;

    const errorMessage = label.nextElementSibling;
    let errorTxt = '';

    let isValid = false;

    if (input.id === "vname" || input.id === "nname") {
      const regex = /^([ \u00c0-\u01ffa-zA-Z\.' \-])+$/;
      isValid = regex.test(input.value.trim());
      if (!isValid) {
        errorTxt = 'Bitte nur Buchstaben, Akzentzeichen, Leerzeichen, Bindestriche und Apostrophe verwenden.';
      }
    }
    else if (input.type === "email") {
      const regex = /^[\w.+-]{2,}\@[\w.-]{2,}\.[a-z]{2,6}$/;
      isValid = regex.test(input.value.trim());
      if (!isValid) {
        errorTxt = 'Bitte eine gültige E-Mail-Adresse eingeben.';
      }
    }
    else if (input.id === "betreff" || input.id === "nachricht") {
      isValid = input.value.trim() !== '';
      if (input.value.trim() === '') {
        errorTxt = 'Betreff oder Nachricht darf nicht leer sein.';
      }
    }
    else if (input.id === "dschutz") {
      isValid = input.checked;
      if (!isValid) {
        errorTxt = 'Bitte bestätige den Datenschutz.';
      }
    }

    isValid = input.value.trim() === '' ? true : isValid;

    if (isValid) {
      label.classList.remove('warning');
      errorMessage.textContent = '';
      errorMessage.classList.add('hide_message');
    } else {
      label.classList.add('warning');
      errorMessage.textContent = errorTxt;
      errorMessage.classList.remove('hide_message');
    }
  },

  checkOnSubmit(event) {
    event.preventDefault();
    const elForm = elements.form;
    const elInputs = Array.from(elForm.querySelectorAll('input, textarea'));

    let isValid = true;

    elInputs.forEach(input => {
      const label = input.nextElementSibling;
      const errorMessage = label.nextElementSibling;

      if (!input.value.trim()) {
        errorMessage.textContent = 'Bitte fülle dieses Feld aus.';
        errorMessage.classList.remove('hide_message');
        isValid = false;
      }
      else if (input.id == "dschutz" && !input.checked) {
        errorMessage.textContent = 'Bitte bestätige den Datenschutz.';
        errorMessage.classList.remove('hide_message');
        isValid = false;
      }
      else {
        errorMessage.textContent = '';
        errorMessage.classList.add('hide_message');
      }

    })

    if (isValid) {
      formular.handleSubmit(event, isValid);
    }
  },

  handleSubmit(event, isValid) {
    event.preventDefault();

    if (!isValid) {
      console.warn("Formular ist ungültig. Abbruch.");
      return;
    }

    const form = elements.form;
    if (!form) {
      console.error("Formular-Element wurde nicht gefunden.");
      return;
    }

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./mailer.php");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.info("Formular erfolgreich versendet:", xhr.responseText);
          formular.showModal(true)
        } else if (xhr.status === 404) {
          console.error("Fehler: Datei nicht gefunden (404).");
          formular.showModal(false)
        } else {
          console.warn("Fehler beim Senden des Formulars:", xhr.responseText);
          formular.showModal(false)
        }
      }
    };

    xhr.send(formData);
  },

  showModal(success) {
    const body = dom.$('body');
    body.classList.add('no_scroll');

    if (success) {
      const successModal = render.createSuccessModal();
      if (successModal) {
        successModal.classList.add('show_modal');
      }
    } else {
      const errorModal = render.createErrorModal();
      if (errorModal) {
        errorModal.classList.add('show_modal')
      }
    }
  }

}

export default formular;