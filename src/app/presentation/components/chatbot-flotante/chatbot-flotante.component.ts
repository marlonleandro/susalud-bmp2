import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot-flotante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Botón flotante -->
    <button class="chatbot-toggle-btn" (click)="toggleChatbot()" [class.active]="isOpen">
      <span class="bot-icon" *ngIf="!isOpen">🤖</span>
      <span class="close-icon" *ngIf="isOpen">✕</span>
    </button>

    <!-- Ventana del chatbot -->
    <div class="chatbot-window" [class.open]="isOpen">
      <div class="chatbot-header">
        <div class="header-content">
          <span class="bot-avatar">🤖</span>
          <div class="header-text">
            <h3>Asistente IA</h3>
            <p>Estamos atendiendo 24/7</p>
          </div>
        </div>
        <button class="close-btn" (click)="toggleChatbot()">✕</button>
      </div>

      <div class="chatbot-body">
        <div class="chat-messages" #messagesContainer>
          <!-- Mensaje inicial del bot -->
          <div class="message bot">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
              <p>¡Hola! 👋</p>
              <p>Mi nombre es AliciA. ¿Cómo puedo ayudarte hoy?</p>
              <span class="message-time">{{ getCurrentTime() }}</span>
            </div>
          </div>

          <!-- Mensajes del usuario y bot -->
          <ng-container *ngFor="let msg of mensajes">
            <div class="message" [class.user]="msg.tipo === 'user'" [class.bot]="msg.tipo === 'bot'">
              <div class="message-avatar" *ngIf="msg.tipo === 'bot'">🤖</div>
              <div class="message-content">
                <p>{{ msg.texto }}</p>
                <span class="message-time">{{ msg.hora }}</span>
              </div>
              <div class="message-avatar" *ngIf="msg.tipo === 'user'">👤</div>
            </div>
          </ng-container>

          <!-- Indicador de escritura -->
          <div class="message bot" *ngIf="isTyping">
            <div class="message-avatar">🤖</div>
            <div class="message-content typing">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <input 
            type="text" 
            [(ngModel)]="mensajeActual" 
            (keyup.enter)="enviarMensaje()"
            placeholder="Ingresa tu pregunta..."
            [disabled]="isTyping">
          <button (click)="enviarMensaje()" [disabled]="!mensajeActual.trim() || isTyping">
            <span class="send-icon">➤</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Botón flotante */
    .chatbot-toggle-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(180deg, #0EA6F1 0%, #568FDD 100%);
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .chatbot-toggle-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
    }

    .chatbot-toggle-btn.active {
      background: linear-gradient(180deg, #0EA6F1 0%, #568FDD 100%);
    }

    .bot-icon, .close-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Ventana del chatbot */
    .chatbot-window {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 400px;
      height: 600px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: all 0.3s ease;
      z-index: 999;
      overflow: hidden;
    }

    .chatbot-window.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    /* Header */
    .chatbot-header {
      background: linear-gradient(180deg, #0EA6F1 0%, #568FDD 100%);
      color: white;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bot-avatar {
      font-size: 32px;
    }

    .header-text h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .header-text p {
      margin: 4px 0 0 0;
      font-size: 12px;
      opacity: 0.9;
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* Body */
    .chatbot-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .chat-messages::-webkit-scrollbar {
      width: 6px;
    }

    .chat-messages::-webkit-scrollbar-track {
      background: #f1f5f9;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }

    .chat-messages::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    /* Mensajes */
    .message {
      display: flex;
      gap: 10px;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .message.bot {
      justify-content: flex-start;
    }

    .message.user {
      justify-content: flex-end;
    }

    .message-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .message-content {
      max-width: 70%;
      padding: 12px 16px;
      border-radius: 12px;
      position: relative;
    }

    .message.bot .message-content {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px 12px 12px 4px;
    }

    .message.user .message-content {
      background: linear-gradient(180deg, #0EA6F1 0%, #568FDD 100%);
      color: white;
      border-radius: 12px 12px 4px 12px;
    }

    .message-content p {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }

    .message-content p + p {
      margin-top: 8px;
    }

    .message-time {
      display: block;
      font-size: 11px;
      margin-top: 6px;
      opacity: 0.7;
    }

    .message.user .message-time {
      text-align: right;
    }

    /* Indicador de escritura */
    .message-content.typing {
      padding: 16px;
    }

    .typing-indicator {
      display: flex;
      gap: 4px;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #94a3b8;
      animation: typing 1.4s infinite;
    }

    .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.7;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }

    /* Input */
    .chat-input {
      display: flex;
      padding: 16px;
      background: white;
      border-top: 1px solid #e2e8f0;
      gap: 8px;
    }

    .chat-input input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      font-size: 14px;
      transition: border-color 0.2s;
    }

    .chat-input input:focus {
      outline: none;
      border-color: #667eea;
    }

    .chat-input input:disabled {
      background: #f8fafc;
      cursor: not-allowed;
    }

    .chat-input button {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(180deg, #0EA6F1 0%, #568FDD 100%);
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .chat-input button:hover:not(:disabled) {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .chat-input button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .send-icon {
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .chatbot-window {
        width: calc(100vw - 32px);
        height: calc(100vh - 140px);
        right: 16px;
        bottom: 90px;
      }

      .chatbot-toggle-btn {
        right: 16px;
        bottom: 16px;
      }
    }

    @media (max-width: 480px) {
      .chatbot-window {
        width: 100vw;
        height: 100vh;
        right: 0;
        bottom: 0;
        border-radius: 0;
      }

      .chatbot-window.open {
        transform: translateY(0) scale(1);
      }

      .chatbot-toggle-btn {
        bottom: 20px;
        right: 20px;
      }
    }
  `]
})
export class ChatbotFlotanteComponent {
  isOpen = false;
  mensajeActual = '';
  mensajes: Array<{ texto: string; tipo: 'user' | 'bot'; hora: string }> = [];
  isTyping = false;

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  }

  enviarMensaje() {
    if (this.mensajeActual.trim() && !this.isTyping) {
      // Agregar mensaje del usuario
      this.mensajes.push({
        texto: this.mensajeActual,
        tipo: 'user',
        hora: this.getCurrentTime()
      });

      const mensajeUsuario = this.mensajeActual;
      this.mensajeActual = '';

      // Simular que el bot está escribiendo
      this.isTyping = true;

      // Scroll al final
      setTimeout(() => this.scrollToBottom(), 100);

      // Respuesta del bot después de 1-2 segundos
      setTimeout(() => {
        this.mensajes.push({
          texto: 'Gracias por tu consulta. Estoy procesando tu solicitud...',
          tipo: 'bot',
          hora: this.getCurrentTime()
        });
        this.isTyping = false;
        setTimeout(() => this.scrollToBottom(), 100);
      }, 1500);
    }
  }

  private scrollToBottom() {
    const messagesContainer = document.querySelector('.chat-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
}
