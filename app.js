/**
 * Célula Esperança — Teste de Temperamentos
 * Lógica da Aplicação, Navegação por Estado, Apuração e Exportação
 */

(function () {
  'use strict';

  // Estado da Sessão
  const state = {
    screen: 'intro', // 'intro', 'instructions', 'quiz', 'result'
    step: 1, // 1: Quente vs Frio, 2: Úmido vs Seco
    questionIdx: 0,
    answers: {
      etapa1: {}, // id: 'Quente' | 'Frio'
      etapa2: {}  // id: 'Úmido' | 'Seco'
    },
    calculatedResult: null
  };

  // Referências DOM
  const elements = {
    screens: {
      intro: document.getElementById('screen-intro'),
      instructions: document.getElementById('screen-instructions'),
      quiz: document.getElementById('screen-quiz'),
      result: document.getElementById('screen-result')
    },
    header: document.getElementById('app-header'),
    btnResetHeader: document.getElementById('btn-reset-header'),
    btnStartIntro: document.getElementById('btn-start-intro'),
    btnStartStep1: document.getElementById('btn-start-step1'),
    stageBadge: document.getElementById('stage-badge'),
    progressText: document.getElementById('progress-text'),
    progressBarFill: document.getElementById('progress-bar-fill'),
    stageTitle: document.getElementById('stage-title'),
    stageSubtitle: document.getElementById('stage-subtitle'),
    questionNumberBadge: document.getElementById('question-number-badge'),
    questionTitle: document.getElementById('question-title'),
    optionA: document.getElementById('option-a'),
    optionB: document.getElementById('option-b'),
    optionTextA: document.getElementById('option-text-a'),
    optionTextB: document.getElementById('option-text-b'),
    validationNotice: document.getElementById('validation-notice'),
    btnPrev: document.getElementById('btn-prev'),
    btnNext: document.getElementById('btn-next'),
    resultContainer: document.getElementById('result-content'),
    btnShare: document.getElementById('btn-share'),
    btnPdf: document.getElementById('btn-pdf'),
    btnRestart: document.getElementById('btn-restart'),
    modalReset: document.getElementById('modal-reset'),
    btnModalConfirm: document.getElementById('btn-modal-confirm'),
    btnModalCancel: document.getElementById('btn-modal-cancel'),
    toast: document.getElementById('toast-msg')
  };

  // Inicialização
  function init() {
    bindEvents();
    setupHistorySync();

    const hash = window.location.hash.replace('#', '');
    if (hash === 'quiz') {
      navigateTo('quiz', false);
      renderCurrentQuestion();
    } else if (hash === 'instructions') {
      navigateTo('instructions', false);
    } else if (hash === 'result' && state.calculatedResult) {
      navigateTo('result', false);
    } else {
      navigateTo('intro', false);
    }
  }

  // Eventos
  function bindEvents() {
    elements.btnStartIntro.addEventListener('click', () => navigateTo('instructions'));
    elements.btnStartStep1.addEventListener('click', () => {
      state.step = 1;
      state.questionIdx = 0;
      navigateTo('quiz');
      renderCurrentQuestion();
    });

    elements.optionA.addEventListener('click', () => selectOption('A'));
    elements.optionB.addEventListener('click', () => selectOption('B'));

    elements.btnPrev.addEventListener('click', handlePrevious);
    elements.btnNext.addEventListener('click', handleNext);

    elements.btnResetHeader.addEventListener('click', openResetModal);
    elements.btnRestart.addEventListener('click', openResetModal);
    elements.btnModalCancel.addEventListener('click', closeResetModal);
    elements.btnModalConfirm.addEventListener('click', () => {
      closeResetModal();
      resetAllAnswers();
      navigateTo('intro');
      showToast('O teste foi reiniciado com sucesso.');
    });

    elements.btnShare.addEventListener('click', handleShareResult);
    elements.btnPdf.addEventListener('click', handleGeneratePdf);
  }

  // Navegação e Histórico
  function navigateTo(screenId, pushHistory = true) {
    state.screen = screenId;

    Object.keys(elements.screens).forEach((key) => {
      const screenEl = elements.screens[key];
      if (screenEl) {
        if (key === screenId) {
          screenEl.classList.add('active');
        } else {
          screenEl.classList.remove('active');
        }
      }
    });

    // Controla botão de reiniciar no cabeçalho
    if (elements.btnResetHeader) {
      elements.btnResetHeader.style.display = (screenId === 'intro') ? 'none' : 'inline-flex';
    }

    if (pushHistory) {
      window.history.pushState({ screen: screenId, step: state.step, qIdx: state.questionIdx }, '', '#' + screenId);
    }

    if (screenId === 'quiz') {
      renderCurrentQuestion();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setupHistorySync() {
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.screen) {
        state.screen = e.state.screen;
        if (e.state.step) state.step = e.state.step;
        if (typeof e.state.qIdx === 'number') state.questionIdx = e.state.qIdx;
        navigateTo(e.state.screen, false);
        if (e.state.screen === 'quiz') {
          renderCurrentQuestion();
        }
      } else {
        navigateTo('intro', false);
      }
    });
  }

  // Lógica do Questionário
  function getCurrentStageData() {
    return state.step === 1 ? TEST_DATA.etapa1 : TEST_DATA.etapa2;
  }

  function getCurrentQuestion() {
    const stage = getCurrentStageData();
    return stage.questions[state.questionIdx];
  }

  function renderCurrentQuestion() {
    const stage = getCurrentStageData();
    const q = getCurrentQuestion();
    const totalInStage = stage.questions.length;
    const globalQNumber = state.step === 1 ? (state.questionIdx + 1) : (TEST_DATA.etapa1.questions.length + state.questionIdx + 1);

    // Contexto de cabeçalho da etapa
    if (elements.stageBadge) elements.stageBadge.textContent = `Etapa ${state.step} de 2`;
    if (elements.stageTitle) elements.stageTitle.textContent = stage.title;
    if (elements.stageSubtitle) elements.stageSubtitle.textContent = stage.subtitle;

    // Progresso
    const progressPercent = Math.round(((state.questionIdx) / totalInStage) * 100);
    if (elements.progressText) elements.progressText.textContent = `Pergunta ${state.questionIdx + 1} de ${totalInStage}`;
    if (elements.progressBarFill) elements.progressBarFill.style.width = `${progressPercent}%`;

    // Questão
    if (elements.questionNumberBadge) elements.questionNumberBadge.textContent = `Item ${globalQNumber} de ${TEST_DATA.info.totalQuestions}`;
    if (elements.questionTitle) elements.questionTitle.textContent = q.text;
    if (elements.optionTextA) elements.optionTextA.textContent = q.optionA.label;
    if (elements.optionTextB) elements.optionTextB.textContent = q.optionB.label;

    // Verificar se já foi respondida
    const savedAnswer = getAnswerForQuestion(state.step, q.id);
    elements.optionA.classList.toggle('selected', savedAnswer === q.optionA.value);
    elements.optionB.classList.toggle('selected', savedAnswer === q.optionB.value);

    // Validação limpa
    elements.validationNotice.classList.remove('visible');

    // Botão Voltar
    if (state.step === 1 && state.questionIdx === 0) {
      elements.btnPrev.textContent = 'Instruções';
    } else {
      elements.btnPrev.textContent = 'Anterior';
    }

    // Botão Próximo
    const isLastInStep = state.questionIdx === totalInStage - 1;
    if (isLastInStep) {
      elements.btnNext.textContent = state.step === 1 ? 'Concluir Etapa 1' : 'Ver Meu Resultado';
    } else {
      elements.btnNext.textContent = 'Próxima';
    }
  }

  function selectOption(optionChoice) {
    const q = getCurrentQuestion();
    const val = optionChoice === 'A' ? q.optionA.value : q.optionB.value;
    const stageKey = state.step === 1 ? 'etapa1' : 'etapa2';
    state.answers[stageKey][q.id] = val;

    elements.optionA.classList.toggle('selected', optionChoice === 'A');
    elements.optionB.classList.toggle('selected', optionChoice === 'B');
    elements.validationNotice.classList.remove('visible');

    // Vibração tátil sutil em dispositivos móveis compatíveis
    if (navigator.vibrate) {
      try {
        navigator.vibrate(25);
      } catch (e) {
        // Ignora silenciosamente se bloqueado por permissão
      }
    }
  }

  function getAnswerForQuestion(step, questionId) {
    const stageKey = step === 1 ? 'etapa1' : 'etapa2';
    return state.answers[stageKey][questionId];
  }

  function handlePrevious() {
    if (state.questionIdx > 0) {
      state.questionIdx--;
      renderCurrentQuestion();
    } else if (state.step === 2) {
      // Volta para a última questão da Etapa 1
      state.step = 1;
      state.questionIdx = TEST_DATA.etapa1.questions.length - 1;
      renderCurrentQuestion();
    } else {
      navigateTo('instructions');
    }
  }

  function handleNext() {
    const q = getCurrentQuestion();
    const answer = getAnswerForQuestion(state.step, q.id);

    if (!answer) {
      elements.validationNotice.classList.add('visible');
      elements.validationNotice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    const stage = getCurrentStageData();
    const isLastInStep = state.questionIdx === stage.questions.length - 1;

    if (!isLastInStep) {
      state.questionIdx++;
      renderCurrentQuestion();
    } else {
      // Concluiu etapa
      if (state.step === 1) {
        state.step = 2;
        state.questionIdx = 0;
        showToast('Etapa 1 concluída! Iniciando Etapa 2.');
        renderCurrentQuestion();
      } else {
        // Concluiu o teste todo!
        calculateAndDisplayResult();
      }
    }
  }

  // Apuração e Cálculo Rigoroso
  function calculateAndDisplayResult() {
    // Contagem Etapa 1: Quente vs Frio
    let countQuente = 0;
    let countFrio = 0;
    const answers1 = state.answers.etapa1;
    TEST_DATA.etapa1.questions.forEach((q) => {
      const ans = answers1[q.id];
      if (ans === 'Quente') countQuente++;
      else if (ans === 'Frio') countFrio++;
    });

    // Contagem Etapa 2: Úmido vs Seco
    let countUmido = 0;
    let countSeco = 0;
    const answers2 = state.answers.etapa2;
    TEST_DATA.etapa2.questions.forEach((q) => {
      const ans = answers2[q.id];
      if (ans === 'Úmido') countUmido++;
      else if (ans === 'Seco') countSeco++;
    });

    const isQuente = countQuente >= countFrio;
    const isUmido = countUmido > countSeco;
    const isSeco = countSeco > countUmido;
    const isEmpateUmidoSeco = countUmido === countSeco; // 6 x 6

    // Identificação do temperamento predominante
    let tempId = '';
    let isTie = false;

    if (isQuente) {
      if (isUmido) tempId = 'sanguineo';
      else if (isSeco) tempId = 'colerico';
      else {
        // Empate na Etapa 2 sendo Quente: Sanguíneo-Colérico
        tempId = 'sanguineo'; // Base principal com dupla manifestação
        isTie = true;
      }
    } else {
      // Frio
      if (isUmido) tempId = 'fleumatico';
      else if (isSeco) tempId = 'melancolico';
      else {
        // Empate na Etapa 2 sendo Frio: Fleumático-Melancólico
        tempId = 'fleumatico'; // Base principal com dupla manifestação
        isTie = true;
      }
    }

    const mainTemperament = TEST_DATA.temperamentos[tempId];

    // Detecção das nuances (subtipos conforme pág 11-13 do PDF)
    const activeNuances = [];
    const listNuances = TEST_DATA.nuances[tempId] || [];
    listNuances.forEach((item) => {
      if (item.cond(countQuente, countFrio, countUmido, countSeco)) {
        activeNuances.push(item);
      }
    });

    state.calculatedResult = {
      temperament: mainTemperament,
      tempId,
      isTie,
      scores: {
        quente: countQuente,
        frio: countFrio,
        umido: countUmido,
        seco: countSeco,
        total1: countQuente + countFrio,
        total2: countUmido + countSeco,
        percentQuente: Math.round((countQuente / 21) * 100),
        percentFrio: Math.round((countFrio / 21) * 100),
        percentUmido: Math.round((countUmido / 12) * 100),
        percentSeco: Math.round((countSeco / 12) * 100)
      },
      activeNuances
    };

    renderResultView(state.calculatedResult);
    navigateTo('result');
  }

  // Renderização da Tela de Resultado
  function renderResultView(res) {
    const t = res.temperament;
    const s = res.scores;

    // Gerador de Quadrante dos 4 Temperamentos em SVG
    // Eixo X: Úmido (-100) a Seco (+100)
    // Eixo Y: Frio (-100) a Quente (+100) (invertido no SVG onde Y cresce para baixo)
    const rawX = (s.seco - s.umido) / 12; // varia de -1 (muito úmido) a +1 (muito seco)
    const rawY = (s.quente - s.frio) / 21; // varia de +1 (muito quente) a -1 (muito frio)

    // Coordenadas no SVG 240x240 com centro em (120, 120)
    const svgCenterX = 120;
    const svgCenterY = 120;
    const radius = 90;
    const markerX = svgCenterX + (rawX * radius * 0.9);
    const markerY = svgCenterY - (rawY * radius * 0.9);

    const tieBannerHtml = res.isTie ? `
      <div class="nuance-banner" style="background:#FFF8E7; border-color:#E0A800; margin-bottom:18px;">
        <div class="nuance-title" style="color:#8A6500;">Equilíbrio na Etapa 2 (6 x 6)</div>
        <div class="nuance-desc">
          Você pontuou igualmente nas propriedades Úmida e Seca! Isso significa que você manifesta com grande equilíbrio as virtudes tanto do <strong>${t.name}</strong> quanto do seu temperamento irmão <strong>${t.id === 'sanguineo' ? 'Colérico' : 'Melancólico'}</strong>.
        </div>
      </div>
    ` : '';

    const nuancesHtml = res.activeNuances.length > 0 ? `
      <div class="section-block">
        <h3 class="section-heading">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          Nuances do Seu Perfil (Subtipo)
        </h3>
        <p style="font-size:0.88rem; color:var(--color-text-muted); margin-bottom:12px;">
          Conforme a teoria clássica apresentada no material de estudo, nenhum ser humano é 100% de uma só característica. Veja as nuances presentes na sua combinação:
        </p>
        ${res.activeNuances.map(n => `
          <div class="nuance-banner">
            <div class="nuance-title">${n.title}</div>
            <div class="nuance-desc">${n.text}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    const qualidadesHtml = t.qualidades.map(q => `
      <div class="trait-item">
        <div class="trait-title">${q.title}</div>
        <div class="trait-desc">${q.desc}</div>
      </div>
    `).join('');

    const pontosHtml = t.pontosAtencao.map(p => `
      <div class="trait-item">
        <div class="trait-title">${p.title}</div>
        <div class="trait-desc">${p.desc}</div>
      </div>
    `).join('');

    const amadurecimentoHtml = t.amadurecimento.map(item => `
      <li style="margin-bottom:8px; line-height:1.5;">${item}</li>
    `).join('');

    elements.resultContainer.innerHTML = `
      <div id="pdf-printable-area">
        <!-- Cabeçalho do Resultado -->
        <div class="result-card-header">
          <span class="result-badge-predominant">Temperamento Predominante</span>
          <h2 class="result-title">${t.name}</h2>
          <div class="result-element">${t.elementTitle}</div>
          <p class="result-motto">"${t.badge}"</p>
        </div>

        <div class="result-body">
          ${tieBannerHtml}

          <!-- Resumo Editorial -->
          <p style="font-size:1rem; line-height:1.65; color:var(--color-text); margin-bottom:20px;">
            ${t.summary}
          </p>

          <!-- Gráfico Visual de Quadrantes dos 4 Temperamentos -->
          <div class="quadrant-section">
            <div class="quadrant-title">Mapa dos 4 Temperamentos e Sua Posição</div>
            <div class="quadrant-box">
              <svg viewBox="0 0 240 240" style="width:100%; height:auto; overflow:visible;">
                <!-- Fundo do Círculo -->
                <circle cx="120" cy="120" r="100" fill="#F8FAF7" stroke="#E2DFD6" stroke-width="1.5" />
                
                <!-- Quadrante Sanguíneo (Top Left) -->
                <path d="M 120 120 L 120 20 A 100 100 0 0 0 20 120 Z" fill="${t.id === 'sanguineo' ? 'rgba(36, 59, 50, 0.12)' : 'transparent'}" />
                <!-- Quadrante Colérico (Top Right) -->
                <path d="M 120 120 L 220 120 A 100 100 0 0 0 120 20 Z" fill="${t.id === 'colerico' ? 'rgba(36, 59, 50, 0.12)' : 'transparent'}" />
                <!-- Quadrante Fleumático (Bottom Left) -->
                <path d="M 120 120 L 20 120 A 100 100 0 0 0 120 220 Z" fill="${t.id === 'fleumatico' ? 'rgba(36, 59, 50, 0.12)' : 'transparent'}" />
                <!-- Quadrante Melancólico (Bottom Right) -->
                <path d="M 120 120 L 120 220 A 100 100 0 0 0 220 120 Z" fill="${t.id === 'melancolico' ? 'rgba(36, 59, 50, 0.12)' : 'transparent'}" />

                <!-- Eixos Cruzados -->
                <line x1="120" y1="15" x2="120" y2="225" stroke="#343936" stroke-width="1.5" stroke-dasharray="3,3" />
                <line x1="15" y1="120" x2="225" y2="120" stroke="#343936" stroke-width="1.5" stroke-dasharray="3,3" />

                <!-- Rótulos dos Eixos -->
                <text x="120" y="12" text-anchor="middle" font-size="9" font-weight="700" fill="#243B32">QUENTE</text>
                <text x="120" y="235" text-anchor="middle" font-size="9" font-weight="700" fill="#243B32">FRIO</text>
                <text x="6" y="123" text-anchor="start" font-size="9" font-weight="700" fill="#243B32">ÚMIDO</text>
                <text x="234" y="123" text-anchor="end" font-size="9" font-weight="700" fill="#243B32">SECO</text>

                <!-- Nomes dos Quadrantes -->
                <text x="65" y="70" text-anchor="middle" font-size="9" font-weight="${t.id === 'sanguineo' ? '800' : '500'}" fill="${t.id === 'sanguineo' ? '#243B32' : '#888'}">Sanguíneo</text>
                <text x="175" y="70" text-anchor="middle" font-size="9" font-weight="${t.id === 'colerico' ? '800' : '500'}" fill="${t.id === 'colerico' ? '#243B32' : '#888'}">Colérico</text>
                <text x="65" y="175" text-anchor="middle" font-size="9" font-weight="${t.id === 'fleumatico' ? '800' : '500'}" fill="${t.id === 'fleumatico' ? '#243B32' : '#888'}">Fleumático</text>
                <text x="175" y="175" text-anchor="middle" font-size="9" font-weight="${t.id === 'melancolico' ? '800' : '500'}" fill="${t.id === 'melancolico' ? '#243B32' : '#888'}">Melancólico</text>

                <!-- Ponto do Participante -->
                <circle cx="${markerX.toFixed(1)}" cy="${markerY.toFixed(1)}" r="7" fill="#243B32" stroke="#FFFFFF" stroke-width="2.5" />
                <circle cx="${markerX.toFixed(1)}" cy="${markerY.toFixed(1)}" r="12" fill="none" stroke="#243B32" stroke-width="1" opacity="0.4" />
              </svg>
            </div>
          </div>

          <!-- Placar das Propriedades -->
          <div class="scores-grid">
            <div class="score-box">
              <div class="score-dimension">Quente vs Frio</div>
              <div class="score-val">${s.quente} × ${s.frio}</div>
              <div class="score-bar">
                <div class="score-bar-fill" style="width:${s.percentQuente}%;"></div>
              </div>
              <div style="font-size:0.75rem; color:var(--color-text-muted); margin-top:4px;">${s.percentQuente}% Quente</div>
            </div>

            <div class="score-box">
              <div class="score-dimension">Úmido vs Seco</div>
              <div class="score-val">${s.umido} × ${s.seco}</div>
              <div class="score-bar">
                <div class="score-bar-fill" style="width:${s.percentUmido}%;"></div>
              </div>
              <div style="font-size:0.75rem; color:var(--color-text-muted); margin-top:4px;">${s.percentUmido}% Úmido</div>
            </div>
          </div>

          <!-- Nuances / Subtipos -->
          ${nuancesHtml}

          <!-- Acordeões Interativos com Animações Fluidas -->
          <div class="result-accordions-group">
            
            <!-- 1. Na Célula Esperança (Destaque Aberto por Padrão) -->
            <details class="result-accordion-item" open>
              <summary class="accordion-trigger">
                <span class="accordion-trigger-left">
                  <span class="accordion-icon-box">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  </span>
                  <span class="accordion-title">Sua Atuação na Célula Esperança</span>
                </span>
                <span class="accordion-chevron">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 9l-7 7-7-7"/></svg>
                </span>
              </summary>
              <div class="accordion-content">
                <p style="font-size:0.95rem; line-height:1.65; color:var(--color-text); margin:0;">
                  ${t.convivenciaCelula}
                </p>
              </div>
            </details>

            <!-- 2. Forças e Qualidades Naturais -->
            <details class="result-accordion-item">
              <summary class="accordion-trigger">
                <span class="accordion-trigger-left">
                  <span class="accordion-icon-box">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </span>
                  <span class="accordion-title">Forças e Qualidades Naturais</span>
                </span>
                <span class="accordion-chevron">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 9l-7 7-7-7"/></svg>
                </span>
              </summary>
              <div class="accordion-content">
                <div class="traits-grid">
                  ${qualidadesHtml}
                </div>
              </div>
            </details>

            <!-- 3. Pontos de Atenção e Desafios -->
            <details class="result-accordion-item">
              <summary class="accordion-trigger">
                <span class="accordion-trigger-left">
                  <span class="accordion-icon-box">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  </span>
                  <span class="accordion-title">Pontos de Atenção e Desafios</span>
                </span>
                <span class="accordion-chevron">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 9l-7 7-7-7"/></svg>
                </span>
              </summary>
              <div class="accordion-content">
                <div class="traits-grid">
                  ${pontosHtml}
                </div>
              </div>
            </details>

            <!-- 4. Caminhos Práticos de Amadurecimento -->
            <details class="result-accordion-item">
              <summary class="accordion-trigger">
                <span class="accordion-trigger-left">
                  <span class="accordion-icon-box">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                  </span>
                  <span class="accordion-title">Caminhos Práticos de Amadurecimento</span>
                </span>
                <span class="accordion-chevron">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 9l-7 7-7-7"/></svg>
                </span>
              </summary>
              <div class="accordion-content">
                <ul style="padding-left:18px; font-size:0.92rem; color:var(--color-text); margin:0;">
                  ${amadurecimentoHtml}
                </ul>
              </div>
            </details>

          </div>

          <!-- Princípio Bíblico -->
          <div class="scripture-card">
            <div class="scripture-reference">Princípio Bíblico • ${t.reflexaoCrista.versiculo}</div>
            <div class="scripture-verse">"${t.reflexaoCrista.textoVersiculo}"</div>
            <div class="scripture-message">${t.reflexaoCrista.mensagem}</div>
          </div>

          <!-- Convite Especial para a Célula Esperança (Flyer) -->
          <div class="celula-invite-card">
            <div class="celula-invite-badge">Comunhão &amp; Crescimento</div>
            <h3 class="celula-invite-title">Venha nos visitar na Célula Esperança!</h3>
            <p class="celula-invite-desc">
              Você é nosso convidado de honra para viver momentos de fé, amizade sincera e edificação da Palavra de Deus. Será uma alegria imensa receber você e sua família!
            </p>
            
            <div class="celula-info-row">
              <span class="celula-info-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </span>
              <div class="celula-info-text">
                <strong>Sábado às 19:30h</strong>
                <span>Reunião de louvor, estudo e comunhão</span>
              </div>
            </div>

            <div class="celula-info-row">
              <span class="celula-info-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </span>
              <div class="celula-info-text">
                <strong>Rua Marieta Honorato de Oliveira, 68</strong>
                <span>Bairro Palmital — Santa Luzia / MG</span>
              </div>
            </div>

            <div class="celula-actions">
              <a href="https://www.google.com/maps/search/?api=1&query=Rua+Marieta+Honorato+de+Oliveira,+68+-+Palmital+-+Santa+Luzia" target="_blank" rel="noopener noreferrer" class="btn btn-invite-maps">
                <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span>Abrir no Google Maps</span>
              </a>
              <a href="https://wa.me/5531991835141?text=Ol%C3%A1%21%20Fiz%20o%20Teste%20de%20Temperamentos%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20C%C3%A9lula%20Esperan%C3%A7a." target="_blank" rel="noopener noreferrer" class="btn btn-invite-whatsapp">
                <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            <div class="celula-footer-tag">Batista Connect • Igreja em Células</div>
          </div>

          <!-- Nota de Esclarecimento Pastoral -->
          <div style="margin-top:24px; padding:16px; background:var(--color-bg); border-radius:var(--radius-sm); font-size:0.8rem; color:var(--color-text-muted); line-height:1.5;">
            <strong>Nota de reflexão:</strong> O temperamento descreve tendências e reflexos instintivos, mas não define os limites de quem você é em Deus. Pelo poder do Espírito Santo e pela prática do Evangelho em comunidade, todo discípulo de Cristo é capacitado a frutificar em mansidão, domínio próprio e santidade.
          </div>
        </div>
      </div>
    `;
  }

  // Compartilhamento
  async function handleShareResult() {
    if (!state.calculatedResult) return;
    const t = state.calculatedResult.temperament;
    const s = state.calculatedResult.scores;

    const shareText = `🕊️ *Meu Teste de Temperamento — Célula Esperança*\n\n` +
      `Descobri que meu temperamento predominante é o *${t.name.toUpperCase()}* (${t.elementTitle})!\n\n` +
      `✨ *Destaque:* ${t.badge}\n` +
      `📊 *Equilíbrio:* ${s.percentQuente}% Quente / ${s.percentFrio}% Frio • ${s.percentUmido}% Úmido / ${s.percentSeco}% Seco\n` +
      `📖 *Princípio Bíblico:* ${t.reflexaoCrista.versiculo}\n\n` +
      `Faça você também na Célula Esperança!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Resultado do Teste de Temperamento - ${t.name}`,
          text: shareText
        });
        showToast('Compartilhado com sucesso!');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Share cancelado ou erro:', err);
        }
      }
    }

    // Fallback: copiar para área de transferência
    copyToClipboard(shareText);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Resumo copiado para a área de transferência! Cole no WhatsApp.');
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('Resumo copiado! Cole no WhatsApp.');
    } catch (e) {
      showToast('Não foi possível copiar automaticamente.');
    }
    document.body.removeChild(tempInput);
  }

  // Geração de PDF Local
  function handleGeneratePdf() {
    const printableArea = document.getElementById('pdf-printable-area');
    if (!printableArea) {
      window.print();
      return;
    }

    showToast('Preparando seu PDF...');

    if (typeof html2pdf !== 'undefined') {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `Temperamento_${state.calculatedResult.temperament.name}_CelulaEsperanca.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      html2pdf().set(opt).from(printableArea).save().then(() => {
        showToast('PDF salvo com sucesso!');
      }).catch((err) => {
        console.error('Erro no html2pdf:', err);
        window.print();
      });
    } else {
      // Fallback para impressão nativa do navegador
      window.print();
    }
  }

  // Modal de Reiniciar
  function openResetModal() {
    elements.modalReset.classList.add('active');
  }

  function closeResetModal() {
    elements.modalReset.classList.remove('active');
  }

  function resetAllAnswers() {
    state.step = 1;
    state.questionIdx = 0;
    state.answers.etapa1 = {};
    state.answers.etapa2 = {};
    state.calculatedResult = null;
  }

  // Notificação Toast
  let toastTimer = null;
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    toastTimer = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 3200);
  }

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
