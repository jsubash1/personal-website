/* ============================================================
   app.js - behavior for the terminal-flavored portfolio.
   Everything editable lives in CONFIG below; the rest is generic
   presentation-driver code written from scratch.
   ============================================================ */
"use strict";

/* ------------------------------------------------------------
   CONFIG — the whole site's content. Replace freely.
   ------------------------------------------------------------ */
const CONFIG = {
  name: "Subash Jonnalagadda",
  role: "High School Engineer & Software Developer",

  boot: {
    user: "subash",
    host: "stepinac",
    cwd: "/home/subash/Documents",
    commands: [
      { type: "command", cmd: "pwd", output: ["/home/subash/Documents"] },
      { type: "command", cmd: "cd portfolio", output: [] },
      { type: "command", cmd: "ls", output: ["src/  public/  index.html", "package.json  vite.config.ts", "README.md  portfolio"] },
      { type: "typo", cmd: "cleak" },
      { type: "output", lines: ["Server starting...", "Server listening on http://localhost:5173"] },
    ],
  },

  /* Rotating hero job titles (typed / deleted forever) */
  roles: [
    "SOFTWARE ENGINEER",
    "WEB DEVELOPER",
    "FULL STACK DEVELOPER",
    "ROBOTICS LEAD",
    "PYTHON DEVELOPER",
    "JAVA DEVELOPER",
    "AI ENTHUSIAST",
  ],

  about: {
    paragraphs: [
      "High school engineering and software student with experience in programming, robotics, technology projects and team leadership. I'm very passionate about using software engineering and robotics to solve real problems.",
      "Skilled in developing applications, websites, solving technical challenges, and managing teams. I learn by doing — break it, understand it, rebuild it.",
      "I founded Iron Crusaders, our school's FIRST Robotics Competition team, and raised $30k to fund it in year one. I also lead software at Maa Durga Temple of Westchester.",
      null,
    ],
    archNote: false,
  },

  workIntro:
    "Real experience shipping software, leading teams, and building things that people actually use — from temple websites to robotics teams to AI models.",

  experiences: [
    {
      title: "Maa Durga Temple",
      text: "Director of Software. Created and manage the online presence of Maa Durga Temple of Westchester, including the temple website and social media expansion.",
      note: "Westchester, NY | July 2024 - Present",
      short: false,
    },
    {
      title: "AIMS Software",
      text: "Software Lead. Built an online inventory system for pharmacies — faster medication data lookup, with a new version that scans inventory using just a picture.",
      note: "September 2024 - Present",
      short: false,
    },
    {
      title: "Westchester County Parks",
      text: "Lifeguard at Tibbets Park. Supervised pool safety for up to 450 patrons per shift, administered first aid/CPR when needed, and conducted routine water safety checks.",
      note: "Tibbets Park | Summer 2025",
      short: false,
    },
    {
      title: "Harvard AI Bootcamp",
      text: "Built an AI model to predict the S&P 500 and a stock market predictor that gained $1,236.41 on a $500 investment. Won best student award.",
      note: "Harvard CS | August 2026",
      short: false,
    },
    {
      title: "Blackwell Research Institute",
      text: "Research Internship. Writing a research paper and working on multi-discipline engineering projects from mechanical to electrical.",
      note: "January 2026 - Present",
      short: false,
    },
    {
      title: "Iron Crusaders Robotics",
      text: "Founder & Co-Captain. Founded the school's FIRST Robotics Competition team, grew it from 3 to 30 members, and raised $30k for the first year.",
      note: "Stepinac High School | 2024 - Present",
      short: true,
    },
  ],

  skillsIntro:
    "The stack changes with the problem, but the habit stays: learn by building, break things until they work, and ship code that matters.",

  skillsCol1: [
    { name: "Python", tag: "PY" },
    { name: "Java", tag: "JA" },
    { name: "C++", tag: "CP" },
    { name: "HTML", tag: "HT" },
    { name: "Go", tag: "GO" },
  ],
  skillsCol2: [
    { name: "Microsoft Office", tag: "MS" },
    { name: "Google Suite", tag: "GS" },
    { name: "Time Management", tag: "TM" },
    { name: "Communication", tag: "CO" },
    { name: "Teamwork", tag: "TW" },
  ],

  /* Real projects from the resume */
  projects: [
    {
      name: "Temple Website",
      redirect: "#projects",
      description: "Website for Maa Durga Temple of Westchester — online presence and social media management.",
      accent: "linear-gradient(135deg, #f2ff5b 0%, #7d8b00 100%)",
      glyph: "TW",
    },
    {
      name: "Stock Market Predictor",
      redirect: "#projects",
      description: "AI model built at Harvard AI Bootcamp that gained $1,236.41 on a $500 investment.",
      accent: "linear-gradient(160deg, #89ff69 0%, #125c1c 100%)",
      glyph: "SP",
    },
    {
      name: "AIMS Inventory",
      redirect: "#projects",
      description: "Pharmacy inventory software — faster medication data lookup, now scanning inventory via photo.",
      accent: "linear-gradient(120deg, #2a2a2a 0%, #0c0c0c 60%)",
      glyph: "AI",
    },
    {
      name: "Iron Crusaders Robotics",
      redirect: "#projects",
      description: "FIRST Robotics Competition team — grew from 3 to 30 members, raised $30k in year one.",
      accent: "linear-gradient(200deg, #f2ff5b 0%, #89ff69 100%)",
      glyph: "IC",
    },
  ],

  contact: {
    eyebrow: "Have a project in mind?",
    talkText: "say hi!",
    blurb: "High school engineer & developer. Open to collaborations on robotics, AI, and web projects.",
    email: "SJonnalagadda555@stepinac.org",
    github: "https://github.com/",
    githubLabel: "GitHub",
    linkedin: "https://www.linkedin.com/",
    linkedinLabel: "LinkedIn",
  },

  footerLeft: "~ exit",
  footerRight: "", // filled automatically: © {year} {name} — {role}
};

