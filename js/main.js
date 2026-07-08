/**
 * AutoMate AI — Premium UI interactions
 * Lightweight, no dependencies. Covers:
 *  - Mobile nav toggle
 *  - Scroll reveal animations (IntersectionObserver)
 *  - Smooth anchor scroll
 *  - Newsletter handler
 *  - Search handler
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ---------- Mobile Nav ----------
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', open);
      toggleBtn.innerHTML = open
        ? '<svg class="icon" viewBox="0 0 24 24"><use href="/images/icons.svg#icon-close"/></svg>'
        : '<svg class="icon" viewBox="0 0 24 24"><use href="/images/icons.svg#icon-menu"/></svg>';
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><use href="/images/icons.svg#icon-menu"/></svg>';
      });
    });
  }

  // ---------- Scroll Reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // ---------- Smooth Anchor Scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Newsletter ----------
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn = form.querySelector('button');
      var email = input.value.trim();
      if (!email) return;
      btn.disabled = true;
      btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><use href="/images/icons.svg#icon-check"/></svg> Subscribed!';
      btn.style.background = 'linear-gradient(135deg, #8BA86A, #C9A84C)';
      input.disabled = true;
      console.log('[AutoMate] Newsletter:', email);
      setTimeout(function () {
        btn.disabled = false;
        btn.innerHTML = 'Subscribe';
        btn.style.background = '';
        input.disabled = false;
        input.value = '';
      }, 3000);
    });
  });

  // ---------- Search ----------
  document.querySelectorAll('.search-box').forEach(function (box) {
    var input = box.querySelector('input');
    var btn = box.querySelector('button');
    if (btn && input) {
      btn.addEventListener('click', function () {
        var q = input.value.trim();
        if (q) window.location.href = '/blog/?q=' + encodeURIComponent(q);
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') btn.click();
      });
    }
  });
});
