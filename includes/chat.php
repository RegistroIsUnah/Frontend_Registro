<!--Coniene lo del chat-->

<div id="chatPanel" class="chat-panel">
    <div class="chat-header">
      <h3>Chats</h3>
      <button onclick="toggleChatPanel()">&times;</button>
    </div>

    <div class="chat-tabs">
      <button class="tab-button active" onclick="openTab('individual')">Individuales</button>
      <button class="tab-button" onclick="openTab('group')">Grupales</button>
    </div>

    <div class="chat-buscar">
      <input type="text" id="chatSearch" placeholder="Buscar chats..." oninput="filtrarChat()">
    </div>

    <!-- Chats individuales -->
    <div id="individual" class="chat-tab-content active">
      <div class="chat-item">
        <img src="" alt="Usuario 1">
        <div class="chat-info">
          <p>Juan Perez</p>
          <small>Hola, ¿cómo estás?</small>
        </div>
        <span class="chat-time">10:30 AM</span>
      </div>
      <div class="chat-item">
        <img src="" alt="Usuario 2">
        <div class="chat-info">
          <p>Maria Lopez</p>
          <small>¿Vas a la clase hoy?</small>
        </div>
        <span class="chat-time">Ayer</span>
      </div>
    </div>

    <!-- Chats grupales -->
    <div id="group" class="chat-tab-content">
      <div class="chat-item">
        <img src="" alt="Grupo 1">
        <div class="chat-info">
          <p>Grupo Matemáticas</p>
          <small>Ana: Revisen el ejercicio 5</small>
        </div>
        <span class="chat-time">12:45 PM</span>
      </div>
      <div class="chat-item">
        <img src="" alt="Grupo 2">
        <div class="chat-info">
          <p>Grupo Programacion</p>
          <small>Maria: Hola</small>
        </div>
        <span class="chat-time">10:40 PM</span>
      </div>
    </div>

    <!-- Botones de acciones -->
    <div class="chat-actions">
      
      <button onclick="listaContactos()">Contactos</button>
      
      <button>Crear Grupo</button>
      <button onclick="solicitudContacto()()">Enviar Solicitud</button>

    </div>
  </div>
  