const NAV_PAGES = [
  { id: "about", label: "About", href: "#about" },
  { id: "work", label: "Work", href: "#work" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------
   Tiny helpers
   ------------------------------------------------------------ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ------------------------------------------------------------
   Populate static portions of the DOM from CONFIG
   ------------------------------------------------------------ */
function hydrate() {
  document.title = `${CONFIG.name} - ${CONFIG.role}`;
  $("#hero-name").textContent = CONFIG.name;

  const rolePrompt = `${CONFIG.boot.user}@${CONFIG.host}:~$`;
  const promptEl = $("#role-prompt");
  promptEl.textContent = rolePrompt;
  promptEl.dataset.scrambleText = rolePrompt;

  // About
  const cols = $$(".about-col");
  const paras = CONFIG.about.paragraphs.filter(Boolean);
  if (cols[0]) cols[0].innerHTML = paras.slice(0, 2).map((p) => `<p>${p}</p>`).join("");
  if (cols[1]) cols[1].innerHTML = paras.slice(2).map((p) => `<p>${p}</p>`).join("");
  $(".arch-note").hidden = !CONFIG.about.archNote;

  $("#work-intro").textContent = CONFIG.workIntro;
  $("#skills-intro").textContent = CONFIG.skillsIntro;

  buildSkills($("#skills-col-1"), CONFIG.skillsCol1);
  buildSkills($("#skills-col-2"), CONFIG.skillsCol2);
  buildTimeline($("#tl-track"), CONFIG.experiences);
  buildCarousel($("#car-track"), CONFIG.projects);
  buildWaveBars();
  buildNav();
  buildContact();

  CONFIG.footerRight = `© ${new Date().getFullYear()} ${CONFIG.name} — ${CONFIG.role}`;
  $("#footer-left").textContent = CONFIG.footerLeft;
  $("#footer-right").textContent = CONFIG.footerRight;
}

function buildSkills(root, items) {
  root.innerHTML = items
    .map(
      (s) => `
    <li class="skill">
      <span class="tag">${s.tag}</span>
      <span>${s.name}</span>
    </li>`
    )
    .join("");
}

function buildTimeline(root, items) {
  root.innerHTML = items
    .map(
      (e) => `
    <article class="tl-item ${e.short ? "short" : ""}">
      <div class="tl-dot" aria-label="${e.title}"></div>
      <h3 class="tl-title">${e.title}</h3>
      <footer class="tl-note">${e.note}</footer>
      <p class="tl-text">${e.text}</p>
    </article>`
    )
    .join("");
}

function buildCarousel(root, items) {
  root.innerHTML = items
    .map(
      (p) => `
    <div class="car-slide">
      <div class="project-card" tabindex="0" role="link" aria-label="${p.name}">
        <div class="project-cover" style="background:${p.accent}">
          <span class="cover-glyph">${p.glyph}</span>
        </div>
        <h3 class="project-name">${p.name}</h3>
        <p class="project-desc">${p.description}</p>
      </div>
    </div>`
    )
    .join("");
}

function buildWaveBars() {
  $$(".wave-row").forEach((row) => {
    const n = parseInt(row.dataset.bars || "6", 10);
    row.innerHTML = Array.from({ length: n })
      .map((_, i) => `<span class="bar" style="--i:${i}"></span>`)
      .join("");
  });
}

function buildNav() {
  const navList = $("#nav-list");
  const menuList = $("#menu-list");
  NAV_PAGES.forEach((p, i) => {
    navList.insertAdjacentHTML(
      "beforeend",
      `<li data-id="${p.id}" style="--order:${i + 1}"><a href="${p.href}"><span class="idx">${i}.</span><span>${p.label}</span></a></li>`
    );
    menuList.insertAdjacentHTML(
      "beforeend",
      `<li data-id="${p.id}" style="--order:${i + 1}"><a href="${p.href}"><span class="idx">${i}.</span><span>${p.label}</span></a></li>`
    );
  });

  $("#page-indicator").innerHTML = NAV_PAGES.map(
    (p) => `<a href="${p.href}" data-id="${p.id}" aria-label="${p.label}"></a>`
  ).join("");
}

function buildContact() {
  const c = CONFIG.contact;
  $("#contact-sub").textContent = c.blurb;
  $("#talk-text").textContent = c.talkText;
  $("#social-row").innerHTML = `
    <a href="${c.github}" target="_blank" rel="noopener">
      <svg class="social-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 18c-3.5 1-3.5-2-5-2.5m11 4.5v-3.5c0-1 .1-1.4-.5-2 2.6-.3 5.5-1.3 5.5-5.9A4.6 4.6 0 0 0 17.6 5c-.2-.6-.8-1.9.1-4a11.6 11.6 0 0 0-3.8 1.9 12.3 12.3 0 0 0-6 0A11.6 11.6 0 0 0 4 1c.9 2 .3 3.4.1 4a4.6 4.6 0 0 0-1.4 3.6C2.7 13.2 5.6 14.2 8.2 14.5c-.6.6-.7 1.2-.6 2.9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span>${c.githubLabel}</span>
    </a>
    <a href="mailto:${c.email}">
      <svg class="social-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3z M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span>${c.email}</span>
    </a>
    <a href="${c.linkedin}" target="_blank" rel="noopener">
      <svg class="social-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4z M8 10v7M8 7.5v.1M12 17v-4a2 2 0 0 1 4 0v4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span>${c.linkedinLabel}</span>
    </a>`;
}

/* ------------------------------------------------------------
   Boot terminal animation
   ------------------------------------------------------------ */
const bootTimers = [];
function bootTimer(fn, ms) {
  bootTimers.push(setTimeout(fn, ms));
}

function runBoot() {
  const boot = $("#boot");
  const term = $("#boot-terminal");
  term.innerHTML = "";

  const PROMPT = `${CONFIG.boot.user}@${CONFIG.boot.host}:$`;
  let runningT = 350;
  const STEP = 620;

  const addPromptRow = (cmd, delay) => {
    bootTimer(() => {
      const row = document.createElement("div");
      row.className = "t-row";
      row.innerHTML = `<div class="t-prompt">${PROMPT}</div><div class="t-cmd"></div>`;
      term.appendChild(row);
      typeIn(row.querySelector(".t-cmd"), cmd, 45);
    }, delay);
  };

  const addOut = (text, delay) => {
    bootTimer(() => {
      const div = document.createElement("div");
      div.className = "t-out";
      div.textContent = text;
      term.appendChild(div);
    }, delay);
  };

  for (const item of CONFIG.boot.commands) {
    if (item.type === "command") {
      addPromptRow(item.cmd, runningT);
      runningT += STEP;
      for (const line of item.output) {
        addOut(line, runningT);
        runningT += STEP;
      }
    } else if (item.type === "typo") {
      bootTimer(() => {
        const row = document.createElement("div");
        row.className = "t-row";
        row.innerHTML = `<div class="t-prompt">${PROMPT}</div><div class="t-typed"><span class="t-cmd"></span><span class="t-caret"></span></div>`;
        term.appendChild(row);
        typeIn(row.querySelector(".t-cmd"), item.cmd, 70);
      }, runningT);
      runningT += STEP + 500;
    } else if (item.type === "output") {
      for (const line of item.lines) {
        addOut(line, runningT);
        runningT += STEP;
      }
    }
  }

  runningT += 700;
  bootTimer(finishBoot, runningT);

  $("#skip-btn").addEventListener("click", () => {
    for (const id of bootTimers) clearTimeout(id);
    bootTimers.length = 0;
    // Render the final state instantly, then close.
    term.innerHTML = "";
    for (const item of CONFIG.boot.commands) {
      if (item.type === "command") {
        term.appendChild(promptRowInstant(PROMPT, item.cmd));
        item.output.forEach((l) => term.appendChild(outInstant(l)));
      } else if (item.type === "typo") {
        term.appendChild(promptRowInstant(PROMPT, item.cmd));
      } else {
        item.lines.forEach((l) => term.appendChild(outInstant(l)));
      }
    }
    bootTimer(finishBoot, 350);
  });

  function makeHidden() {
    const d = document.createElement("div");
    d.style.display = "none";
  }
}

function promptRowInstant(prompt, cmd) {
  const row = document.createElement("div");
  row.className = "t-row";
  row.innerHTML = `<div class="t-prompt">${prompt}</div><div>${cmd}</div>`;
  return row;
}
function outInstant(text) {
  const div = document.createElement("div");
  div.className = "t-out";
  div.textContent = text;
  return div;
}

function typeIn(el, text, speed) {
  let i = 0;
  const id = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(id);
  }, speed);
  bootTimers.push(id);
}

