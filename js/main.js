/**
 * AutoMate AI — Main Script
 * Minimal JS for performance. Handles mobile nav and smooth scrolling.
 */

document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile Menu Toggle ---
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Newsletter Form Placeholder Handler ---
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]').value.trim();
      if (email) {
        // In production, this would POST to your email service
        // For now, show a success message
        var btn = form.querySelector('button');
        var originalText = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#10b981';
        form.querySelector('input[type="email"]').disabled = true;
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          form.querySelector('input[type="email"]').disabled = false;
          form.querySelector('input[type="email"]').value = '';
        }, 3000);
        console.log('Newsletter signup:', email);
      }
    });
  });

  // --- Search Box Placeholder ---
  var searchBoxes = document.querySelectorAll('.search-box');
  searchBoxes.forEach(function (box) {
    var input = box.querySelector('input');
    var btn = box.querySelector('button');
    if (btn && input) {
      btn.addEventListener('click', function () {
        var q = input.value.trim();
        if (q) {
          window.location.href = '/blog/?q=' + encodeURIComponent(q);
        }
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          btn.click();
        }
      });
    }
  });
});

// --- Register Service Worker for offline support (future) ---
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js');
// }
