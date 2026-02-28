const researchI18n = {
  ja: {
    navResearch: "研究業績",
    journal: "査読付き学術雑誌論文",
    conference: "査読付き会議論文",
    preprints: "査読前論文",
    nonref: "査読なし論文",
    oralIntl: "国際会議等での口頭発表",
    oralDomestic: "国内会議等での口頭発表",
    posterDomestic: "国内会議等でのポスター発表",
    other: "その他講演"
  },
  en: {
    navResearch: "Research",
    journal: "Refereed Journal Papers",
    conference: "Refereed Conference Paper",
    preprints: "Preprints",
    nonref: "Non-Refereed Papers",
    oralIntl: "Oral Presentations in International Conferences and Workshops",
    oralDomestic: "Oral Presentations in Domestic Conferences and Workshops",
    posterDomestic: "Poster Presentations in Domestic Conferences and Workshops",
    other: "Other Presentation"
  },
  zh: {
    navResearch: "科研成果",
    journal: "同行评审期刊论文",
    conference: "同行评审会议论文",
    preprints: "预印本",
    nonref: "非同行评审论文",
    oralIntl: "国际会议与研讨会口头报告",
    oralDomestic: "国内会议与研讨会口头报告",
    posterDomestic: "国内会议与研讨会海报发表",
    other: "其他报告"
  }
};

function setCreditYear() {
  const creditYear = document.getElementById("credit-year");
  if (!creditYear) return;

  const yearText = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric"
  }).format(new Date());

  creditYear.textContent = yearText || String(new Date().getFullYear());
}

function rememberLanguageFromPage() {
  const pageLang = document.body.dataset.lang;
  if (pageLang) {
    localStorage.setItem("siteLang", pageLang);
  }

  document.querySelectorAll("[data-set-lang]").forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem("siteLang", link.dataset.setLang);
    });
  });
}

function setResearchLanguage(lang) {
  const dict = researchI18n[lang] || researchI18n.ja;
  document.documentElement.lang = lang;

  const navLabel = document.getElementById("research-nav-label");
  if (navLabel) navLabel.textContent = dict.navResearch;

  document.querySelectorAll("[data-r-i18n]").forEach((el) => {
    const key = el.dataset.rI18n;
    if (dict[key]) el.textContent = dict[key];
  });

  const homeLink = document.getElementById("home-link");
  if (homeLink) {
    homeLink.href = lang === "en" ? "/en/" : lang === "zh" ? "/zh/" : "/";
    homeLink.textContent = lang === "en" ? "Home" : lang === "zh" ? "首页" : "ホーム";
  }

  document.querySelectorAll(".lang-btn[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  localStorage.setItem("siteLang", lang);
}

function setupResearchPage() {
  const initialLang = localStorage.getItem("siteLang") || "ja";
  setResearchLanguage(initialLang);

  document.querySelectorAll(".lang-btn[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setResearchLanguage(btn.dataset.lang));
  });
}

setCreditYear();
rememberLanguageFromPage();

if (document.body.dataset.page === "research") {
  setupResearchPage();
}


function setupMobileMenu() {
  const headerInner = document.querySelector(".header-inner");
  const menuToggle = document.querySelector(".menu-toggle");
  if (!headerInner || !menuToggle) return;

  const updateMobileMenuLayout = () => {
    const nav = headerInner.querySelector(".top-nav");
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty("--mobile-nav-height", `${navHeight}px`);
  };

  const closeMenu = () => {
    headerInner.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = headerInner.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) updateMobileMenuLayout();
  });

  document.addEventListener("click", (event) => {
    if (!headerInner.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
      return;
    }

    if (headerInner.classList.contains("menu-open")) {
      updateMobileMenuLayout();
    }
  });
}

setupMobileMenu();
