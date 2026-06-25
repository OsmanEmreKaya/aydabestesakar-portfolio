/* =================================================================
   Ayda Beste Şakar — İç Mimar Portfolyo
   Vanilla JS: nav, mobil menü, scroll reveal, parallax, form, TR/EN
================================================================= */
(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header scroll ---- */
  var header = document.getElementById("siteHeader");
  function onScrollHeader() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("primaryNav");
  function closeMenu() {
    nav.classList.remove("open");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });
    nav.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", closeMenu); });
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Parallax ---- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax] .project-img"));
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ticking = false;
  function updateParallax() {
    var vh = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      var shift = Math.max(-26, Math.min(26, progress * -36));
      el.style.transform = "translateY(" + shift.toFixed(1) + "px) scale(1.04)";
    });
    ticking = false;
  }
  if (!prefersReduced && parallaxEls.length) {
    updateParallax();
    window.addEventListener("scroll", function () { if (!ticking) { window.requestAnimationFrame(updateParallax); ticking = true; } }, { passive: true });
    window.addEventListener("resize", updateParallax);
  }

  /* ---- Contact form ---- */
  var form = document.getElementById("inquiryForm");
  var feedback = document.getElementById("formFeedback");
  if (form && feedback) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.querySelector("#name") || {}).value || "";
      var email = (form.querySelector("#email") || {}).value || "";
      var lang = document.documentElement.lang;
      if (!name.trim() || !email.trim()) {
        feedback.textContent = lang === "tr"
          ? "Lütfen adınızı ve e-postanızı ekleyin."
          : "Please add your name and email so I can reply.";
        feedback.style.color = "#d8946a";
        feedback.classList.add("show");
        return;
      }
      feedback.style.color = "";
      feedback.textContent = lang === "tr"
        ? "Teşekkürler, " + name.trim().split(" ")[0] + " — talebiniz iletildi. En kısa sürede dönüş yapacağım."
        : "Thank you, " + name.trim().split(" ")[0] + " — your inquiry has been prepared. I'll be in touch shortly.";
      feedback.classList.add("show");
      form.reset();
      setTimeout(function () { feedback.classList.remove("show"); }, 7000);
    });
  }

  /* =================================================================
     TR/EN LANGUAGE TOGGLE
     Turkish is the default — inline HTML is already in Turkish.
     English strings live here; switching to TR restores originals.
  ================================================================= */
  var EN = {
    "nav.home": "Home", "nav.projects": "Projects", "nav.studio": "Studio",
    "nav.experience": "Experience", "nav.journal": "Journal", "nav.about": "About", "nav.contact": "Contact",
    "hero.eyebrow": "Interior Architect &amp; Spatial Designer",
    "hero.statement": "Interior architecture shaped around atmosphere, material, and human experience — spaces built from contrast, memory, and the quiet logic of how people move.",
    "hero.cta1": "View Projects", "hero.cta2": "Start a Project",
    "hero.meta.uni": "Çankaya University", "hero.scroll": "Scroll <i></i>",
    "split.studio.title": "In Studio", "split.studio.text": "Concept, sketch, material and the slow build of an idea — the thinking before the space.", "split.studio.cta": "Enter the process →",
    "split.space.title": "In Space", "split.space.text": "Completed projects, interiors and renderings — where the concept becomes atmosphere.", "split.space.cta": "View the work →",
    "projects.eyebrow": "Selected Work", "projects.title": "Projects",
    "projects.lead": "A selection of academic and conceptual interior architecture projects — each driven by a clear spatial narrative, technical detail, and a sensitivity to light and material.",
    "proj1.cat": "Residential · Concept", "proj1.name": "Residence for a Public Figure",
    "proj1.desc": "Graduation project: a private residence designed for artist Canan Tolon, where privacy and visibility, silence and expression, stillness and movement become spatial decisions. A central intersection acts as a pause point; spaces grow more open and expressive as they move outward.",
    "proj2.cat": "Wellness · Hospitality · Group", "proj2.name": "Vitalis Health Improvement Center",
    "proj2.desc": "A holistic centre uniting health services with accommodation — reception, clinic, lodging, social and dining areas designed around the idea that physical, mental and spiritual wellbeing is strengthened by community.",
    "proj3.cat": "Hospitality · Concept", "proj3.name": "A Thematic Restaurant in Ankara",
    "proj3.desc": "A 250–300 cover restaurant where local and global cultural references build a singular atmosphere. Parametric tools weave visual elements, soundscape and gastronomy into a spatial narrative; local materials and craft strengthen the cultural bond.",
    "proj4.cat": "Cultural · Parametric", "proj4.name": "Médiathèque — Parametric Rhizomes",
    "proj4.desc": "Re-functioning a campus café into a multimedia library. A parametric 'adaptive shell' driven by user behaviour, circulation and environmental analysis shapes the space — balancing flexible work zones, digital media areas and community-focused interaction.",
    "link.boards": "Boards ↗", "link.sheets": "Sheets ↗", "link.view": "View project ↗", "link.present": "View presentation ↗",
    "archive.eyebrow": "Archive", "archive.title": "Signature Works",
    "arch1.name": "Demountable Stool — Set of Three", "arch1.type": "Product / Detail",
    "arch1.palette": "Dark &amp; light oak · black steel · fabric",
    "arch1.note": "A demountable stool studied through solid–void, mass and light–shadow; heavy timber set against a light, linear steel frame.",
    "arch2.name": "BIM Kitchen — ArchiCAD", "arch2.type": "Residential / BIM",
    "arch2.palette": "Functional · ergonomic · NKBA",
    "arch2.note": "A 3+1 apartment kitchen remodelled in ArchiCAD around ergonomics and NKBA planning guidelines — plan, sections and perspectives from a single 3D model.",
    "arch3.name": "Steel Mezzanine &amp; Drywall Systems", "arch3.type": "Structural / Interior · Group",
    "arch3.palette": "Steel · concrete · drywall",
    "arch3.note": "A steel-construction mezzanine with drywall infill; steel and reinforced-concrete stair alternatives detailed at 1/20 scale.",
    "exp.eyebrow": "Background", "exp.title": "Experience",
    "exp.lead": "Education, internships and certifications — from concept studios to active construction sites.",
    "exp1.title": "BA, Interior Architecture",
    "exp1.desc": "Interior space design, spatial organisation, material knowledge and visualisation — a foundation in both the technical and conceptual sides of the discipline.",
    "exp2.date": "Aug — Sep 2025", "exp2.title": "Intern · Site",
    "exp2.desc": "On-site observation of interior application: drywall, suspended ceilings, surface finishes, waterproofing, joinery, electrical and fixed-furniture installation.",
    "exp3.date": "Jun — Aug 2025", "exp3.title": "Intern · Office",
    "exp3.desc": "Interior and exterior design processes, concept development and spatial planning; material, colour and lighting selection; AutoCAD, Rhino and Twinmotion.",
    "exp4.date": "Jul — Aug 2024", "exp4.title": "Intern · Site",
    "exp4.desc": "Interior layout planning, material research, supplier coordination, drawing revisions and a ceiling-plan design for an entrance.",
    "exp5.date": "Certificate", "exp5.title": "KDSA — Drywall Systems Design &amp; Inspection",
    "exp5.org": "In cooperation with METU (ODTÜ) Continuing Education Center",
    "exp5.desc": "Internet-based certificate program in dry-wall systems design and inspection.",
    "phil.statement": "A space should be felt before it is understood.",
    "phil.1": "<strong>Light &amp; proportion.</strong> Daylight, scale and rhythm come first — they decide how a room is read long before any object enters it.",
    "phil.2": "<strong>Material sensitivity.</strong> Honest materials, kept in tension — heavy against light, dark against open — to give each space a clear character.",
    "phil.3": "<strong>Human flow.</strong> Design follows movement and need; calm, function and atmosphere are planned together, never traded against one another.",
    "phil.4": "<strong>Narrative.</strong> Every project begins from a story — memory, contrast, transformation — that holds the spatial decisions together.",
    "proc.eyebrow": "How I Work", "proc.title": "Studio Process",
    "proc1.title": "Discovery", "proc1.desc": "Understanding the user, the brief and the site — needs, constraints, lifestyle and the story the space should tell.",
    "proc2.title": "Concept", "proc2.desc": "Translating that story into spatial ideas — contrasts, circulation and atmosphere — explored through sketch and parametric form-finding.",
    "proc3.title": "Material &amp; Spatial Design", "proc3.desc": "Resolving layout, light, materials and detail — developed in AutoCAD, Rhino and ArchiCAD, with technical drawings and 3D models.",
    "proc4.title": "Final Styling", "proc4.desc": "Bringing it to life — lighting, finishes and visualisation in Twinmotion, presented as a coherent, atmospheric whole.",
    "skills.eyebrow": "Capabilities", "skills.title": "Skills &amp; Tools",
    "skills.software": "Software", "skills.design": "Design", "skills.language": "Language", "skills.prestools": "Presentation tools",
    "lvl.advanced": "Advanced", "lvl.intermediate": "Intermediate", "lvl.parametric": "Parametric", "lvl.modelling": "Modelling", "lvl.present": "Presentation",
    "skill.d1": "Design-oriented thinking", "skill.d2": "Technical drawing &amp; planning",
    "skill.d3": "3D modelling &amp; visualisation", "skill.d4": "Parametric design",
    "skill.d5": "Material knowledge &amp; detailing", "skill.d6": "Space planning",
    "skill.d7": "Presentation &amp; visual expression", "skill.d8": "Teamwork &amp; communication",
    "lang.tr": "Turkish — Native", "lang.en": "English — C1",
    "journal.eyebrow": "Journal", "journal.title": "Notes on Space",
    "jr1.cat": "Light · Essay", "jr1.title": "Why Light Defines a Room",
    "jr1.desc": "Before furniture or finish, daylight sets the mood of a space — and how it changes through the day.",
    "jr2.cat": "Material", "jr2.title": "Contrast as a Material Strategy",
    "jr2.desc": "Notes from the stool project: how heavy timber and light steel can hold a single object together.",
    "jr3.cat": "Process", "jr3.title": "Designing Silence in Residential Spaces",
    "jr3.desc": "On privacy, pause and the value of the quiet room — lessons from the Tolon residence.",
    "soon": "Coming soon",
    "about.eyebrow": "About",
    "about.lead": "Interior architect and 2026 graduate of Çankaya University in Ankara, working at the meeting point of the technical and the creative.",
    "about.p1": "My work focuses on functional, aesthetic and sustainable spaces. Through three internships across design offices and live construction sites, I worked on projects ranging from conceptual residences and a parametric médiathèque to a holistic health centre — always paying close attention to material, detail and the way people move through a space.",
    "about.p2": "Detail-oriented and continuously learning, I'm comfortable in teams and care about planned, considered work — designing spaces that feel calm, intentional and quietly personal.",
    "contact.eyebrow": "Let's talk", "contact.title": "Start a Project",
    "contact.lead": "Available for residential and commercial interior architecture, concept development and visualisation. Tell me about your space.",
    "contact.email": "Email", "contact.phone": "Phone", "contact.based": "Based in", "contact.location": "Ankara &amp; Mersin, Türkiye",
    "form.name": "Name", "form.name.ph": "Your name", "form.email": "Email",
    "form.type": "Project type", "form.location": "Location", "form.location.ph": "City",
    "form.budget": "Budget range", "form.message": "Message",
    "form.message.ph": "Tell me about your space, timeline and goals...",
    "form.submit": "Send Inquiry",
    "opt.residential": "Residential", "opt.commercial": "Commercial", "opt.hospitality": "Hospitality",
    "opt.concept": "Concept / Competition", "opt.other": "Other", "opt.tbd": "To be discussed",
    "footer.name": "Ayda Beste Şakar — Interior Architect",
    "footer.copy": "Built as a personal portfolio · Ankara, Türkiye"
  };

  var i18nEls = document.querySelectorAll("[data-i18n]");
  i18nEls.forEach(function (el) { el.dataset.i18nTr = el.innerHTML; });
  var i18nPhEls = document.querySelectorAll("[data-i18n-ph]");
  i18nPhEls.forEach(function (el) { el.dataset.i18nPhTr = el.getAttribute("placeholder") || ""; });

  function applyLang(lang) {
    var isEn = lang === "en";
    i18nEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      el.innerHTML = isEn && EN[key] != null ? EN[key] : el.dataset.i18nTr;
    });
    i18nPhEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      el.setAttribute("placeholder", isEn && EN[key] != null ? EN[key] : el.dataset.i18nPhTr);
    });
    document.documentElement.lang = lang;
    var btn = document.getElementById("langToggle");
    if (btn) btn.classList.toggle("is-tr", !isEn);
    try { localStorage.setItem("abs-lang", lang); } catch (e) {}
  }

  var langBtn = document.getElementById("langToggle");
  var savedLang = "tr";
  try { savedLang = localStorage.getItem("abs-lang") || "tr"; } catch (e) {}
  applyLang(savedLang);

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      applyLang(document.documentElement.lang === "tr" ? "en" : "tr");
    });
  }

})();