let bootDone = false;
function finishBoot() {
  if (bootDone) return;
  bootDone = true;
  $("#boot").classList.add("out");
  const app = $("#app");
  app.hidden = false;
  requestAnimationFrame(() => app.classList.add("ready"));
  setTimeout(() => $("#boot").remove(), 300);

  const hash = window.location.hash.replace("#", "");
  const target = hash && $("#pages").querySelector(`#${CSS.escape(hash)}`);
  if (target) setTimeout(() => target.scrollIntoView({ behavior: "instant" }), 50);

  setTimeout(() => roleTyper.start(), 1200);
}

/* ------------------------------------------------------------
   Scrambled text ("SortText" style)
   ------------------------------------------------------------ */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890/&$%#@*^~";
let scrambleTimer = null;

function scrambleText(el) {
  const target = el.dataset.scrambleText ?? el.textContent;
  if (el._busy) return;
  el._busy = true;
  let progress = 0;
  scrambleTimer = setInterval(() => {
    const letters = target.split("").map((ch, idx) => {
      if (idx < progress || ch === " " || ch === "$" || ch === ":") return ch;
      return SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
    });
    el.textContent = letters.join("");
    if (progress >= target.length) {
      clearInterval(scrambleTimer);
      el.textContent = target;
      el._busy = false;
    }
    progress += 1 / 4;
  }, 30);
}

