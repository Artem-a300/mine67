/* Minecraft Helper — логіка інтерфейсу */
(function () {
  "use strict";

  const MC = window.MC;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  // ---------- Сховище (безпечне) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem("mch:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("mch:" + k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
  };

  const state = {
    recipeCat: "all", recipeQ: "", favOnly: false,
    favs: new Set(store.get("favs", [])),
    tipCat: "all", tipLevel: 0, tipQ: "",
    modCat: "all", modLoader: "all",
    tier: "all",
    checklist: store.get("checklist", []),
    wizPc: 2, wizGoal: "beauty",
  };

  // ---------- Утиліти ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).toLowerCase().replace(/[’'ʼ`]/g, "").replace(/ё/g, "е").replace(/\s+/g, " ").trim();
  const itemName = (k) => (MC.items[k] ? MC.items[k][0] : k);
  const itemEn = (k) => (MC.items[k] ? MC.items[k][1] : "");
  const icon = (k, cls = "") => `<img class="px ${cls}" src="${MCIcons.get(k)}" alt="">`;
  const slot = (k, opts = {}) => {
    if (!k) return `<div class="slot ${opts.cls || ""}" aria-hidden="true"></div>`;
    const tip = opts.noTip ? "" : ` data-tip="${esc(itemName(k))}"`;
    const count = opts.count > 1 ? `<span class="count">${opts.count}</span>` : "";
    return `<div class="slot ${opts.cls || ""}"${tip} role="img" aria-label="${esc(itemName(k))}${opts.count > 1 ? " ×" + opts.count : ""}">${icon(k)}${count}</div>`;
  };
  const arrowSvg = `<svg class="craft-arrow" viewBox="0 0 10 7" shape-rendering="crispEdges" aria-hidden="true"><path fill="#8bd95a" d="M0 2h6V0h1v1h1v1h1v1h1v1H9v1H8v1H7v1H6V5H0z"/><path fill="#3a7a1c" d="M0 4h6v1H0zM7 6h-1v-1h1zM8 5H7V4h1zM9 4H8V3h1z"/></svg>`;
  const recipeById = Object.fromEntries(MC.recipes.map((r) => [r.id, r]));
  const recipeByOut = Object.fromEntries(MC.recipes.map((r) => [r.out, r]));
  const catName = (id) => (MC.recipeCats.find((c) => c.id === id) || {}).name || id;

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2000);
  }

  function highlight(text, q) {
    const safe = esc(text);
    if (!q) return safe;
    const tokens = norm(q).split(" ").filter((t) => t.length > 1).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!tokens.length) return safe;
    try { return safe.replace(new RegExp("(" + tokens.join("|") + ")", "gi"), "<mark>$1</mark>"); } catch (e) { return safe; }
  }

  function ingredientsOf(r) {
    const map = new Map();
    r.grid.forEach((k) => { if (k) map.set(k, (map.get(k) || 0) + 1); });
    return Array.from(map, ([k, n]) => ({ k, n }));
  }

  function craftHTML(r, size = "big", anim = false) {
    const cls = size === "mini" ? "" : "big";
    const cells = r.grid.map((k, i) => {
      const s = slot(k, { cls, noTip: size === "mini" });
      return anim && k ? s.replace("<img ", `<img style="animation-delay:${i * 45}ms" `) : s;
    }).join("");
    return `<div class="craft ${size === "mini" ? "mini" : ""} ${anim ? "anim" : ""}">
      <div class="craft-grid">${cells}</div>
      ${arrowSvg}
      ${slot(r.out, { cls: "result", count: r.count, noTip: size === "mini" })}
    </div>`;
  }

  // ================= ГОЛОВНА =================
  function renderHome() {
    const el = $('[data-view="home"]');
    const popular = ["crafting_table", "torch", "bed", "iron_pickaxe", "shield", "enchanting_table", "eye", "hopper"];
    el.innerHTML = `
      <div class="hero panel">
        <div>
          <h1 id="home-title">Твій помічник у світі <span>Minecraft</span></h1>
          <p>Рецепти крафту, поради для виживання, найкращі моди й шейдери для ПК — усе в одному місці з миттєвим пошуком.</p>
          <div class="hero-actions">
            <a class="pbtn" href="#recipes">${icon("crafting_table")}Рецепти</a>
            <button class="pbtn gold" type="button" data-focus-search>${icon("compass")}Знайти щось</button>
          </div>
          <div class="hero-stats">
            <div class="stat"><b>${MC.recipes.length}</b><span>рецептів</span></div>
            <div class="stat"><b>${MC.tips.length}</b><span>порад</span></div>
            <div class="stat"><b>${MC.mods.length}</b><span>модів</span></div>
            <div class="stat"><b>${MC.shaders.length}</b><span>шейдерів</span></div>
          </div>
        </div>
        <div class="cube-wrap">
          <div>
            <div class="cube" title="Клацни мене!" role="img" aria-label="Блок трави, що обертається">
              ${["f1", "f2", "f3", "f4"].map((f) => `<div class="cube-face ${f}" style="background-image:url(${MCIcons.get("_grassside", 2)})"></div>`).join("")}
              <div class="cube-face f5" style="background-image:url(${MCIcons.get("_grasstop", 2)})"></div>
              <div class="cube-face f6" style="background-image:url(${MCIcons.get("_dirt", 2)})"></div>
            </div>
            <div class="cube-shadow"></div>
          </div>
        </div>
      </div>

      <div class="tiles">
        ${[
          ["recipes", "crafting_table", "Рецепти крафту", "Сітка 3×3, калькулятор ресурсів і де використовується предмет."],
          ["survival", "iron_sword", "Виживання", "Поради від першої ночі до дракона, чекліст і гарячі клавіші."],
          ["mods", "piston", "Моди", "Перевірені моди для FPS, зручності та нового контенту."],
          ["shaders", "lantern", "Шейдери", "Підбір під твій ПК і інструкція встановлення."],
        ].map(([v, ic, t, d]) => `
          <a class="tile panel" href="#${v}">
            ${icon(ic)}
            <h3>${t}</h3>
            <p>${d}</p>
            <span class="go">Відкрити ▶</span>
          </a>`).join("")}
      </div>

      <div class="tod panel" id="tod"></div>

      <h2 class="h2">${icon("chest")}Популярні рецепти</h2>
      <div class="popular">
        ${popular.map((id) => `<button class="pbtn dark sm" type="button" data-open-recipe="${id}">${icon(id)}${esc(itemName(id))}</button>`).join("")}
      </div>
    `;
    renderTipOfDay();

    const cube = $(".cube", el);
    cube.addEventListener("click", (e) => {
      cube.classList.remove("jump"); void cube.offsetWidth; cube.classList.add("jump");
      burst(e.clientX, e.clientY);
    });
  }

  function burst(x, y) {
    const box = document.createElement("div");
    box.className = "particles";
    box.style.left = x + "px"; box.style.top = y + "px"; box.style.position = "fixed";
    const colors = ["#5fae3a", "#7ccf4a", "#8a5d3b", "#3f8f3a", "#a8784f"];
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("i");
      p.className = "particle";
      p.style.background = colors[i % colors.length];
      p.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
      p.style.setProperty("--dy", (Math.random() * 140 - 100) + "px");
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 800);
  }

  let todIndex = (() => { const d = new Date(); return (d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate()) % MC.tips.length; })();
  function renderTipOfDay() {
    const t = MC.tips[todIndex];
    const cat = MC.tipCats.find((c) => c.id === t.cat);
    const ic = t.recipe || "book";
    $("#tod").innerHTML = `
      ${slot(ic, { noTip: true })}
      <div>
        <div class="label">★ Порада дня · ${esc(cat.name)}</div>
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.text)}</p>
      </div>
      <button class="pbtn stone sm" type="button" id="tod-next">${icon("clock")}Ще порада</button>`;
    $("#tod-next").addEventListener("click", () => {
      let n; do { n = Math.floor(Math.random() * MC.tips.length); } while (n === todIndex && MC.tips.length > 1);
      todIndex = n; renderTipOfDay();
    });
  }

  // ================= РЕЦЕПТИ =================
  function renderRecipesShell() {
    const el = $('[data-view="recipes"]');
    el.innerHTML = `
      <div class="page-head">
        <div>
          <h1 id="recipes-title">Рецепти крафту</h1>
          <p>Натисни на рецепт, щоб побачити сітку, порахувати ресурси та дізнатися, де ще використовується предмет.</p>
        </div>
      </div>
      <div class="toolbar">
        <input class="field grow" id="recipe-q" type="search" placeholder="Фільтр: назва або інгредієнт (укр/англ)…" aria-label="Фільтр рецептів">
        <button class="pbtn stone sm" type="button" id="fav-only" aria-pressed="false"><span class="sym">★</span> Обрані</button>
      </div>
      <div class="chips" id="recipe-cats" role="group" aria-label="Категорії рецептів">
        <button class="pbtn sm dark" type="button" data-cat="all">Усі</button>
        ${MC.recipeCats.map((c) => `<button class="pbtn sm dark" type="button" data-cat="${c.id}">${icon(c.icon)}${esc(c.name)}</button>`).join("")}
      </div>
      <p class="count-note" id="recipe-count" aria-live="polite"></p>
      <div class="grid-cards" id="recipe-list"></div>
    `;
    $("#recipe-q").addEventListener("input", (e) => { state.recipeQ = e.target.value; renderRecipeList(); });
    $("#fav-only").addEventListener("click", () => { state.favOnly = !state.favOnly; renderRecipeList(); });
    $("#recipe-cats").addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]"); if (!b) return;
      state.recipeCat = b.dataset.cat; renderRecipeList();
    });
    renderRecipeList();
  }

  function recipeHaystack(r) {
    const ings = ingredientsOf(r).map(({ k }) => itemName(k) + " " + itemEn(k)).join(" ");
    return norm([itemName(r.out), itemEn(r.out), catName(r.cat), ings, r.aliases.join(" ")].join(" "));
  }

  function renderRecipeList() {
    $$("#recipe-cats [data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === state.recipeCat)));
    $("#fav-only").setAttribute("aria-pressed", String(state.favOnly));
    const q = norm(state.recipeQ);
    const tokens = q.split(" ").filter(Boolean);
    const list = MC.recipes.filter((r) =>
      (state.recipeCat === "all" || r.cat === state.recipeCat) &&
      (!state.favOnly || state.favs.has(r.id)) &&
      (!tokens.length || tokens.every((t) => recipeHaystack(r).includes(t))));
    $("#recipe-count").textContent = `Знайдено: ${list.length}`;
    $("#recipe-list").innerHTML = list.length ? list.map((r) => `
      <button class="rcard panel" type="button" data-open-recipe="${r.id}" id="recipe-${r.id}">
        ${state.favs.has(r.id) ? '<span class="fav-mark" aria-label="В обраних">★</span>' : ""}
        ${craftHTML(r, "mini")}
        <div>
          <h3>${highlight(itemName(r.out), state.recipeQ)}</h3>
          <div class="en">${esc(itemEn(r.out))}</div>
        </div>
        <div class="badges">
          <span class="badge">${esc(catName(r.cat))}</span>
          ${r.shapeless ? '<span class="badge blue">Без форми</span>' : ""}
          ${r.count > 1 ? `<span class="badge gold">×${r.count}</span>` : ""}
        </div>
      </button>`).join("") : `
      <div class="empty panel" style="grid-column:1/-1">${icon("cobble")}${state.favOnly ? "Ще немає обраних рецептів. Відкрий рецепт і натисни ★." : "Нічого не знайдено. Спробуй іншу назву або категорію."}</div>`;
  }

  // ---------- Модальне вікно рецепту ----------
  const modal = $("#modal");
  let modalQty = 1;

  function openRecipe(id, { push = true } = {}) {
    const r = recipeById[id];
    if (!r) return;
    modalQty = r.count;
    const usedIn = MC.recipes.filter((x) => x.grid.includes(r.out));
    const fav = state.favs.has(r.id);
    modal.innerHTML = `
      <div class="modal-head">
        ${slot(r.out, { cls: "big", noTip: true })}
        <div>
          <h2 id="modal-title">${esc(itemName(r.out))}</h2>
          <div class="en">${esc(itemEn(r.out))}</div>
          <div class="badges" style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">
            <span class="badge">${esc(catName(r.cat))}</span>
            ${r.shapeless ? '<span class="badge blue">Без форми — клади будь-де</span>' : ""}
          </div>
        </div>
        <div class="actions">
          <button class="pbtn sm ${fav ? "gold" : "stone"}" type="button" id="fav-btn" aria-pressed="${fav}">${fav ? '<span class="sym">★</span> В обраних' : '<span class="sym">☆</span> В обрані'}</button>
          <button class="pbtn sm stone" type="button" id="share-btn" title="Скопіювати посилання" aria-label="Скопіювати посилання"><span class="sym">🔗</span></button>
          <button class="pbtn sm stone" type="button" id="close-btn" aria-label="Закрити"><span class="sym">✕</span></button>
        </div>
      </div>
      <div class="modal-body">
        <div class="craft-stage">${craftHTML(r, "big", true)}</div>
        ${r.note ? `<div class="note">${esc(r.note)}</div>` : ""}
        <div>
          <h3>Інгредієнти на 1 крафт</h3>
          <div class="ing-list">${ingredientsOf(r).map(({ k, n }) => ingHTML(k, n)).join("")}</div>
        </div>
        <div>
          <h3>Калькулятор: скільки потрібно?</h3>
          <div class="calc">
            <button class="pbtn sm stone icon-only" type="button" data-step="-1" aria-label="Менше"><span class="sym">−</span></button>
            <input class="field" id="qty" type="number" min="1" max="9999" value="${modalQty}" aria-label="Кількість предметів">
            <button class="pbtn sm stone icon-only" type="button" data-step="1" aria-label="Більше"><span class="sym">+</span></button>
            <button class="pbtn sm dark" type="button" data-set="64">Стос (64)</button>
          </div>
          <div class="calc-out" id="calc-out"></div>
          <div class="ing-list" id="calc-list" style="margin-top:10px"></div>
        </div>
        ${usedIn.length ? `
        <div>
          <h3>Де використовується (${usedIn.length})</h3>
          <div class="used-in">${usedIn.map((x) => `<div class="slot" data-tip="${esc(itemName(x.out))}" data-open-recipe="${x.id}" tabindex="0" role="button" aria-label="${esc(itemName(x.out))}">${icon(x.out)}</div>`).join("")}</div>
        </div>` : ""}
      </div>`;

    $("#close-btn").addEventListener("click", closeModal);
    $("#fav-btn").addEventListener("click", () => toggleFav(r.id));
    $("#share-btn").addEventListener("click", () => copy(location.href.split("#")[0] + "#recipes/" + r.id, "Посилання скопійовано"));
    $("#qty").addEventListener("input", () => { modalQty = Math.max(1, Math.min(9999, parseInt($("#qty").value, 10) || 1)); updateCalc(r); });
    $$("[data-step]", modal).forEach((b) => b.addEventListener("click", () => { modalQty = Math.max(1, modalQty + Number(b.dataset.step) * r.count); $("#qty").value = modalQty; updateCalc(r); }));
    $$("[data-set]", modal).forEach((b) => b.addEventListener("click", () => { modalQty = Number(b.dataset.set); $("#qty").value = modalQty; updateCalc(r); }));
    updateCalc(r);

    if (!modal.open) modal.showModal();
    modal.scrollTop = 0;
    if (push && location.hash !== "#recipes/" + id) history.replaceState(null, "", "#recipes/" + id);
  }

  function ingHTML(k, n) {
    const craftable = recipeByOut[k];
    const inner = `${slot(k, { noTip: true })}<span><span>${esc(itemName(k))}</span>${craftable ? '<span class="hint">рецепт ▶</span>' : ""}</span><span class="q">×${n}</span>`;
    return craftable
      ? `<button class="ing" type="button" data-open-recipe="${craftable.id}">${inner}</button>`
      : `<div class="ing">${inner}</div>`;
  }

  function updateCalc(r) {
    const crafts = Math.ceil(modalQty / r.count);
    const got = crafts * r.count;
    $("#calc-out").innerHTML = `Крафтів: <b>${crafts}</b> · отримаєш <b>${got}</b> × ${esc(itemName(r.out))}${got > modalQty ? ` <span class="muted">(+${got - modalQty} зайвих)</span>` : ""}`;
    $("#calc-list").innerHTML = ingredientsOf(r).map(({ k, n }) => {
      const total = n * crafts;
      const stacks = total >= 64 ? ` <span class="muted" style="font-size:12px">(${Math.floor(total / 64)} ст. + ${total % 64})</span>` : "";
      return `<div class="ing">${slot(k, { noTip: true })}<span>${esc(itemName(k))}${stacks}</span><span class="q">×${total}</span></div>`;
    }).join("");
  }

  function closeModal() {
    if (modal.open) modal.close();
  }
  modal.addEventListener("close", () => {
    if (location.hash.startsWith("#recipes/")) history.replaceState(null, "", "#recipes");
  });
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  function toggleFav(id) {
    if (state.favs.has(id)) { state.favs.delete(id); toast("Прибрано з обраних"); }
    else { state.favs.add(id); toast("★ Додано в обрані"); }
    store.set("favs", Array.from(state.favs));
    const b = $("#fav-btn");
    if (b) {
      const on = state.favs.has(id);
      b.className = `pbtn sm ${on ? "gold" : "stone"}`;
      b.setAttribute("aria-pressed", String(on));
      b.innerHTML = on ? '<span class="sym">★</span> В обраних' : '<span class="sym">☆</span> В обрані';
    }
    if ($("#recipe-list")) renderRecipeList();
  }

  function copy(text, msg) {
    const done = () => toast(msg);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { toast("Не вдалося скопіювати"); }
    ta.remove();
  }

  // ================= ВИЖИВАННЯ =================
  function renderSurvivalShell() {
    const el = $('[data-view="survival"]');
    el.innerHTML = `
      <div class="page-head">
        <div>
          <h1 id="survival-title">Поради для виживання</h1>
          <p>Від першої ночі до перемоги над драконом. Фільтруй за темою та рівнем досвіду.</p>
        </div>
      </div>

      <div class="two-col">
        <div class="checklist panel">
          <h2 class="h2">${icon("bed")}План першого дня</h2>
          <div class="progress-label" id="cl-label"></div>
          <div class="progress" aria-hidden="true"><i id="cl-bar"></i></div>
          <div id="cl-items"></div>
          <button class="pbtn sm stone" type="button" id="cl-reset" style="margin-top:12px">Почати заново</button>
        </div>
        <div class="checklist panel">
          <h2 class="h2">${icon("compass")}Важливі висоти (Y)</h2>
          <div class="ing-list" style="grid-template-columns:1fr">
            ${[
              ["diamond", "Алмази", "−59 … −53"],
              ["iron", "Залізо", "≈ 15 і гори 80+"],
              ["gold", "Золото", "≈ −16 (у бедлендах — будь-де)"],
              ["redstone", "Редстоун", "−59 і нижче"],
              ["coal", "Вугілля", "≈ 95 і 136"],
              ["obsidian", "Древні уламки (Незер)", "≈ 15 (8 … 22)"],
            ].map(([k, n, y]) => `<div class="ing">${slot(k, { noTip: true })}<span>${n}</span><span class="q">Y ${y}</span></div>`).join("")}
          </div>
        </div>
      </div>

      <h2 class="h2">${icon("book")}Поради</h2>
      <div class="toolbar">
        <input class="field grow" id="tip-q" type="search" placeholder="Фільтр порад: лава, алмази, ендермен…" aria-label="Фільтр порад">
        <select class="field" id="tip-level" aria-label="Рівень" style="min-width:200px">
          <option value="0">Усі рівні</option>
          <option value="1">Новачок</option>
          <option value="2">Досвідчений</option>
          <option value="3">Профі</option>
        </select>
      </div>
      <div class="chips" id="tip-cats" role="group" aria-label="Теми порад">
        <button class="pbtn sm dark" type="button" data-cat="all">Усі</button>
        ${MC.tipCats.map((c) => `<button class="pbtn sm dark" type="button" data-cat="${c.id}">${esc(c.name)}</button>`).join("")}
      </div>
      <p class="count-note" id="tip-count" aria-live="polite"></p>
      <div class="tips" id="tip-list"></div>

      <h2 class="h2" id="hotkeys">${icon("clock")}Гарячі клавіші (ПК, Java)</h2>
      <div class="keys panel">
        ${MC.hotkeys.map((h, i) => `<div class="key-row" id="key-${i}"><span class="kk">${h.k.map((k) => `<kbd class="k">${esc(k)}</kbd>`).join('<span class="plus">+</span>')}</span><span>${esc(h.d)}</span></div>`).join("")}
      </div>
    `;
    $("#tip-q").addEventListener("input", (e) => { state.tipQ = e.target.value; renderTips(); });
    $("#tip-level").addEventListener("change", (e) => { state.tipLevel = Number(e.target.value); renderTips(); });
    $("#tip-cats").addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]"); if (!b) return;
      state.tipCat = b.dataset.cat; renderTips();
    });
    $("#cl-reset").addEventListener("click", () => { state.checklist = []; store.set("checklist", []); renderChecklist(); });
    renderChecklist();
    renderTips();
  }

  function renderChecklist() {
    const done = new Set(state.checklist);
    $("#cl-items").innerHTML = MC.firstDay.map((t, i) => `
      <label class="check"><input type="checkbox" data-i="${i}" ${done.has(i) ? "checked" : ""}><span class="box"></span><span>${esc(t)}</span></label>`).join("");
    const pct = Math.round((done.size / MC.firstDay.length) * 100);
    $("#cl-bar").style.width = `calc(${pct}% - ${pct ? 8 : 0}px)`;
    $("#cl-label").textContent = done.size === MC.firstDay.length ? "Готово! Ти пережив першу ніч ★" : `Виконано: ${done.size} / ${MC.firstDay.length}`;
    $$("#cl-items input").forEach((cb) => cb.addEventListener("change", () => {
      const i = Number(cb.dataset.i);
      const s = new Set(state.checklist);
      cb.checked ? s.add(i) : s.delete(i);
      state.checklist = Array.from(s);
      store.set("checklist", state.checklist);
      const wasDone = done.size === MC.firstDay.length;
      renderChecklist();
      if (!wasDone && s.size === MC.firstDay.length) toast("★ Досягнення: Пережити першу ніч!");
    }));
  }

  function renderTips() {
    $$("#tip-cats [data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === state.tipCat)));
    const tokens = norm(state.tipQ).split(" ").filter(Boolean);
    const list = MC.tips.filter((t) =>
      (state.tipCat === "all" || t.cat === state.tipCat) &&
      (!state.tipLevel || t.lvl === state.tipLevel) &&
      (!tokens.length || tokens.every((tk) => norm(t.title + " " + t.text + " " + t.tags.join(" ")).includes(tk))));
    $("#tip-count").textContent = `Порад: ${list.length}`;
    $("#tip-list").innerHTML = list.length ? list.map((t) => {
      const cat = MC.tipCats.find((c) => c.id === t.cat);
      return `
      <article class="tip panel" id="tip-${t.id}" style="--cat:${cat.color}">
        <div class="tip-meta">
          <span class="badge" style="background:${cat.color};color:#111">${esc(cat.name)}</span>
          <span class="lvl" title="${MC.LV[t.lvl]}" aria-label="Рівень: ${MC.LV[t.lvl]}">${[1, 2, 3].map((n) => `<i class="${n <= t.lvl ? "on" : ""}"></i>`).join("")}</span>
        </div>
        <h3>${highlight(t.title, state.tipQ)}</h3>
        <p>${highlight(t.text, state.tipQ)}</p>
        ${t.recipe ? `<button class="pbtn sm dark see" type="button" data-open-recipe="${t.recipe}">${icon(t.recipe)}Рецепт: ${esc(itemName(t.recipe))}</button>` : ""}
        <div class="tags">${t.tags.map((g) => `<button class="tag" type="button" data-tag="${esc(g)}">#${esc(g)}</button>`).join("")}</div>
      </article>`;
    }).join("") : `<div class="empty panel" style="grid-column:1/-1">${icon("bucket")}Порад не знайдено. Скинь фільтри.</div>`;
  }

  // ================= МОДИ =================
  const avatarColors = { perf: "#3a8a3a", graphics: "#c47a0e", ui: "#23476e", maps: "#2f7a7a", qol: "#6b4a8a", content: "#9a3a2a" };

  function renderModsShell() {
    const el = $('[data-view="mods"]');
    const loaders = ["Fabric", "NeoForge", "Forge"];
    el.innerHTML = `
      <div class="page-head">
        <div>
          <h1 id="mods-title">Рекомендовані моди</h1>
          <p>Перевірені й популярні моди для Java Edition. Перед встановленням дивись, щоб версія мода збігалася з версією гри та завантажувачем.</p>
        </div>
      </div>

      <div class="wizard panel">
        <h2 class="h2">${icon("eye")}Підбір збірки за 2 кліки</h2>
        <div class="q">1. Який у тебе компʼютер?</div>
        <div class="chips" id="wiz-pc">${MC.tiers.map((t) => `<button class="pbtn sm dark" type="button" data-v="${t.id}" title="${esc(t.hint)}">${esc(t.name)}</button>`).join("")}</div>
        <div class="q">2. Що для тебе головне?</div>
        <div class="chips" id="wiz-goal">${MC.buildGoals.map((g) => `<button class="pbtn sm dark" type="button" data-v="${g.id}">${esc(g.name)}</button>`).join("")}</div>
        <div class="wiz-out" id="wiz-out" aria-live="polite"></div>
      </div>

      <h2 class="h2">${icon("chest")}Каталог модів</h2>
      <div class="toolbar">
        <div class="chips" id="mod-cats" role="group" aria-label="Категорії модів">
          <button class="pbtn sm dark" type="button" data-cat="all">Усі</button>
          ${MC.modCats.map((c) => `<button class="pbtn sm dark" type="button" data-cat="${c.id}">${esc(c.name)}</button>`).join("")}
        </div>
        <span class="grow"></span>
        <select class="field" id="mod-loader" aria-label="Завантажувач модів" style="min-width:200px">
          <option value="all">Будь-який завантажувач</option>
          ${loaders.map((l) => `<option value="${l}">${l}</option>`).join("")}
        </select>
      </div>
      <p class="count-note" id="mod-count" aria-live="polite"></p>
      <div class="grid-cards" id="mod-list" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))"></div>

      <h2 class="h2">${icon("book")}Як встановити моди</h2>
      <div class="steps">
        <div class="step panel"><h3>Завантажувач</h3><p>Встанови <b>Fabric</b> або <b>NeoForge</b> для своєї версії гри (або користуйся лаунчером Prism / Modrinth App — він зробить усе сам).</p></div>
        <div class="step panel"><h3>Завантаж моди</h3><p>Лише з <b>Modrinth</b> чи <b>CurseForge</b>. Вибирай файл під свою версію гри та завантажувач.</p></div>
        <div class="step panel"><h3>Папка mods</h3><p>Поклади <code>.jar</code> файли в <code>%appdata%\\.minecraft\\mods</code> (Windows) або <code>~/Library/Application Support/minecraft/mods</code> (macOS).</p></div>
        <div class="step panel"><h3>Запуск</h3><p>У лаунчері вибери профіль Fabric/NeoForge і запускай. Fabric-модам часто потрібен <b>Fabric API</b>.</p></div>
      </div>
    `;
    $("#mod-cats").addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (!b) return; state.modCat = b.dataset.cat; renderMods(); });
    $("#mod-loader").addEventListener("change", (e) => { state.modLoader = e.target.value; renderMods(); });
    $("#wiz-pc").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (!b) return; state.wizPc = Number(b.dataset.v); renderWizard(); });
    $("#wiz-goal").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (!b) return; state.wizGoal = b.dataset.v; renderWizard(); });
    renderWizard();
    renderMods();
  }

  function modCard(m) {
    const cat = MC.modCats.find((c) => c.id === m.cat);
    return `
      <article class="mcard panel" id="mod-${m.id}">
        <div class="mhead">
          <div class="mavatar" style="--av:${avatarColors[m.cat]}" aria-hidden="true">${esc(m.name[0])}</div>
          <div>
            <h3>${esc(m.name)}</h3>
            <div class="row" style="margin-top:6px"><span class="badge">${esc(cat.name)}</span>${m.must ? '<span class="badge gold">★ Must-have</span>' : ""}</div>
          </div>
        </div>
        <p>${esc(m.desc)}</p>
        <div class="foot">
          <div class="row">${m.loaders.map((l) => `<span class="badge ${l === "Fabric" ? "blue" : l === "NeoForge" ? "red" : l === "Forge" ? "purple" : ""}">${esc(l)}</span>`).join("")}</div>
          <a class="pbtn sm" style="margin-left:auto" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">Сторінка <span class="sym">↗</span></a>
        </div>
      </article>`;
  }

  function renderMods() {
    $$("#mod-cats [data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === state.modCat)));
    const list = MC.mods.filter((m) =>
      (state.modCat === "all" || m.cat === state.modCat) &&
      (state.modLoader === "all" || m.loaders.includes(state.modLoader)));
    $("#mod-count").textContent = `Модів: ${list.length}`;
    $("#mod-list").innerHTML = list.length ? list.map(modCard).join("") : `<div class="empty panel" style="grid-column:1/-1">${icon("piston")}Немає модів з такими фільтрами.</div>`;
  }

  function renderWizard() {
    $$("#wiz-pc [data-v]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.v) === state.wizPc)));
    $$("#wiz-goal [data-v]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === state.wizGoal)));
    const goal = MC.buildGoals.find((g) => g.id === state.wizGoal);
    let ids = goal.mods.slice();
    if (state.wizPc === 1) ids = Array.from(new Set(["sodium", "lithium", "ferritecore", "entityculling", ...ids]));
    if (state.wizGoal === "beauty" && state.wizPc === 1) ids = ids.filter((i) => i !== "continuity");
    const mods = ids.map((id) => MC.mods.find((m) => m.id === id)).filter(Boolean);
    const shaderIds = state.wizGoal === "beauty" || state.wizPc >= 2 ? MC.shaderByTier[state.wizPc] : [];
    const shaders = shaderIds.map((id) => MC.shaders.find((s) => s.id === id));
    const needIris = shaders.length && !ids.includes("iris");
    const tierObj = MC.tiers.find((t) => t.id === state.wizPc);
    const text = [
      "Моя збірка Minecraft (" + tierObj.name + ", " + goal.name + "):",
      ...mods.map((m) => "- " + m.name),
      ...(needIris ? ["- Iris Shaders"] : []),
      ...(shaders.length ? ["Шейдер: " + shaders.map((s) => s.name).join(" або ")] : []),
    ].join("\n");
    $("#wiz-out").innerHTML = `
      <b>Моди:</b>
      <ol>${mods.map((m) => `<li><button type="button" data-goto-mod="${m.id}">${esc(m.name)}</button> — <span class="muted">${esc(MC.modCats.find((c) => c.id === m.cat).name)}</span></li>`).join("")}
      ${needIris ? `<li><button type="button" data-goto-mod="iris">Iris Shaders</button> — <span class="muted">потрібен для шейдерів</span></li>` : ""}</ol>
      ${shaders.length ? `<p style="margin:12px 0 0"><b>Шейдер:</b> ${shaders.map((s) => `<a href="#shaders/${s.id}">${esc(s.name)}</a>`).join(" або ")}</p>` : `<p class="muted" style="margin:12px 0 0">Шейдери на слабкому ПК краще не вмикати, якщо мета — FPS. Спробуй MakeUp – Ultra Fast, коли захочеш краси.</p>`}
      <button class="pbtn sm gold" type="button" id="wiz-copy" style="margin-top:14px"><span class="sym">📋</span> Скопіювати список</button>`;
    $("#wiz-copy").addEventListener("click", () => copy(text, "Список скопійовано"));
  }

  // ================= ШЕЙДЕРИ =================
  function renderShadersShell() {
    const el = $('[data-view="shaders"]');
    el.innerHTML = `
      <div class="page-head">
        <div>
          <h1 id="shaders-title">Шейдери</h1>
          <p>Шейдери змінюють світло, тіні, воду й небо. Для них потрібен <b>Iris</b> (рекомендовано, разом із Sodium) або <b>OptiFine</b>.</p>
        </div>
      </div>
      <div class="chips" id="tiers" role="group" aria-label="Потужність ПК">
        <button class="pbtn sm dark" type="button" data-tier="all">Усі</button>
        ${MC.tiers.map((t) => `<button class="pbtn sm dark" type="button" data-tier="${t.id}" title="${esc(t.hint)}">${esc(t.name)}</button>`).join("")}
      </div>
      <p class="count-note" id="tier-hint" aria-live="polite"></p>
      <div class="grid-cards" id="shader-list" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))"></div>

      <h2 class="h2">${icon("lantern")}Як встановити шейдер (Iris)</h2>
      <div class="steps">
        <div class="step panel"><h3>Fabric + Iris</h3><p>Встанови Fabric (або NeoForge), потім <b>Sodium</b> та <b>Iris</b> у папку <code>mods</code>. Або запусти інсталятор Iris — він зробить це сам.</p></div>
        <div class="step panel"><h3>Завантаж шейдер</h3><p>Обери пак під свій ПК. Шейдер — це <code>.zip</code>, його <b>не потрібно</b> розпаковувати.</p></div>
        <div class="step panel"><h3>Папка shaderpacks</h3><p>Поклади zip у <code>.minecraft/shaderpacks</code>. Найпростіше: у грі натисни «Open Shader Pack Folder».</p></div>
        <div class="step panel"><h3>Увімкни</h3><p>Налаштування → Відео → <b>Shader Packs</b> → вибери пак → Apply. Клавіша <kbd class="k">K</kbd> (в Iris) швидко вмикає/вимикає шейдери.</p></div>
      </div>

      <h2 class="h2">${icon("redstone")}Якщо мало FPS</h2>
      <div class="tips">
        ${[
          ["Зменш дальність прорисовки", "8–12 чанків вистачає для більшості світів. Це найбільший приріст FPS."],
          ["Шейдер-пресет нижче", "Майже всі шейдери мають профілі Low / Medium. Тіні та обʼємні хмари — найважчі опції."],
          ["Більше памʼяті (з розумом)", "4–6 ГБ RAM для модпаків достатньо. Задавати 16 ГБ — шкідливо: довші паузи збирача сміття."],
          ["Дискретна відеокарта", "На ноутбуках перевір, що Java (javaw.exe) запускається на дискретній відеокарті, а не на вбудованій."],
        ].map(([t, d]) => `<article class="tip panel" style="--cat:var(--gold)"><h3>${t}</h3><p>${d}</p></article>`).join("")}
      </div>
    `;
    $("#tiers").addEventListener("click", (e) => { const b = e.target.closest("[data-tier]"); if (!b) return; state.tier = b.dataset.tier; renderShaders(); });
    renderShaders();
  }

  function renderShaders() {
    $$("#tiers [data-tier]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tier === String(state.tier))));
    const t = MC.tiers.find((x) => String(x.id) === String(state.tier));
    $("#tier-hint").textContent = t ? t.hint : "Від найлегших до найважчих";
    const list = MC.shaders.filter((s) => state.tier === "all" || String(s.tier) === String(state.tier));
    $("#shader-list").innerHTML = list.map((s) => {
      const tier = MC.tiers.find((x) => x.id === s.tier);
      return `
      <article class="mcard panel" id="shader-${s.id}">
        <div class="mhead">
          <div class="mavatar" style="--av:${["", "#3a8a3a", "#c47a0e", "#9a3a2a"][s.tier]}" aria-hidden="true">${esc(s.name[0])}</div>
          <div>
            <h3>${esc(s.name)}</h3>
            <div class="row" style="margin-top:6px"><span class="badge">${esc(tier.name)}</span><span class="badge blue">${esc(s.style)}</span>${s.must ? '<span class="badge gold">★ Вибір редакції</span>' : ""}</div>
          </div>
        </div>
        <p>${esc(s.desc)}</p>
        <div class="meter">
          <span>Швидкодія</span><span class="bars" aria-label="${s.perf} з 5">${[1, 2, 3, 4, 5].map((n) => `<i class="${n <= s.perf ? "on" : ""}"></i>`).join("")}</span>
          <span>Краса</span><span class="bars look" aria-label="${s.look} з 5">${[1, 2, 3, 4, 5].map((n) => `<i class="${n <= s.look ? "on" : ""}"></i>`).join("")}</span>
        </div>
        <div class="foot">
          <span class="badge">Iris / OptiFine</span>
          <a class="pbtn sm" style="margin-left:auto" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Завантажити <span class="sym">↗</span></a>
        </div>
      </article>`;
    }).join("");
  }

  // ================= ГЛОБАЛЬНИЙ ПОШУК =================
  const index = [];
  function buildIndex() {
    MC.recipes.forEach((r) => index.push({
      type: "recipe", id: r.id, icon: r.out,
      title: itemName(r.out), sub: itemEn(r.out) + " · " + ingredientsOf(r).map(({ k, n }) => n + "× " + itemName(k)).join(", "),
      hay: recipeHaystack(r), keyTitle: norm(itemName(r.out) + " " + itemEn(r.out) + " " + r.aliases.join(" ")),
    }));
    MC.tips.forEach((t) => index.push({
      type: "tip", id: t.id, icon: t.recipe || "book",
      title: t.title, sub: t.text,
      hay: norm(t.title + " " + t.text + " " + t.tags.join(" ")), keyTitle: norm(t.title + " " + t.tags.join(" ")),
    }));
    MC.mods.forEach((m) => index.push({
      type: "mod", id: m.id, icon: "piston",
      title: m.name, sub: m.desc,
      hay: norm(m.name + " " + m.desc + " " + m.loaders.join(" ") + " " + MC.modCats.find((c) => c.id === m.cat).name + " мод mod"), keyTitle: norm(m.name),
    }));
    MC.shaders.forEach((s) => index.push({
      type: "shader", id: s.id, icon: "lantern",
      title: s.name, sub: s.style + " · " + s.desc,
      hay: norm(s.name + " " + s.desc + " " + s.style + " шейдер shader " + MC.tiers.find((t) => t.id === s.tier).name), keyTitle: norm(s.name),
    }));
    MC.hotkeys.forEach((h, i) => index.push({
      type: "key", id: i, icon: "clock",
      title: h.k.join(" + "), sub: h.d,
      hay: norm(h.k.join(" ") + " " + h.d + " клавіша гаряча кнопка hotkey"), keyTitle: norm(h.k.join(" ")),
    }));
  }

  const typeLabels = { recipe: "Рецепти", tip: "Поради", mod: "Моди", shader: "Шейдери", key: "Гарячі клавіші" };

  function search(q) {
    const nq = norm(q);
    if (!nq) return [];
    const tokens = nq.split(" ");
    return index.map((e) => {
      if (!tokens.every((t) => e.hay.includes(t))) return null;
      let score = 1;
      if (e.keyTitle === nq) score += 100;
      else if (e.keyTitle.startsWith(nq)) score += 60;
      else if (e.keyTitle.split(" ").some((w) => w.startsWith(tokens[0]))) score += 35;
      else if (e.keyTitle.includes(nq)) score += 20;
      if (e.type === "recipe") score += 3;
      return { e, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score).map((x) => x.e);
  }

  const input = $("#q");
  const box = $("#search-results");
  let results = [], active = -1;

  function renderResults() {
    const q = input.value;
    if (!norm(q)) { closeResults(); return; }
    results = search(q);
    const order = ["recipe", "tip", "mod", "shader", "key"];
    const groups = order.map((t) => ({ t, items: results.filter((r) => r.type === t).slice(0, 6) })).filter((g) => g.items.length);
    results = groups.flatMap((g) => g.items);
    active = results.length ? 0 : -1;
    let i = 0;
    box.innerHTML = results.length ? groups.map((g) => `
      <div class="sr-group" role="group" aria-label="${typeLabels[g.t]}">
        <div class="sr-head"><span>${typeLabels[g.t]}</span></div>
        ${g.items.map((r) => {
          const idx = i++;
          return `<button class="sr-item" type="button" role="option" id="sr-${idx}" data-idx="${idx}" aria-selected="${idx === active}">
            ${slot(r.icon, { noTip: true })}
            <span style="min-width:0"><span class="sr-title">${highlight(r.title, q)}</span><span class="sr-sub">${highlight(r.sub, q)}</span></span>
          </button>`;
        }).join("")}
      </div>`).join("") : `<div class="sr-empty">${icon("cobble")}Нічого не знайдено за «${esc(q)}».<br>Спробуй англійську назву, наприклад «pickaxe».</div>`;
    box.hidden = false;
    input.setAttribute("aria-expanded", "true");
    input.setAttribute("aria-activedescendant", active >= 0 ? "sr-" + active : "");
  }

  function closeResults() {
    box.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
  }

  function setActive(n) {
    if (!results.length) return;
    active = (n + results.length) % results.length;
    $$(".sr-item", box).forEach((b) => b.setAttribute("aria-selected", String(Number(b.dataset.idx) === active)));
    const el = $("#sr-" + active);
    if (el) el.scrollIntoView({ block: "nearest" });
    input.setAttribute("aria-activedescendant", "sr-" + active);
  }

  function pick(r) {
    closeResults();
    input.value = "";
    input.blur();
    if (r.type === "recipe") { location.hash = "#recipes/" + r.id; }
    else if (r.type === "tip") goTo("survival", "tip-" + r.id, () => { state.tipCat = "all"; state.tipLevel = 0; state.tipQ = ""; $("#tip-q").value = ""; $("#tip-level").value = "0"; renderTips(); });
    else if (r.type === "mod") goTo("mods", "mod-" + r.id, () => { state.modCat = "all"; state.modLoader = "all"; $("#mod-loader").value = "all"; renderMods(); });
    else if (r.type === "shader") goTo("shaders", "shader-" + r.id, () => { state.tier = "all"; renderShaders(); });
    else if (r.type === "key") goTo("survival", "key-" + r.id);
  }

  function goTo(view, elId, prepare) {
    if (location.hash.slice(1).split("/")[0] !== view) { pendingFocus = { elId, prepare }; location.hash = "#" + view; }
    else { if (prepare) prepare(); flashEl(elId); }
  }
  let pendingFocus = null;

  function flashEl(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
  }

  input.addEventListener("input", renderResults);
  input.addEventListener("focus", () => { if (norm(input.value)) renderResults(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
    else if (e.key === "Enter") { if (results[active]) { e.preventDefault(); pick(results[active]); } }
    else if (e.key === "Escape") { if (!box.hidden) { closeResults(); } else { input.value = ""; input.blur(); } }
  });
  box.addEventListener("mousedown", (e) => e.preventDefault());
  box.addEventListener("click", (e) => { const b = e.target.closest(".sr-item"); if (b) pick(results[Number(b.dataset.idx)]); });
  document.addEventListener("click", (e) => { if (!e.target.closest(".search")) closeResults(); });

  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if ((e.key === "/" && !typing && !modal.open) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
      e.preventDefault(); input.focus(); input.select();
    }
  });

  // Делеговані дії
  document.addEventListener("click", (e) => {
    const rec = e.target.closest("[data-open-recipe]");
    if (rec) { e.preventDefault(); openRecipe(rec.dataset.openRecipe); return; }
    const tag = e.target.closest("[data-tag]");
    if (tag) { state.tipQ = tag.dataset.tag; $("#tip-q").value = tag.dataset.tag; renderTips(); return; }
    const gm = e.target.closest("[data-goto-mod]");
    if (gm) { goTo("mods", "mod-" + gm.dataset.gotoMod, () => { state.modCat = "all"; state.modLoader = "all"; $("#mod-loader").value = "all"; renderMods(); }); return; }
    if (e.target.closest("[data-focus-search]")) { input.focus(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches('[role="button"][data-open-recipe]')) {
      e.preventDefault(); openRecipe(e.target.dataset.openRecipe);
    }
  });

  // ================= МАРШРУТИЗАЦІЯ =================
  function route() {
    const [view, sub] = location.hash.slice(1).split("/");
    const v = ["home", "recipes", "survival", "mods", "shaders"].includes(view) ? view : "home";
    const prev = $(".view:not([hidden])");
    $$(".view").forEach((s) => (s.hidden = s.dataset.view !== v));
    $$("[data-nav]").forEach((a) => {
      const on = a.dataset.nav === v;
      a.classList.toggle("is-active", on);
      on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
    const changed = !prev || prev.dataset.view !== v;
    if (v === "recipes" && sub) {
      openRecipe(sub, { push: false });
    } else {
      if (modal.open) closeModal();
      if (changed && !pendingFocus) window.scrollTo({ top: 0, behavior: "instant" });
    }
    if (v === "shaders" && sub) { state.tier = "all"; renderShaders(); setTimeout(() => flashEl("shader-" + sub), 60); }
    if (pendingFocus) {
      const { elId, prepare } = pendingFocus; pendingFocus = null;
      if (prepare) prepare();
      setTimeout(() => flashEl(elId), 60);
    }
    document.title = ({ home: "Minecraft Helper — рецепти, поради, моди і шейдери", recipes: "Рецепти крафту · MC Helper", survival: "Поради для виживання · MC Helper", mods: "Моди · MC Helper", shaders: "Шейдери · MC Helper" })[v];
  }

  // ================= СТАРТ =================
  function init() {
    $$("img[data-icon]").forEach((img) => (img.src = MCIcons.get(img.dataset.icon)));
    renderHome();
    renderRecipesShell();
    renderSurvivalShell();
    renderModsShell();
    renderShadersShell();
    buildIndex();
    window.addEventListener("hashchange", route);
    route();
  }

  init();
})();
