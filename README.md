# ⚡ FlashDev - Flashcards Quiz (Comic Edition)

Este é um miniaplicativo mobile educativo, responsivo e altamente interativo desenvolvido para auxiliar programadores iniciantes na memorização e fixação de conceitos técnicos fundamentais. O projeto une uma arquitetura moderna a uma estética visual marcante no estilo **Neobrutalista / Comic Book** (histórias em quadrinhos), contando com cores vibrantes, bordas grossas e sombras projetadas.

## 🔗 Links Úteis
* 🌐 **Acesse o aplicativo publicado:** [Clique aqui para visualizar o projeto](https://kaynanlucas140-maker.github.io/flashdev/)
* 💻 **Código-fonte:** [Repositório no GitHub](https://github.com/kaynanlucas140-maker/flashdev)

---

## 🚀 Funcionalidades
* **Estética Comic/Neobrutalista:** Identidade visual inspirada em histórias em quadrinhos, utilizando tipografia de impacto, bordas pretas grossas de `5px` e sombras sólidas deslocadas.
* **Banca de Revistas (Seleção de Assuntos):** Tela inicial onde o usuário escolhe dinamicamente qual deck de conhecimento deseja enfrentar (HTML5, CSS3, JavaScript, Git & GitHub ou Ionic & Angular).
* **Efeito Flip 3D Realista:** Flashcards interativos com rotação mecânica tridimensional no eixo Y (utilizando CSS Perspective) para revelar a resposta técnica ao clique.
* **Gamificação & Autoavaliação:** Sistema inteligente que altera os botões de navegação ao virar a carta, permitindo ao usuário votar se já dominava o conceito ("Eu sabia! 👍" ou "Não sabia 👎"), acumulando pontos de verdade.
* **Relatório de Missão (Patentes de Programador):** Tela final de resultados que calcula o desempenho e atribui classificações personalizadas recheadas de emojis divertidos (Estagiário Bugador 🪲, Dev Júnior 🌱, Dev Pleno 😎 ou Dev Sênior Lendário 👑).
* **Algoritmo Randomizer (Shuffle):** O aplicativo filtra o tema selecionado e realiza um embaralhamento aleatório (Fisher-Yates) extraindo exatamente 10 cartas por rodada, tornando o estudo dinâmico e não repetitivo.

---

## 🛠️ Tecnologias Utilizadas
O projeto foi construído utilizando um ecossistema de desenvolvimento robusto, modular e escalável:

* **Ionic Framework:** Estrutura de componentes de interface otimizados para mobile-first e casca híbrida altamente responsiva.
* **Angular (Componentes Standalone):** Arquitetura SPA moderna, controle de rotas dinâmicas com *Lazy Loading* e diretivas estruturais nativas (`*ngIf` e `*ngFor`).
* **TypeScript:** Tipagem estática forte para garantir a consistência e segurança dos dados (utilizando interfaces dedicadas para o banco de perguntas).
* **Angular Services (QuizService):** Centralização de todas as regras de negócio do quiz, gerenciamento de estado dos pontos e lógica de filtragem/sorteio das 50 perguntas oficiais.
* **SCSS / CSS3 Avançado:** Manipulação de perspectiva 3D, propriedades `backface-visibility`, filtros de contorno de texto com `-webkit-text-stroke` e sombras customizadas.
* **GitHub Pages & GH-Pages Module:** Compilação automatizada da pasta de produção e deploy direto em um servidor em nuvem gratuito.

---

## 🔧 Como rodar o projeto localmente

Se quiser testar, rodar ou modificar este aplicativo no seu computador, siga os passos abaixo:

1. Certifique-se de ter o **Node.js** e o **Ionic CLI** instalados globalmente (`npm install -g @ionic/cli`).
2. Clone o repositório ou baixe o código-fonte:
```bash
git clone [https://github.com/kaynanlucas140-maker/flashdev.git](https://github.com/kaynanlucas140-maker/flashdev.git)
