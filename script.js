const translations = {
  ru: {
    navHow: "Как работает",
    navSteam: "Steam",
    heroTitle: "Играй с теми, кто подходит.",
    heroText: "Qwixy подбирает тиммейтов по игре, роли, рангу и языку прямо в Telegram.",
    openBot: "Открыть Telegram-бота",
    howKicker: "Как работает",
    problemTitle: "Три шага. Без лишнего.",
    howLead: "Выбираешь основу, Qwixy собирает профиль и показывает подходящих игроков.",
    stepOneTitle: "Выбери игру",
    stepOneText: "Выбираешь то, во что уже играешь.",
    stepOneNote: "6 популярных игр",
    stepTwoTitle: "Собери профиль",
    stepTwoText: "Роль, ранг, язык и короткое описание.",
    stepTwoNote: "Быстро, без лишних экранов",
    stepThreeTitle: "Получи матч",
    stepThreeText: "Если совпали - переходите в Telegram.",
    stepThreeNote: "Сразу в боте",
    steamEyebrow: "Steam",
    steamTitle: "Профиль за несколько секунд.",
    steamText: "Автозаполнение работает для Dota 2 и CS2. Остальное можно добавить вручную.",
    steamFound: "Steam-профиль найден",
    steamFilled: "Профиль автоматически заполнен",
    finalTitle: "Открой Qwixy.",
    finalText: "Создай профиль и найди тиммейта прямо в Telegram."
  },
  uk: {
    navHow: "Як працює",
    navSteam: "Steam",
    heroTitle: "Грай з тими, хто підходить.",
    heroText: "Qwixy підбирає тіммейтів за грою, роллю, рангом і мовою прямо в Telegram.",
    openBot: "Відкрити Telegram-бота",
    howKicker: "Як працює",
    problemTitle: "Три кроки. Без зайвого.",
    howLead: "Обираєш основу, Qwixy збирає профіль і показує відповідних гравців.",
    stepOneTitle: "Обери гру",
    stepOneText: "Обираєш те, у що вже граєш.",
    stepOneNote: "6 популярних ігор",
    stepTwoTitle: "Збери профіль",
    stepTwoText: "Роль, ранг, мова і короткий опис.",
    stepTwoNote: "Швидко, без зайвих екранів",
    stepThreeTitle: "Отримай матч",
    stepThreeText: "Якщо збіглися - переходьте в Telegram.",
    stepThreeNote: "Одразу в боті",
    steamEyebrow: "Steam",
    steamTitle: "Профіль за кілька секунд.",
    steamText: "Автозаповнення працює для Dota 2 і CS2. Решту можна додати вручну.",
    steamFound: "Steam-профіль знайдено",
    steamFilled: "Профіль автоматично заповнено",
    finalTitle: "Відкрий Qwixy.",
    finalText: "Створи профіль і знайди тіммейта прямо в Telegram."
  },
  en: {
    navHow: "How it works",
    navSteam: "Steam",
    heroTitle: "Play with people who fit.",
    heroText: "Qwixy matches teammates by game, role, rank and language directly in Telegram.",
    openBot: "Open Telegram Bot",
    howKicker: "How it works",
    problemTitle: "Three steps. Nothing extra.",
    howLead: "Choose the basics, Qwixy builds the profile and shows fitting players.",
    stepOneTitle: "Pick a game",
    stepOneText: "Choose what you already play.",
    stepOneNote: "6 popular games",
    stepTwoTitle: "Build a profile",
    stepTwoText: "Role, rank, language and a short description.",
    stepTwoNote: "Fast, with no extra screens",
    stepThreeTitle: "Get a match",
    stepThreeText: "When it fits - move to Telegram.",
    stepThreeNote: "Inside the bot",
    steamEyebrow: "Steam",
    steamTitle: "Profile in seconds.",
    steamText: "Autofill works for Dota 2 and CS2. Everything else can be added manually.",
    steamFound: "Steam profile found",
    steamFilled: "Profile autofilled",
    finalTitle: "Open Qwixy.",
    finalText: "Create a profile and find a teammate directly in Telegram."
  }
};

function detectLanguage() {
  const saved = localStorage.getItem("qwixy_lang");
  if (saved && translations[saved]) return saved;

  const lang = (navigator.language || "en").toLowerCase();
  if (lang.startsWith("ru")) return "ru";
  if (lang.startsWith("uk")) return "uk";
  return "en";
}

function moveLangSlider(lang, instant) {
  const slider = document.querySelector(".lang-slider");
  const btn = document.querySelector(`.lang-switch [data-lang="${lang}"]`);
  if (!slider || !btn) return;

  const x = btn.offsetLeft;
  const w = btn.offsetWidth;
  const prevX = parseFloat(slider.dataset.x);
  const prevW = parseFloat(slider.dataset.w);

  slider.dataset.x = x;
  slider.dataset.w = w;
  slider.style.transform = `translateX(${x}px)`;
  slider.style.width = w + "px";

  const canAnimate = !instant && typeof slider.animate === "function" &&
    !Number.isNaN(prevX) && (prevX !== x || prevW !== w);

  if (canAnimate) {
    slider.animate(
      [
        { transform: `translateX(${prevX}px)`, width: prevW + "px" },
        { transform: `translateX(${x}px)`, width: w + "px" }
      ],
      { duration: 380, easing: "cubic-bezier(0.34, 1.2, 0.5, 1)" }
    );
  }
}

