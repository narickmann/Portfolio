'use strict';

import dom from "./dom.js";
import { elements } from "./settings.js";

const handleHeaderShrink = () => {
  const header = elements.header;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    scrollTop > 100 ? header.classList.add('shrink') : header.classList.remove('shrink');
  });
}

 const handleActiveLink = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const pageId = entry.target.getAttribute('id');
      const navLink = document.querySelector(`#topnav a[href="#${pageId}"]`);

      if (entry.isIntersecting) {
        dom.$('#topnav a.active')?.classList.remove('active');
        navLink.classList.add('active');
      }
    });
  }, options);

  dom.$$('main [id*="page"]').forEach(page => {
    navObserver.observe(page);
  });
}

 const handleNavClick = () => {
  const navLinks = elements.nav;
  const header = elements.header;

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const targetId = link.getAttribute('href');
      const targetElement = dom.$(targetId);

      if (targetElement) {

        let headerHeight = header.offsetHeight;

        if (!header.classList.contains('shrink')) {
          headerHeight /= 2;
        }

        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

export function handleHeader() {
  handleHeaderShrink();
  handleActiveLink();
  handleNavClick();
}