async function initChatbot() {
  // Load CSS dynamically
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'chatbot/chatbot.css';
  document.head.appendChild(link);

  const html = `
<button id="fab" onclick="togglePopup()" aria-label="Open AI Stylist">
  <svg class="icon-ai" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
  <svg class="icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
</button>

<div id="popup">
  <div class="popup-header">
    <div class="header-info">
      <div class="name">ESHINE AI Stylist</div>
      <div class="status"><span class="status-dot"></span>Online</div>
    </div>
    <button class="h-btn" onclick="togglePopup()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  </div>

  <div class="messages" id="messages">
    <div class="msg ai">
      <div class="msg-col">
        <div class="bubble">Hello! I'm your AI stylist. Looking for something specific from our new collection?</div>
        <div class="msg-time" id="init-time"></div>
      </div>
    </div>
  </div>

  <div class="suggestions" id="suggestions">
    <button class="chip" onclick="sendChip(this)">What's trending?</button>
    <button class="chip" onclick="sendChip(this)">Find a matching top</button>
    <button class="chip" onclick="sendChip(this)">Men's new arrivals</button>
  </div>

  <div class="input-row">
    <input id="chat-input" type="text" placeholder="Type a message..." onkeydown="if(event.key==='Enter') sendMessage()"/>
    <button class="send-btn" onclick="sendMessage()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    </button>
  </div>
</div>`;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  // Initialize JavaScript logic after HTML is injected
  setupChatbotLogic();
}

function setupChatbotLogic() {
  const fab = document.getElementById('fab');
  const popup = document.getElementById('popup');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('messages');
  const suggestions = document.getElementById('suggestions');
  const initTime = document.getElementById('init-time');

  let isOpen = false;

  if(initTime) {
    initTime.innerText = getTime();
  }

  // Bind toggle globally so inline onclick works, or just add event listeners
  window.togglePopup = function() {
    isOpen = !isOpen;
    popup.classList.toggle('open', isOpen);
    fab.classList.toggle('open', isOpen);
    if (isOpen && input) setTimeout(() => input.focus(), 350);
  };

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function addMessage(text, role) {
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + role;
    wrap.innerHTML = '<div class="msg-col"><div class="bubble">' + text + '</div><div class="msg-time">' + getTime() + '</div></div>';
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'msg ai';
    t.id = 'typing';
    t.innerHTML = '<div class="msg-col"><div class="bubble typing"><span></span><span></span><span></span></div></div>';
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
    return t;
  }

  const replies = [
    "I'd love to help! Our monochrome collection is very popular right now.",
    "Looking for a sleek new outfit? I can recommend our Vintage Denim line.",
    "That's a great question. We offer express shipping on all exclusive items.",
    "Let me check our inventory for that exact fit and style..."
  ];
  let replyIdx = 0;

  window.sendMessage = function() {
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    
    input.value = '';
    if(suggestions) suggestions.style.display = 'none';
    
    addMessage(text, 'user');
    const typing = showTyping();
    
    setTimeout(() => {
      typing.remove();
      addMessage(replies[replyIdx % replies.length], 'ai');
      replyIdx++;
    }, 1200 + Math.random() * 600);
  }

  window.sendChip = function(el) {
    if (!input) return;
    input.value = el.textContent;
    window.sendMessage();
  }
}

// Start chatbot initialization
initChatbot();