function initScrambles() {
  const targets = $$("[data-scramble-text]");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !e.target._seen) {
          e.target._seen = true;
          scrambleText(e.target);
        }
      }
    },
    { threshold: 0.5 }
  );
  targets.forEach((el) => {
    io.observe(el);
    el.addEventListener("mouseenter", () => {
      if (window.matchMedia("(min-width: 1536px)").matches) scrambleText(el);
    });
  });
}

/* ------------------------------------------------------------
   Rotating role typer (hero)
   ------------------------------------------------------------ */
const roleTyper = {
  i: 0,
  el: null,
  start() {
    this.el = $("#role-text");
    this.type(CONFIG.roles[0], 45, () => {
      setTimeout(() => this.hold(), 2200);
    });
  },
  hold() {
    this.delete(20, () => {
      setTimeout(() => {
        this.i = (this.i + 1) % CONFIG.roles.length;
        this.type(CONFIG.roles[this.i], 45, () => setTimeout(() => this.hold(), 2200));
      }, 350);
    });
  },
  type(text, speed, done) {
    let i = 0;
    this.el.textContent = "";
    const id = setInterval(() => {
      this.el.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(id);
        done && done();
      }
    }, speed);
  },
  delete(speed, done) {
    const id = setInterval(() => {
      const s = this.el.textContent;
      this.el.textContent = s.slice(0, -1);
      if (!this.el.textContent) {
        clearInterval(id);
        done && done();
      }
    }, speed);
  },
};

