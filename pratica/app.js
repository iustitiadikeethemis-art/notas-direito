(() => {
  const D = window.PA_DATA;
  const DB_NAME = "notas-direito-pratica";
  const DB_VERSION = 1;
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  let db;
  let current = [];
  let index = 0;
  let selected = null;
  let sessionMode = "daily";
  let sessionStartedAt = null;
  let sessionRecords = [];
  let currentAnswered = false;

  function openDB() {
    return new Promise((resolve, reject) => {
      const r = indexedDB.open(DB_NAME, DB_VERSION);
      r.onupgradeneeded = () => {
        const d = r.result;
        if (!d.objectStoreNames.contains("attempts")) d.createObjectStore("attempts", {keyPath:"id"});
        if (!d.objectStoreNames.contains("mastery")) d.createObjectStore("mastery", {keyPath:"node"});
        if (!d.objectStoreNames.contains("sessions")) d.createObjectStore("sessions", {keyPath:"id"});
      };
      r.onsuccess = () => { db = r.result; resolve(db); };
      r.onerror = () => reject(r.error);
    });
  }

  function all(store) {
    return new Promise((resolve, reject) => {
      const r = db.transaction(store).objectStore(store).getAll();
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  }

  function put(store, value) {
    return new Promise((resolve, reject) => {
      const r = db.transaction(store, "readwrite").objectStore(store).put(value);
      r.onsuccess = () => resolve();
      r.onerror = () => reject(r.error);
    });
  }

  function clear(store) {
    return new Promise((resolve, reject) => {
      const r = db.transaction(store, "readwrite").objectStore(store).clear();
      r.onsuccess = () => resolve();
      r.onerror = () => reject(r.error);
    });
  }

  function node(id) { return D.nodes.find(n => n.id === id); }
  function content(id) { return D.contents.find(c => c.id === id); }
  function question(id) { return D.questions.find(q => q.id === id); }
  function fmtDate(d) { return d ? new Intl.DateTimeFormat("pt-BR").format(new Date(d)) : "—"; }
  function uid(prefix) { return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2); }

  function nextDate(level, correct) {
    const intervals = [1, 3, 7, 15, 30];
    const days = correct ? intervals[Math.min(level, intervals.length - 1)] : 1;
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString();
  }

  async function validAttempts() {
    const ids = new Set(D.questions.map(q => q.id));
    return (await all("attempts")).filter(a => ids.has(a.questionId));
  }

  async function buildDailyQueue(limit = 12) {
    const attempts = await validAttempts();
    const mastery = await all("mastery");
    const now = new Date();

    const lastByQuestion = new Map();
    attempts.forEach(a => {
      const prev = lastByQuestion.get(a.questionId);
      if (!prev || new Date(a.date) > new Date(prev.date)) lastByQuestion.set(a.questionId, a);
    });

    const wrong = D.questions.filter(q => lastByQuestion.get(q.id)?.correct === false);
    const dueNodes = new Set(mastery.filter(m => new Date(m.nextReview) <= now).map(m => m.node));
    const due = D.questions.filter(q => dueNodes.has(q.primaryNode));
    const seen = new Set(attempts.map(a => a.questionId));
    const unseen = D.questions.filter(q => !seen.has(q.id));

    const merged = [...wrong, ...due, ...unseen, ...D.questions];
    return [...new Map(merged.map(q => [q.id, q])).values()].slice(0, limit);
  }

  async function stats() {
    const attempts = await validAttempts();
    const mastery = await all("mastery");
    const daily = await buildDailyQueue();
    const errors = attempts.filter(a => !a.correct);
    const correctCount = attempts.filter(a => a.correct).length;
    const errorQuestions = new Set(errors.map(a => a.questionId)).size;

    $("#kpi-hoje").textContent = daily.length;
    $("#kpi-nos").textContent = D.nodes.length;
    $("#kpi-erros").textContent = errorQuestions;
    $("#kpi-acerto").textContent = attempts.length ? Math.round(correctCount / attempts.length * 100) + "%" : "—";

    $("#d-tentativas").textContent = attempts.length;
    $("#d-acertos").textContent = correctCount;
    $("#d-percentual").textContent = attempts.length ? Math.round(correctCount / attempts.length * 100) + "%" : "—";
    $("#d-dominados").textContent = mastery.filter(m => m.level >= 3).length;

    renderErrors(errors);
    renderMastery(mastery);
    renderToday(daily, mastery);
  }

  function renderToday(queue, mastery) {
    const queueNodes = new Set(queue.map(q => q.primaryNode));
    const masteryMap = new Map(mastery.map(m => [m.node, m]));
    const relevantNodes = D.nodes.filter(n => queueNodes.has(n.id));

    $("#lista-hoje").innerHTML = relevantNodes.length
      ? relevantNodes.map(n => {
          const count = queue.filter(q => q.primaryNode === n.id).length;
          const m = masteryMap.get(n.id);
          const reason = m && new Date(m.nextReview) <= new Date() ? "revisão vencida" : (m ? "reforço" : "conteúdo novo");
          return `<div class="pa-item"><div><strong>${n.titulo}</strong><br><small>${n.disciplina} · ${reason}</small></div><span class="pa-badge">${count} ${count === 1 ? "questão" : "questões"}</span></div>`;
        }).join("")
      : '<div class="pa-empty">Nenhuma revisão pendente agora.</div>';
  }

  function renderContents() {
    $("#lista-conteudos").innerHTML = D.contents.map(c => {
      const qs = D.questions.filter(q => q.contentId === c.id);
      return `<div class="pa-item"><div><strong>${c.titulo}</strong><br><small>${c.nodes.map(id => node(id)?.titulo).filter(Boolean).join(" · ")}</small></div><div class="pa-content-actions"><span class="pa-badge">${qs.length} questões</span> <a class="pa-secondary" href="${c.url}">Estudar</a> <button class="pa-primary praticar-conteudo" data-content="${c.id}">Praticar</button></div></div>`;
    }).join("");

    $$(".praticar-conteudo").forEach(b => {
      b.onclick = () => start(D.questions.filter(q => q.contentId === b.dataset.content), "content");
    });
  }

  function renderErrors(errors) {
    const host = $("#lista-erros");
    if (!errors.length) {
      host.innerHTML = '<div class="pa-empty">Nenhum erro registrado ainda. Quando uma resposta for incorreta, ela aparecerá aqui automaticamente.</div>';
      return;
    }

    const groups = new Map();
    errors.forEach(a => {
      if (!question(a.questionId)) return;
      const g = groups.get(a.questionId) || {count:0,last:a};
      g.count++;
      if (new Date(a.date) > new Date(g.last.date)) g.last = a;
      groups.set(a.questionId, g);
    });

    const rows = [...groups.entries()]
      .sort((a,b) => new Date(b[1].last.date) - new Date(a[1].last.date))
      .map(([id,g]) => {
        const q = question(id);
        return `<div class="pa-error-card"><div><strong>${q.prompt}</strong><small>${node(q.primaryNode)?.titulo || ""} · ${g.count} ${g.count === 1 ? "erro" : "erros"} · último em ${fmtDate(g.last.date)}</small></div><button class="pa-secondary refazer-erro" data-question="${id}">Refazer</button></div>`;
      }).join("");

    host.innerHTML = rows;
    $$(".refazer-erro").forEach(b => b.onclick = () => start([question(b.dataset.question)], "error_review"));
  }

  function renderMastery(items) {
    const host = $("#tabela-dominio");
    if (!items.length) {
      host.innerHTML = '<div class="pa-empty">O domínio começará a ser calculado depois das primeiras respostas.</div>';
      return;
    }

    const labels = ["Novo", "Em aprendizagem", "Em consolidação", "Consolidação avançada", "Dominado"];
    host.innerHTML = '<table class="pa-table"><thead><tr><th>Assunto</th><th>Estado</th><th>Próxima revisão</th></tr></thead><tbody>' +
      items.filter(m => node(m.node)).map(m =>
        `<tr><td>${node(m.node).titulo}</td><td>${labels[Math.min(m.level,4)]}</td><td>${fmtDate(m.nextReview)}</td></tr>`
      ).join("") + '</tbody></table>';
  }

  function populateFilters() {
    [...new Set(D.nodes.map(n => n.disciplina))].sort().forEach(v =>
      $("#f-disciplina").insertAdjacentHTML("beforeend", `<option>${v}</option>`)
    );
    [...new Set(D.nodes.map(n => n.tema))].sort().forEach(v =>
      $("#f-tema").insertAdjacentHTML("beforeend", `<option>${v}</option>`)
    );
  }

  function start(list, mode) {
    if (!list.length) {
      alert("Nenhuma questão disponível para esse recorte.");
      return;
    }
    sessionMode = mode;
    current = [...list].sort(() => Math.random() - .5);
    index = 0;
    selected = null;
    sessionStartedAt = new Date().toISOString();
    sessionRecords = [];
    currentAnswered = false;
    $("#sessao").hidden = false;
    renderQuestion();
    $("#sessao").scrollIntoView({behavior:"smooth", block:"start"});
  }

  function questionMeta(q) {
    const n = node(q.primaryNode);
    const typeLabel = q.type === "short_answer" ? "resposta curta" : (q.type === "true_false" ? "verdadeiro ou falso" : "múltipla escolha");
    return `<div class="pa-meta"><span class="pa-chip">${n?.disciplina || ""}</span><span class="pa-chip">${n?.tema || ""}</span><span class="pa-chip">${typeLabel}</span><span class="pa-chip">${q.origin}</span><span class="pa-chip">dificuldade ${q.difficulty}</span></div>`;
  }

  function renderQuestion() {
    const q = current[index];
    if (!q) {
      finish();
      return;
    }

    selected = null;
    currentAnswered = false;
    const pct = Math.round(index / current.length * 100);
    const base = `<div class="pa-question"><div class="pa-progress"><div style="width:${pct}%"></div></div><div class="pa-question-count">Questão ${index + 1} de ${current.length}</div>${questionMeta(q)}<h2>${q.prompt}</h2>`;

    if (q.type === "short_answer") {
      $("#sessao").innerHTML = base +
        `<div class="pa-short"><textarea id="resposta-curta" rows="5" placeholder="Escreva sua resposta antes de consultar o modelo."></textarea></div><div class="pa-actions"><button id="revelar" class="pa-primary">Comparar com resposta-modelo</button><button id="pular" class="pa-secondary">Pular</button></div><div id="feedback" class="pa-feedback"></div></div>`;
      $("#revelar").onclick = revealShortAnswer;
      $("#pular").onclick = skipQuestion;
      return;
    }

    $("#sessao").innerHTML = base +
      `<div class="pa-options">${q.options.map((o,i) => `<button class="pa-option" data-i="${i}">${q.type === "true_false" ? "" : String.fromCharCode(65+i) + ") "}${o}</button>`).join("")}</div><div class="pa-actions"><button id="responder" class="pa-primary">Responder</button><button id="pular" class="pa-secondary">Pular</button></div><div id="feedback" class="pa-feedback"></div></div>`;

    $$(".pa-option").forEach(b => b.onclick = () => {
      if (currentAnswered) return;
      selected = Number(b.dataset.i);
      $$(".pa-option").forEach(x => x.classList.remove("selecionada"));
      b.classList.add("selecionada");
    });
    $("#responder").onclick = answerObjective;
    $("#pular").onclick = skipQuestion;
  }

  function skipQuestion() {
    if (currentAnswered) return;
    index++;
    renderQuestion();
  }

  async function recordAttempt(q, correct, answerValue) {
    const mastery = await all("mastery");
    const previous = mastery.find(m => m.node === q.primaryNode);
    const previousLevel = previous?.level || 0;
    const level = correct ? Math.min(previousLevel + 1, 4) : Math.max(previousLevel - 1, 0);
    const now = new Date().toISOString();
    const attempt = {
      id: uid("A"),
      questionId: q.id,
      node: q.primaryNode,
      correct,
      selected: answerValue,
      date: now,
      mode: sessionMode
    };

    await put("attempts", attempt);
    await put("mastery", {
      node: q.primaryNode,
      level,
      lastReview: now,
      nextReview: nextDate(level, correct),
      attempts: (previous?.attempts || 0) + 1
    });

    sessionRecords.push({questionId:q.id, correct, date:now});
    return attempt;
  }

  async function answerObjective() {
    const q = current[index];
    if (currentAnswered) return;
    if (selected === null) {
      alert("Selecione uma alternativa.");
      return;
    }

    currentAnswered = true;
    const correct = selected === q.answer;
    const attempt = await recordAttempt(q, correct, selected);
    $$(".pa-option").forEach((b,i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add("correta");
      if (i === selected && !correct) b.classList.add("incorreta");
    });
    $("#responder").disabled = true;
    $("#pular").disabled = true;
    showFeedback(q, correct, attempt);
    await stats();
  }

  function revealShortAnswer() {
    const q = current[index];
    if (currentAnswered) return;
    const text = $("#resposta-curta").value.trim();
    if (!text) {
      alert("Escreva sua resposta antes de consultar o modelo.");
      return;
    }

    currentAnswered = true;
    $("#resposta-curta").disabled = true;
    $("#revelar").disabled = true;
    $("#pular").disabled = true;
    const f = $("#feedback");
    f.className = "pa-feedback show";
    f.innerHTML = `<strong>Compare sua resposta com o modelo.</strong><div class="pa-model-answer">${q.modelAnswer}</div><p>${q.explanation}</p><p><a href="${content(q.contentId)?.url || "#"}">Rever conteúdo relacionado →</a></p><p><strong>Autoavaliação:</strong> considere se sua resposta recuperou o núcleo jurídico sem consultar o material.</p><div class="pa-actions"><button id="auto-acerto" class="pa-primary">Acertei o núcleo</button><button id="auto-erro" class="pa-secondary">Errei ou ficou incompleto</button></div>`;
    $("#auto-acerto").onclick = () => assessShort(q, true, text);
    $("#auto-erro").onclick = () => assessShort(q, false, text);
  }

  async function assessShort(q, correct, text) {
    if ($("#auto-acerto").disabled) return;
    $("#auto-acerto").disabled = true;
    $("#auto-erro").disabled = true;
    const attempt = await recordAttempt(q, correct, text);
    const f = $("#feedback");
    f.classList.add(correct ? "ok" : "erro");
    f.insertAdjacentHTML("beforeend", feedbackActions(attempt.id));
    wireFeedbackActions(attempt.id);
    await stats();
  }

  function feedbackActions(attemptId) {
    return `<div class="pa-confidence"><span>Como você respondeu?</span><button class="pa-secondary confidence" data-value="certeza" data-attempt="${attemptId}">Tive certeza</button><button class="pa-secondary confidence" data-value="duvida" data-attempt="${attemptId}">Estava em dúvida</button><button class="pa-secondary confidence" data-value="chute" data-attempt="${attemptId}">Chutei / arrisquei</button></div><div class="pa-actions"><button id="continuar" class="pa-primary">Próxima questão</button></div>`;
  }

  function showFeedback(q, correct, attempt) {
    const f = $("#feedback");
    f.className = "pa-feedback show " + (correct ? "ok" : "erro");
    f.innerHTML = `<strong>${correct ? "Correto." : "Resposta incorreta."}</strong><p>${q.explanation}</p><p><a href="${content(q.contentId)?.url || "#"}">Rever conteúdo relacionado →</a></p>${feedbackActions(attempt.id)}`;
    wireFeedbackActions(attempt.id);
  }

  function wireFeedbackActions(attemptId) {
    $$(".confidence").forEach(b => b.onclick = () => setConfidence(attemptId, b.dataset.value));
    $("#continuar").onclick = () => { index++; renderQuestion(); };
  }

  async function setConfidence(attemptId, value) {
    const attempts = await all("attempts");
    const a = attempts.find(x => x.id === attemptId);
    if (!a) return;
    a.confidence = value;
    await put("attempts", a);
    $$(".confidence").forEach(b => {
      b.classList.toggle("selecionada-conf", b.dataset.value === value);
    });
  }

  async function finish() {
    const answered = sessionRecords.length;
    const correctCount = sessionRecords.filter(r => r.correct).length;
    const pct = answered ? Math.round(correctCount / answered * 100) : 0;
    const endedAt = new Date().toISOString();

    await put("sessions", {
      id: uid("S"),
      mode: sessionMode,
      startedAt: sessionStartedAt,
      endedAt,
      planned: current.length,
      answered,
      correct: correctCount,
      percentage: pct,
      questionIds: sessionRecords.map(r => r.questionId)
    });

    $("#sessao").innerHTML = `<div class="pa-box pa-summary"><h2>Sessão concluída</h2><div class="pa-grid pa-grid-summary"><div class="pa-card"><strong>${answered}</strong><span>respondidas</span></div><div class="pa-card"><strong>${correctCount}</strong><span>acertos</span></div><div class="pa-card"><strong>${answered - correctCount}</strong><span>erros</span></div><div class="pa-card"><strong>${answered ? pct + "%" : "—"}</strong><span>aproveitamento</span></div></div><p>Seu histórico e a próxima revisão foram atualizados localmente.</p><div class="pa-actions"><button class="pa-primary" id="nova">Voltar ao painel</button><button class="pa-secondary" id="ver-erros">Abrir Caderno de Erros</button></div></div>`;

    $("#nova").onclick = () => {
      $("#sessao").hidden = true;
      window.scrollTo({top:0,behavior:"smooth"});
    };
    $("#ver-erros").onclick = () => activateTab("erros");
    await stats();
  }

  function activateTab(name) {
    $$(".pa-tab").forEach(x => x.classList.toggle("ativo", x.dataset.tab === name));
    $$(".pa-painel").forEach(x => x.classList.remove("ativo"));
    $("#painel-" + name).classList.add("ativo");
    $("#sessao").hidden = true;
    window.scrollTo({top:0, behavior:"smooth"});
  }

  function setupTabs() {
    $$(".pa-tab").forEach(b => b.onclick = () => activateTab(b.dataset.tab));
  }

  async function exportBackup() {
    const payload = {
      type: "notas-direito-pratica-backup",
      version: 1,
      exportedAt: new Date().toISOString(),
      dataVersion: D.version,
      attempts: await all("attempts"),
      mastery: await all("mastery"),
      sessions: await all("sessions")
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pratica-ativa-backup-" + new Date().toISOString().slice(0,10) + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function importBackup(file) {
    const text = await file.text();
    const payload = JSON.parse(text);
    if (payload?.type !== "notas-direito-pratica-backup" || !Array.isArray(payload.attempts) || !Array.isArray(payload.mastery) || !Array.isArray(payload.sessions)) {
      throw new Error("Arquivo de backup inválido.");
    }
    if (!confirm("A restauração substituirá o histórico local atual da Prática Ativa. Deseja continuar?")) return;

    for (const store of ["attempts","mastery","sessions"]) await clear(store);
    for (const item of payload.attempts) await put("attempts", item);
    for (const item of payload.mastery) await put("mastery", item);
    for (const item of payload.sessions) await put("sessions", item);
    await stats();
    alert("Backup restaurado com sucesso.");
  }

  async function init() {
    await openDB();
    setupTabs();
    renderContents();
    populateFilters();

    $("#btn-revisao").onclick = async () => start(await buildDailyQueue(), "daily");

    $("#btn-treino").onclick = () => {
      const disc = $("#f-disciplina").value;
      const tema = $("#f-tema").value;
      const orig = $("#f-origem").value;
      const qtd = Math.max(1, Math.min(30, Number($("#f-qtd").value) || 10));
      const list = D.questions.filter(q => {
        const n = node(q.primaryNode);
        return (!disc || n?.disciplina === disc) &&
               (!tema || n?.tema === tema) &&
               (!orig || q.origin === orig);
      }).slice(0, qtd);
      start(list, "free");
    };

    $("#exportar-progresso").onclick = exportBackup;
    $("#importar-progresso").onclick = () => $("#arquivo-backup").click();
    $("#arquivo-backup").onchange = async e => {
      const file = e.target.files?.[0];
      if (!file) return;
      try { await importBackup(file); }
      catch (err) { alert(err.message || "Não foi possível restaurar o backup."); }
      e.target.value = "";
    };

    await stats();
  }

  init().catch(err => {
    console.error(err);
    document.querySelector(".pa-wrap").insertAdjacentHTML("beforeend", '<div class="pa-empty">Não foi possível iniciar o banco local de prática. Recarregue a página.</div>');
  });
})();