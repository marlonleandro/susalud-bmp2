import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ia-module">
      <h2>Módulo de IA Aplicada</h2>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🤖</div>
          <h3>Clasificación Inteligente</h3>
          <p>Análisis automático de casos mediante NLP para identificar tipo y categoría</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-value">94%</span>
              <span class="stat-label">Precisión</span>
            </div>
            <div class="stat">
              <span class="stat-value">2.3s</span>
              <span class="stat-label">Tiempo promedio</span>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">⚠️</div>
          <h3>Alertas Predictivas</h3>
          <p>Predicción de riesgo de vencimiento y detección de casos complejos</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-value">87%</span>
              <span class="stat-label">Acierto</span>
            </div>
            <div class="stat">
              <span class="stat-value">12</span>
              <span class="stat-label">Alertas activas</span>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💬</div>
          <h3>Asistente Virtual</h3>
          <p>Chatbot para orientación al ciudadano y apoyo a especialistas</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-value">1,234</span>
              <span class="stat-label">Consultas</span>
            </div>
            <div class="stat">
              <span class="stat-value">4.5/5</span>
              <span class="stat-label">Satisfacción</span>
            </div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="info-card">
          <div class="info-icon">💬</div>
          <h3>Asistente Virtual Disponible</h3>
          <p>El chatbot de IA está disponible en todas las páginas del sistema. Haz clic en el botón flotante en la esquina inferior derecha para interactuar con el asistente.</p>
          <div class="info-features">
            <div class="feature-item">✓ Disponible 24/7</div>
            <div class="feature-item">✓ Respuestas instantáneas</div>
            <div class="feature-item">✓ Contexto del sistema</div>
          </div>
        </div>
      </div>

      <div class="analytics-section">
        <h3>Análisis de Casos con IA</h3>
        <div class="analytics-grid">
          <div class="analytics-card">
            <h4>Categorías Detectadas</h4>
            <div class="category-list">
              <div class="category-item">
                <span class="category-name">Intermediación</span>
                <div class="category-bar">
                  <div class="category-fill" style="width: 65%"></div>
                </div>
                <span class="category-value">65%</span>
              </div>
              <div class="category-item">
                <span class="category-name">Atención Médica</span>
                <div class="category-bar">
                  <div class="category-fill" style="width: 45%"></div>
                </div>
                <span class="category-value">45%</span>
              </div>
              <div class="category-item">
                <span class="category-name">Cobertura</span>
                <div class="category-bar">
                  <div class="category-fill" style="width: 30%"></div>
                </div>
                <span class="category-value">30%</span>
              </div>
            </div>
          </div>

          <div class="analytics-card">
            <h4>Sentimiento del Usuario</h4>
            <div class="sentiment-chart">
              <div class="sentiment-item positive">
                <span class="sentiment-icon">😊</span>
                <span class="sentiment-label">Positivo</span>
                <span class="sentiment-value">45%</span>
              </div>
              <div class="sentiment-item neutral">
                <span class="sentiment-icon">😐</span>
                <span class="sentiment-label">Neutral</span>
                <span class="sentiment-value">35%</span>
              </div>
              <div class="sentiment-item negative">
                <span class="sentiment-icon">😟</span>
                <span class="sentiment-label">Negativo</span>
                <span class="sentiment-value">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ia-module {
      max-width: 1400px;
      margin: 0 auto;
    }

    h2 {
      font-size: 28px;
      color: #1e293b;
      margin-bottom: 30px;
    }

    h3 {
      font-size: 20px;
      color: #1e293b;
      margin: 0 0 20px 0;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 30px;
    }

    .feature-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      text-align: center;
    }

    .feature-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .feature-card h3 {
      font-size: 18px;
      margin-bottom: 12px;
    }

    .feature-card p {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 20px;
    }

    .feature-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding-top: 20px;
      border-top: 1px solid #f1f5f9;
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #3b82f6;
    }

    .stat-label {
      font-size: 12px;
      color: #64748b;
    }

    .info-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .info-card {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
      border-radius: 12px;
      border: 2px dashed #667eea;
    }

    .info-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }

    .info-card h3 {
      font-size: 24px;
      color: #1e293b;
      margin-bottom: 12px;
    }

    .info-card p {
      color: #64748b;
      font-size: 16px;
      max-width: 600px;
      margin: 0 auto 24px;
      line-height: 1.6;
    }

    .info-features {
      display: flex;
      justify-content: center;
      gap: 24px;
      flex-wrap: wrap;
    }

    .feature-item {
      padding: 8px 16px;
      background: white;
      border-radius: 20px;
      font-size: 14px;
      color: #667eea;
      font-weight: 500;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .analytics-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .analytics-card {
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }

    .analytics-card h4 {
      font-size: 16px;
      color: #1e293b;
      margin: 0 0 16px 0;
    }

    .category-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .category-item {
      display: grid;
      grid-template-columns: 120px 1fr 60px;
      align-items: center;
      gap: 12px;
    }

    .category-name {
      font-size: 14px;
      color: #1e293b;
    }

    .category-bar {
      background: #f1f5f9;
      border-radius: 8px;
      height: 24px;
      overflow: hidden;
    }

    .category-fill {
      height: 100%;
      background: linear-gradient(90deg, #8b5cf6, #a78bfa);
      border-radius: 8px;
      transition: width 0.5s ease;
    }

    .category-value {
      text-align: right;
      font-weight: 600;
      color: #1e293b;
    }

    .sentiment-chart {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .sentiment-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
    }

    .sentiment-item.positive {
      background: #dcfce7;
    }

    .sentiment-item.neutral {
      background: #fef3c7;
    }

    .sentiment-item.negative {
      background: #fee2e2;
    }

    .sentiment-icon {
      font-size: 32px;
    }

    .sentiment-label {
      flex: 1;
      font-weight: 500;
      color: #1e293b;
    }

    .sentiment-value {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
    }

    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr;
      }

      .analytics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class IAComponent {
  // El chatbot ahora es un componente flotante global
}
