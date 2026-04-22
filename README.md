# 🌴 Explore Rio — Viva o Rio Além do Óbvio

![Banner Explore Rio](./assets/images/explore_rio.png)

> **Explore Rio** é uma plataforma interativa e inteligente projetada para transformar a experiência turística no estado do Rio de Janeiro. De praias icônicas a tesouros escondidos, o projeto oferece uma interface premium para descobrir e planejar roteiros personalizados.

---

## ✨ Funcionalidades Principais

*   **🔍 Descoberta Inteligente**: Navegue por uma curadoria rica de pontos turísticos com filtros avançados por região, categoria, preço e duração.
*   **📅 Planejador de Itinerários**: Um motor lógico que gera roteiros otimizados (até 3 dias) com base nas suas preferências e locais favoritos.
*   **📱 Experiência Mobile Premium**: Menu de navegação moderno (glassmorphism) e design totalmente responsivo para uso em qualquer lugar.
*   **❤️ Sistema de Favoritos**: Salve seus locais desejados para facilitar o planejamento posterior.
*   **🛡️ Segurança e Performance**: Implementação de headers de segurança (CSP, X-Frame) e otimização de carregamento de imagens (Lazy Loading).

---

## 🛠️ Como o Projeto Funciona?

O ecossistema do **Explore Rio** é dividido em três pilares principais:

1.  **Explorar**: Uma vitrine dinâmica onde você pode filtrar locais por estilo (Romântico, Histórico, Econômico) e categorias.
2.  **Detalhes**: Modais imersivos que apresentam a história, pontos fortes/fracos e recomendações reais para cada destino.
3.  **Planejador**: Uma ferramenta onde você escolhe seus locais favoritos e o sistema organiza um roteiro lógico, considerando o tempo de visita e o orçamento.

---

## ⚙️ Guia de Customização

O projeto foi construído para ser facilmente expansível. Toda a "inteligência" e o conteúdo do site residem em um único local:

### Alterando Conteúdo
Edite o arquivo `scripts/data.js` para:
- Adicionar novos pontos turísticos.
- Atualizar preços, fotos e descrições.
- Modificar as dicas e recomendações que aparecem nos modais.

```javascript
// Exemplo de estrutura no data.js
{
  nome: "Cristo Redentor",
  categorias: ["famosos", "cultura"],
  preco: 80,
  imagem: "assets/places/cristo.jpg",
  detalhes: {
    historia: "Inaugurado em 1931...",
    pontosFortes: ["Vista única", "Acesso fácil"],
    // ...
  }
}
```

---

## 🚀 Tecnologias Utilizadas

O stack tecnológico foca em performance nativa e design moderno:

*   **Estrutura**: HTML5 Semântico.
*   **Estilização**: CSS3 Modular (Variáveis, Flexbox, Grid).
*   **Lógica**: JavaScript ES6+ (Módulos, Dynamic Rendering).
*   **Segurança**: Meta Security Headers (CSP, Frame Protection).
*   **Ícones**: Font Awesome 6.5.0.

---

## 📦 Como rodar o projeto localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/explore-rio.git
   ```
2. Abra o arquivo `index.html` diretamente no seu navegador ou use uma extensão como o *Live Server*.

---

## 👨‍💻 Autor

**Guilherme Ribeiro**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guiribcosta/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/gui_ribcosta)

---

> "O Rio de Janeiro continua lindo... e agora muito mais fácil de explorar." 🇧🇷
