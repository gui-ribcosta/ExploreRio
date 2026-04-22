# 🌴 Explore Rio — Viva o Rio Além do Óbvio

<p align="center">
  <img src="./assets/images/explore_rio.png" alt="Banner Explore Rio" width="100%" style="border-radius: 15px;">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Vers%C3%A3o%20Premium-0f9d58?style=for-the-badge" alt="Status Badge">
  <img src="https://img.shields.io/badge/Tecnologia-Vanilla%20JS-facc15?style=for-the-badge" alt="JS Badge">
  <img src="https://img.shields.io/badge/UX-Mobile%20First-6366f1?style=for-the-badge" alt="UX Badge">
</p>

---

## 📖 Sobre o Projeto

O **Explore Rio** não é apenas um guia turístico; é uma plataforma inteligente e imersiva desenhada para quem deseja explorar o estado do Rio de Janeiro com eficiência e estilo. Unindo um design sofisticado (Glassmorphism) a um motor de planejamento lógico, o projeto ajuda usuários a descobrirem desde os ícones mundiais até os refúgios mais bem guardados da Costa Verde e Região Serrana.

---

## ✨ Funcionalidades Principais

| Recurso | Descrição |
| :--- | :--- |
| **🔍 Descoberta Inteligente** | Filtros avançados por região, orçamento, duração e estilo de passeio (Romântico, Histórico, etc). |
| **📅 Planner Engine** | Algoritmo que organiza seus locais favoritos em um roteiro lógico de até 3 dias. |
| **💎 Design Premium** | Interface moderna com efeitos de vidro, micro-animações e foco total na experiência do usuário. |
| **📱 Mobile Ready** | Navegação otimizada para smartphones com menu inferior inteligente e layout fluido. |
| **🌍 Localização Rica** | Curadoria de dados que inclui história, pontos fortes e recomendações reais para cada local. |

---

## 🛠️ Arquitetura do Sistema

O projeto foi construído seguindo o princípio de **Data-Driven UI**, onde a interface é gerada dinamicamente a partir de um banco de dados estruturado.

### O Fluxo de Navegação
1.  **Landing Page**: Introdução imersiva e acesso rápido às principais seções.
2.  **Explorar**: Vitrine dinâmica que consome o `data.js` para filtrar e exibir pontos turísticos em tempo real.
3.  **Planner**: O "Cérebro" do site. Você escolhe locais, define preferências e o sistema gera o roteiro.

### Estrutura de Pastas
```text
📂 Explore Rio
 ┣ 📂 assets       # Imagens de fundo e fotos dos locais
 ┣ 📂 scripts      # Lógica do motor de busca, filtros e i18n
 ┃ ┣ 📜 data.js    # 🧠 Banco de dados central dos locais
 ┃ ┗ 📜 planner.js # ⚙️ Lógica do algoritmo de itinerário
 ┣ 📂 style        # CSS Modular para cada seção (Hero, Cards, Nav)
 ┣ 📜 index.html   # Home Page
 ┣ 📜 explore.html # Página de Descoberta
 ┗ 📜 planner.html # Ferramenta de Itinerário
```

---

## ⚙️ Customização e Expansão

O **Explore Rio** é 100% expansível. Para adicionar novos destinos, você só precisa editar o arquivo `scripts/data.js`.

```javascript
// Cada novo local segue este padrão:
{
  nome: "Novo Local",
  categorias: ["natural", "cultura"],
  regiao: "zona-sul",
  preco: 0, // 0 para gratuito
  detalhes: {
    historia: "Breve relato histórico...",
    recomendacoes: ["Dica 1", "Dica 2"]
  }
}
```

---

## 🚀 Tecnologias Utilizadas

O stack tecnológico prioriza performance e ausência de dependências pesadas (Vanilla Stack):

*   **HTML5 & CSS3**: Uso intensivo de Flexbox, CSS Grid e Variáveis para consistência visual.
*   **JavaScript ES6+**: Manipulação de DOM, Módulos, Fetch API e Filtragem de Arrays.
*   **Font Awesome 6**: Ícones vetoriais modernos.
*   **Google Fonts**: Tipografia premium (Inter e Montserrat).

---

## 📦 Como Iniciar

1.  Clone este repositório.
2.  Certifique-se de que a estrutura de pastas está preservada.
3.  Para a melhor experiência, abra o `index.html` usando um servidor local (como a extensão **Live Server** do VSCode) para garantir o funcionamento correto dos módulos JavaScript.

---

## 👨‍💻 Autor

**Guilherme Ribeiro**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guiribcosta/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/gui_ribcosta)
[![Portfolio](https://img.shields.io/badge/Portfolio-facc15?style=for-the-badge&logo=appveyor&logoColor=black)](https://guilherme-ribeiro.vercel.app)

---

> "Explorar o Rio de Janeiro é descobrir uma nova história a cada esquina. Este projeto é o meu guia para que você nunca perca o melhor dessa jornada." 🇧🇷