window.addEventListener("resize", () => {
  const active = document.querySelector(".lang-switch button.active");
  if (active) moveLangSlider(active.dataset.lang, true);
});

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    const active = document.querySelector(".lang-switch button.active");
    if (active) moveLangSlider(active.dataset.lang, true);
  });
}

function splitHeroHeading(el) {
  if (!el) return;
  const text = el.textContent.trim();
  const words = text.split(/\s+/);
  el.textContent = "";
  words.forEach((w, i) => {
    const span = document.createElement("span");
    span.className = "word" + (i === words.length - 1 ? " accent" : "");
    span.style.setProperty("--i", i);
    span.textContent = w;
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.classList.add("split");
}

function setLanguage(lang) {
  const dict = translations[lang] || translations.ru;

  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.textContent = dict[key];
      if (el.dataset.typed) el.dataset.typed = dict[key];
    }
  });

  splitHeroHeading(document.querySelector(".hero-copy h1"));

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  moveLangSlider(lang, false);

  const titles = {
    ru: "Qwixy - тиммейты в Telegram",
    uk: "Qwixy - тіммейти в Telegram",
    en: "Qwixy - teammates in Telegram"
  };

  const descriptions = {
    ru: "Qwixy помогает найти тиммейта по игре, роли, рангу и языку прямо в Telegram.",
    uk: "Qwixy допомагає знайти тіммейта за грою, роллю, рангом і мовою прямо в Telegram.",
    en: "Qwixy helps you find teammates by game, role, rank and language directly in Telegram."
  };

  document.title = titles[lang] || titles.ru;
  document.querySelector('meta[name="description"]')?.setAttribute("content", descriptions[lang] || descriptions.ru);
  localStorage.setItem("qwixy_lang", lang);
}

document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (href === "#top") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);

      if (entry.target.classList.contains("reveal-cascade")) {
        const cards = entry.target.querySelectorAll(".step-card");
        const delays = [80, 220, 360];
        cards.forEach((card, i) => {
          const totalDelay = (delays[i] || 0) + 720;
          setTimeout(() => {
            card.style.transitionDelay = "0ms";
          }, totalDelay);
        });
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal, .reveal-cascade").forEach((el) => revealObserver.observe(el));

// Header scroll-state
const header = document.querySelector(".site-header");
const onScroll = () => {
  if (window.scrollY > 14) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Magnetic CTA on desktop pointers
const isFinePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

if (isFinePointer) {
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}

// Steam demo typing sequence
function typeInto(el, text, speed = 26) {
  return new Promise((resolve) => {
    el.textContent = "";
    const caret = document.createElement("span");
    caret.className = "caret";
    caret.textContent = "▍";
    el.appendChild(caret);
    let i = 0;
    const tick = () => {
      if (i >= text.length) {
        caret.remove();
        resolve();
        return;
      }
      caret.insertAdjacentText("beforebegin", text[i]);
      i++;
      setTimeout(tick, speed + Math.random() * 30);
    };
    tick();
  });
}

function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function playDemo(chat) {
  const userBubble = chat.querySelector(".bubble.user");
  const typingIndicator = chat.querySelector(".typing");
  const botBubble = chat.querySelector(".bubble.bot:not(.accent)");
  const accentBubble = chat.querySelector(".bubble.accent");
  const accentStrong = accentBubble.querySelector("strong");
  const accentChips = accentBubble.querySelectorAll("span");

  // hide all
  [userBubble, botBubble, accentBubble].forEach((b) => b.classList.remove("show"));
  typingIndicator.classList.remove("show");
  accentChips.forEach((c) => (c.style.opacity = "0"));

  await wait(220);
  userBubble.classList.add("show");
  await typeInto(userBubble, userBubble.dataset.typed || userBubble.textContent, 24);

  await wait(360);
  typingIndicator.classList.add("show");
  await wait(900);
  typingIndicator.classList.remove("show");

  botBubble.classList.add("show");
  await typeInto(botBubble, botBubble.dataset.typed || botBubble.textContent, 22);

  await wait(420);
  accentBubble.classList.add("show");
  await typeInto(accentStrong, accentStrong.dataset.typed || accentStrong.textContent, 22);

  for (const chip of accentChips) {
    await wait(160);
    chip.style.transition = "opacity 260ms ease, transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)";
    chip.style.transform = "translateY(4px) scale(0.9)";
    requestAnimationFrame(() => {
      chip.style.opacity = "1";
      chip.style.transform = "translateY(0) scale(1)";
    });
  }
}

const demoChat = document.getElementById("demoChat");
if (demoChat) {
  const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        demoObserver.disconnect();
        playDemo(demoChat);
      }
    });
  }, { threshold: 0.4 });
  demoObserver.observe(demoChat);
}

setLanguage(detectLanguage());
