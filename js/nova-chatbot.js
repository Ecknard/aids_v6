/* ============================================
   AIDS — Chatbot Nova (moteur front-end, V2)
   ------------------------------------------
   Nova est désormais alimentée par un vrai modèle
   de langage (Claude), via la fonction serverless
   /api/nova.js. La clé API reste côté serveur,
   jamais exposée au navigateur.

   Repli local : si l'appel réseau échoue totalement
   (connexion coupée, etc.), on retombe sur une
   recherche par mots-clés dans js/nova-knowledge.js
   pour ne jamais laisser le visiteur sans réponse.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const launcher = document.getElementById('nova-launcher');
  const win = document.getElementById('nova-window');
  const messagesEl = document.getElementById('nova-messages');
  const form = document.getElementById('nova-form');
  const input = document.getElementById('nova-input');

  if (!launcher || !win || !messagesEl || !form || !input) return;

  const KB = window.NOVA_KNOWLEDGE || [];
  const SUGGESTIONS = window.NOVA_SUGGESTIONS || [];
  const OFFLINE_FALLBACK =
    window.NOVA_FALLBACK ||
    "Je n'arrive pas à me connecter en ce moment. Le plus sûr est d'utiliser notre formulaire de contact 🙂";

  let hasGreeted = false;
  let isWaiting = false;
  const conversationHistory = []; // [{role:'user'|'assistant', content:string}]

  const normalize = (str) =>
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function addTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'chat-msg bot typing';
    div.id = 'nova-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTypingIndicator() {
    document.getElementById('nova-typing')?.remove();
  }

  function addSuggestions() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg suggestions';
    SUGGESTIONS.forEach((s) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chat-suggestion-btn';
      btn.textContent = s.label;
      btn.addEventListener('click', () => handleUserMessage(s.label));
      wrap.appendChild(btn);
    });
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addContactLink() {
    const link = document.createElement('div');
    link.className = 'chat-msg bot';
    const a = document.createElement('a');
    a.href = '#contact';
    a.textContent = '📨 Ouvrir le formulaire de contact';
    a.style.color = 'var(--blue-bright)';
    a.style.fontWeight = '600';
    a.addEventListener('click', closeChat);
    link.appendChild(a);
    messagesEl.appendChild(link);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function greet() {
    if (hasGreeted) return;
    hasGreeted = true;
    addMessage("Bonjour, je suis Nova 👋 Je peux répondre à vos questions sur l'association (missions, dons, bénévolat, contact...). Comment puis-je vous aider ?", 'bot');
    addSuggestions();
  }

  /* ---- Repli local hors-ligne : recherche par mots-clés (utilisé seulement si le réseau échoue) ---- */
  function findLocalAnswer(rawText) {
    const text = normalize(rawText);
    let bestScore = 0;
    let bestAnswer = null;
    KB.forEach((entry) => {
      let score = 0;
      entry.keywords.forEach((kw) => {
        const nkw = normalize(kw);
        if (text.includes(nkw)) score += nkw.length; // mots-clés plus longs/spécifiques pèsent plus
      });
      if (score > bestScore) { bestScore = score; bestAnswer = entry.answer; }
    });
    return bestScore > 0 ? bestAnswer : null;
  }

  /* ---- Appel à Nova (backend LLM) ---- */
  async function askNova(text) {
    const response = await fetch('/api/nova', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: conversationHistory }),
    });

    if (!response.ok && response.status !== 429) {
      throw new Error(`Nova a répondu avec le statut ${response.status}`);
    }

    const data = await response.json();
    return data.reply || OFFLINE_FALLBACK;
  }

  async function handleUserMessage(text) {
    if (!text.trim() || isWaiting) return;
    addMessage(text, 'user');
    input.value = '';
    isWaiting = true;
    input.disabled = true;
    addTypingIndicator();

    let replyText;
    let usedOfflineFallback = false;

    try {
      replyText = await askNova(text);
    } catch (err) {
      console.error('Nova (API) indisponible, repli local :', err);
      replyText = findLocalAnswer(text);
      usedOfflineFallback = true;
      if (!replyText) replyText = OFFLINE_FALLBACK;
    }

    removeTypingIndicator();
    addMessage(replyText, 'bot');

    conversationHistory.push({ role: 'user', content: text });
    conversationHistory.push({ role: 'assistant', content: replyText });
    // On garde un historique raisonnable côté client aussi
    if (conversationHistory.length > 12) conversationHistory.splice(0, conversationHistory.length - 12);

    if (usedOfflineFallback && !findLocalAnswer(text)) {
      addContactLink();
    }

    isWaiting = false;
    input.disabled = false;
    input.focus();
  }

  function openChat() {
    win.classList.add('open');
    win.setAttribute('aria-hidden', 'false');
    win.removeAttribute('inert');
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', "Fermer l'assistant Nova");
    greet();
    setTimeout(() => input.focus(), 200);
  }

  function closeChat() {
    win.classList.remove('open');
    win.setAttribute('aria-hidden', 'true');
    win.setAttribute('inert', '');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', "Ouvrir l'assistant Nova");
  }

  launcher.addEventListener('click', () => {
    win.classList.contains('open') ? closeChat() : openChat();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserMessage(input.value);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && win.classList.contains('open')) closeChat();
  });
});
