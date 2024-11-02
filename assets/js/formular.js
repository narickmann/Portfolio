'use strict';

import dom from "./dom.js";
import { elements } from "./settings.js";

const formular = {
  createFields(fields) {
    const elParent = elements.form;
    const nameContainer = dom.create(false, 'div', elParent, 'flex_container flex_100 gap1rem');

    for (let field of fields) {
      if (field.id == "vname" || field.id == "nname") {
        const fieldContainer = dom.create(false, 'div', nameContainer, 'input_label');
        
        dom.createField(field.tag, field.type, field.id, field.name, fieldContainer, field.required);
        
        let elLabel = dom.create(field.label, 'label', fieldContainer);
        elLabel.htmlFor = field.id;
      } else {
        const fieldContainer = dom.create(false, 'div', elParent, 'input_label');
        const elInput = dom.createField(field.tag, field.type, field.id, field.name, fieldContainer, field.required);
        
        if (elInput.rows) elInput.rows = field.rows;
        if (elInput.type == "textarea" && !elInput.placeholder) elInput.placeholder = field.placeholder;
        
        let elLabel = dom.create(field.label, 'label', fieldContainer);
        elLabel.htmlFor = field.id;
      }
    }
  },

  createCheckbox(checkbox) {
    const elParent = elements.form;
    const elContainer = dom.create(false, 'div', elParent, 'flex_container flex_ai_base gap1rem');
    
    const elCheck = dom.createField(checkbox.tag, checkbox.type, checkbox.id, checkbox.name, elContainer, checkbox.required);
    elCheck.value = checkbox.value;
    elCheck.classList.add('ds_checker')
    
    const labelContent = checkbox.label.replace("[LINK]", `<a href="${checkbox.link.href}">${checkbox.link.text}</a>`);
    const elLabel = dom.create(labelContent, 'label', elContainer, 'ds_label');
    elLabel.classList.add('ds_label')
  },

  createSubmit(submit) {
    const elParent = elements.form;
    dom.create(submit.value, submit.type, elParent, submit.class);
  }

}

export default formular;