/* ------------------------------------------------------------
   Timeline drag-to-scroll + mobile wheel
   ------------------------------------------------------------ */
function initTimelineDrag() {
  const el = $("#timeline");
  if (!el) return;
  let isDown = false;
  let startX = 0;
  let startLeft = 0;

  el.addEventListener("pointerdown", (e) => {
    isDown = true;
    startX = e.clientX;
    startLeft = el.scrollLeft;
    el.classList.add("dragging");
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    el.scrollLeft = startLeft - (e.clientX - startX);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((ev) =>
    el.addEventListener(ev, () => {
      isDown = false;
      el.classList.remove("dragging");
    })
  );
}

/* ------------------------------------------------------------
   Carousel
   ------------------------------------------------------------ */
const carousel = {
  index: 0,
  track: null,
  perView: 1,
  total: 0,

  init() {
    this.track = $("#car-track");
    this.total = $$(".car-slide", this.track).length;
    this.updateBreak();
    $("#car-prev").addEventListener("click", () => this.step(-1));
    $("#car-next").addEventListener("click", () => this.step(1));

    // drag / swipe
    let startX = null;
    this.track.addEventListener("pointerdown", (e) => (startX = e.clientX));
    this.track.addEventListener("pointerup", (e) => {
      if (startX == null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 60) this.step(dx < 0 ? 1 : -1);
      startX = null;
    });

    window.addEventListener("resize", () => {
      const prev = this.perView;
      this.updateBreak();
      if (prev !== this.perView) this.render();
    });

    $$(".project-card").forEach((card, i) => {
      card.addEventListener("click", () => {
        const url = CONFIG.projects[i].redirect;
        if (url && !url.startsWith("#")) window.open(url, "_blank", "noopener");
      });
    });

    this.render();
  },
  updateBreak() {
    this.perView = window.matchMedia("(min-width: 1536px)").matches ? 2 : 1;
  },
  max() {
    return Math.max(0, this.total - this.perView);
  },
  step(dir) {
    this.index = (this.index + dir + (this.max() + 1)) % (this.max() + 1);
    this.render();
  },
  render() {
    const pct = (100 / this.perView) * this.index;
    this.track.style.transform = `translateX(-${pct}%)`;
    $("#car-prev").disabled = false;
    $("#car-next").disabled = false;
  },
};

/* ------------------------------------------------------------
   Scroll spy -> page indicator + nav highlight
   ------------------------------------------------------------ */
function initScrollSpy() {
  const pages = $$("#pages .page");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = e.target.id;
          $$("#page-indicator a, #nav-list li").forEach((el) => {
            const match = el.dataset.id === id;
            el.classList.toggle("active", match);
          });
        }
      }
    },
    { threshold: 0.55 }
  );
  pages.forEach((p) => io.observe(p));
}

