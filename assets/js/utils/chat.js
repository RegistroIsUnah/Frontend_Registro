export function toggleChatPanel() {
  const chatPanel = document.getElementById('chatPanel');
  if (chatPanel) {
    chatPanel.classList.toggle('active');
  }
}

function openTab(tabName) {
  document.querySelectorAll('.chat-tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  document.getElementById(tabName).classList.add('active');

  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });
  document.querySelector(`[onclick="openTab('${tabName}')"]`)?.classList.add('active');
}

function listaContactos() {
  alert('Aquí se abriría la lista de contactos.');
}

function solicitudContacto() {
  alert('Aquí se abriría el formulario para enviar solicitudes.');
}

function filtrarChat() {
  const searchText = document.getElementById('chatSearch')?.value.toLowerCase();
  const chatItems = document.querySelectorAll('.chat-item');

  chatItems.forEach(chat => {
    const chatName = chat.querySelector('.chat-info p').textContent.toLowerCase();
    chat.style.display = chatName.includes(searchText) ? 'flex' : 'none';
  });
}

// ✅ Enganchar el botón de chat al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const btnToggle = document.getElementById("chatToggle");
  if (btnToggle) {
    btnToggle.addEventListener("click", toggleChatPanel);
  }
});