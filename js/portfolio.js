(function () {
  "use strict";

  var menuButton = document.querySelector(".menu-toggle");
  var navigation = document.querySelector(".site-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var open = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    var updateBackToTop = function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      backToTop.classList.toggle("is-visible", scrollTop > 400);
    };
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });
  }

  var sectionLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  var observedSections = document.querySelectorAll("main section[id]");
  if (sectionLinks.length && observedSections.length && "IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-35% 0px -55%", threshold: 0 });
    observedSections.forEach(function (section) { sectionObserver.observe(section); });
  }

}());