/* ------------------------------------------------------------
   Mobile menu + hamburger
   ------------------------------------------------------------ */
function initMenu() {
  const btn = $("#hamburger-btn");
  const menu = $("#menu");
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("open", !open);
    menu.setAttribute("aria-hidden", String(open));
  });
  $$("#menu a").forEach((a) =>
    a.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
    })
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      btn.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
    }
  });
}

/* ------------------------------------------------------------
   Contact form + toasts
   ------------------------------------------------------------ */
function toast(msg, type = "info") {
  const stack = $("#toasts");
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.role = "alert";
  t.textContent = msg;
  stack.appendChild(t);
  const die = () => {
    t.classList.add("bye");
    setTimeout(() => t.remove(), 300);
  };
  t.addEventListener("click", die);
  setTimeout(die, 4000);
}

function initContact() {
  $("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    const ok = `Message ready to send — opening your email client. I will reply soon!`;
    if (CONFIG.contact.email.includes("example.com")) {
      toast("Set CONFIG.contact.email in app.js to receive real messages.", "info");
    }
    window.location.href = `mailto:${CONFIG.contact.email}?subject=${subject}&body=${body}`;
    toast(ok, "success");
    form.reset();
  });

  $("#copy-email").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.contact.email);
      toast("Email copied to clipboard!", "success");
    } catch {
      toast(`Couldn't copy. Email: ${CONFIG.contact.email}`, "error");
    }
  });

  $("#cta-contact").addEventListener("click", () => {
    location.hash = "#contact";
    $("#contact").scrollIntoView({ behavior: "smooth" });
  });
  $("#cta-learn").addEventListener("click", () => {
    location.hash = "#about";
    $("#about").scrollIntoView({ behavior: "smooth" });
  });
}

/* ------------------------------------------------------------
   Cursor glow canvas
   ------------------------------------------------------------ */
function initCursorGlow() {
  if (window.matchMedia("(hover: none)").matches) return;
  const canvas = $("#fx-canvas");
  const ctx = canvas.getContext("2d");
  let w, h;
  const dpr = window.devicePixelRatio || 1;

  function resize() {
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
  }
  resize();
  addEventListener("resize", resize);

  const target = { x: innerWidth / 2, y: innerHeight / 2 };
  const pos = { ...target };
  addEventListener("pointermove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  });

  (function frame() {
    ctx.clearRect(0, 0, w, h);
    pos.x += (target.x - pos.x) * 0.14 * dpr;
    pos.y += (target.y - pos.y) * 0.14 * dpr;
    const x = pos.x * dpr;
    const y = pos.y * dpr;

    ctx.globalCompositeOperation = "lighter";
    let g = ctx.createRadialGradient(x, y, 0, x, y, 22 * dpr);
    g.addColorStop(0, "rgba(242,255,91,0.35)");
    g.addColorStop(1, "rgba(242,255,91,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - 24 * dpr, y - 24 * dpr, 48 * dpr, 48 * dpr);

    g = ctx.createRadialGradient(x, y, 0, x, y, 60 * dpr);
    g.addColorStop(0, "rgba(137,255,105,0.12)");
    g.addColorStop(1, "rgba(137,255,105,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - 62 * dpr, y - 62 * dpr, 124 * dpr, 124 * dpr);
    ctx.globalCompositeOperation = "source-over";

    requestAnimationFrame(frame);
  })();
}

/* ------------------------------------------------------------
   Init
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  hydrate();
  runBoot();
  carousel.init();
  initTimelineDrag();
  initScrollSpy();
  initMenu();
  initContact();
  initCursorGlow();
  setTimeout(initScrambles, 100);
});
