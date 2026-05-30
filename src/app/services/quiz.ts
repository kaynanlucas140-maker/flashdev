import { Injectable } from '@angular/core';

export interface Pergunta {
  categoria: string;
  tema: string;
  q: string;
  a: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private temaSelecionado: string = '';
  private perguntasRodada: Pergunta[] = [];
  private pontuacao: number = 0;

  private dbPerguntas: Pergunta[] = [
    { categoria: "HTML // ESTRUTURA", tema: "html-theme", q: "Para que serve a tag semântica <code>&lt;main&gt;</code>?", a: "Ela envelopa o <strong>conteúdo principal</strong> e exclusivo da página. Usá-la ajuda os motores de busca (SEO) e leitores de tela a mapearem o site." },
    { categoria: "HTML // HIPERLINK", tema: "html-theme", q: "Qual atributo inserimos na tag <code>&lt;a&gt;</code> para definir o destino de um link?", a: "É o atributo <code>href</code> (Hypertext Reference). Sem ele, o navegador não sabe para onde direcionar o usuário ao clicar." },
    { categoria: "HTML // ARQUITETURA", tema: "html-theme", q: "Qual a diferença visual padrão entre uma <code>&lt;div&gt;</code> e um <code>&lt;span&gt;</code>?", a: "A <code>&lt;div&gt;</code> é do tipo <strong>block</strong> (ocupa toda a largura e quebra linha). O <code>&lt;span&gt;</code> é <strong>inline</strong> (ocupa só o espaço do texto)." },
    { categoria: "HTML // ACESSIBILIDADE", tema: "html-theme", q: "Para que serve o atributo <code>alt</code> na tag <code>&lt;img&gt;</code>?", a: "Serve para fornecer uma <strong>descrição textual</strong> da imagem. É crucial para leitores de tela (acessibilidade) e se a imagem falhar ao carregar." },
    { categoria: "HTML // CONFIGURAÇÃO", tema: "html-theme", q: "Qual é a utilidade da tag <code>&lt;meta charset='UTF-8'&gt;</code>?", a: "Define a <strong>codificação de caracteres</strong> do documento, garantindo que o navegador exiba corretamente acentos, cedilhas e símbolos especiais." },
    { categoria: "HTML // ORGANIZAÇÃO", tema: "html-theme", q: "Qual a diferença entre as tags <code>&lt;section&gt;</code> e <code>&lt;article&gt;</code>?", a: "A tag <code>&lt;section&gt;</code> agrupa conteúdos relacionados por um tema genérico, enquanto o <code>&lt;article&gt;</code> representa um bloco <strong>independente e autoexplicativo</strong> (ex: um post de blog)." },
    { categoria: "HTML // LISTAS", tema: "html-theme", q: "Qual a diferença prática entre as tags <code>&lt;ul&gt;</code> e <code>&lt;ol&gt;</code>?", a: "A tag <code>&lt;ul&gt;</code> gera uma lista <strong>não ordenada</strong> (com marcadores de ponto), e a tag <code>&lt;ol&gt;</code> cria uma lista <strong>ordenada numericamente</strong>." },
    { categoria: "HTML // NAVEGAÇÃO", tema: "html-theme", q: "O que faz o atributo <code>target='_blank'</code> em um link?", a: "Força o navegador a abrir o link de destino em uma <strong>nova aba</strong> ou janela, mantendo o usuário no seu site original." },
    { categoria: "HTML // FORMULÁRIOS", tema: "html-theme", q: "O que faz a tag <code>&lt;form&gt;</code> e qual a importância do seu atributo <code>action</code>?", a: "Ela delimita uma área de <strong>coleta de dados</strong> do usuário. O atributo <code>action</code> define o endereço (URL) para onde esses dados serão enviados." },
    { categoria: "HTML // TOPO DO SITE", tema: "html-theme", q: "Para que serve a tag semântica <code>&lt;header&gt;</code>?", a: "Representa o <strong>cabeçalho de introdução</strong> de uma página ou seção, contendo normalmente títulos, logotipos, barras de pesquisa ou menus de navegação." },

    { categoria: "CSS // ALINHAMENTO", tema: "css-theme", q: "O que acontece quando aplicamos <code>display: flex</code> em um elemento?", a: "Ativa o <strong>Flexbox</strong> no elemento pai, permitindo alinhar, centralizar e distribuir os blocks filhos com comandos simples de eixo." },
    { categoria: "CSS // BOX MODEL", tema: "css-theme", q: "Qual a diferença prática entre <code>margin</code> e <code>padding</code>?", a: "O <code>margin</code> cria espaçamento do lado de <strong>fora</strong> da borda do elemento. O <code>padding</code> cria espaçamento interno, do lado de <strong>dentro</strong>." },
    { categoria: "CSS // ESTILIZAÇÃO", tema: "css-theme", q: "Como criamos o efeito de 'Brilho Neon' usando a propriedade <code>box-shadow</code>?", a: "Definimos um raio de desfoque (blur) alto e aplicamos uma cor neon vibrante no parâmetro de cor (ex: <code>box-shadow: 0 0 20px #00f0ff</code>)." },
    { categoria: "CSS // ADAPTAÇÃO", tema: "css-theme", q: "Para que serve a regra <code>@media</code> no arquivo de estilização?", a: "Serve para injetar <strong>Media Queries</strong>, permitindo aplicar estilos e regras de design sob medida dependendo da largura física da tela (Responsividade)." },
    { categoria: "CSS // POSICIONAMENTO", tema: "css-theme", q: "O que faz a propriedade <code>position: absolute</code>?", a: "Remove o elemento do fluxo normal da página e posiciona-o de forma rígida em relação ao seu <strong>ancestral posicionado</strong> mais próximo (com position relative, por exemplo)." },
    { categoria: "CSS // INTERAÇÃO", tema: "css-theme", q: "Como funciona a pseudo-classe <code>:hover</code>?", a: "Aplica estilos específicos a um elemento apenas quando o usuário passa o <strong>ponteiro do mouse</strong> por cima dele." },
    { categoria: "CSS // BOX MODEL", tema: "css-theme", q: "Qual o impacto de configurar <code>box-sizing: border-box</code>?", a: "Garante que o <code>padding</code> e a <code>border</code> sejam incluídos no cálculo da largura e altura totais declaradas para o elemento, evitando quebras de layout." },
    { categoria: "CSS // CAMADAS VIRTUAIS", tema: "css-theme", q: "O que determina a propriedade <code>z-index</code>?", a: "Controla a <strong>ordem de empilhamento vertical</strong> de elementos posicionados. Elementos com maior valor numérico ficam sobrepostos à frente dos outros." },
    { categoria: "CSS // UNIDADES DE MEDIDA", tema: "css-theme", q: "Qual a diferença entre as unidades de tamanho <code>em</code> e <code>rem</code>?", a: "A unidade <code>em</code> é relativa ao tamanho da fonte do seu <strong>elemento pai</strong>. A unidade <code>rem</code> é estritamente relativa ao tamanho da fonte do <strong>elemento raiz</strong> (tag html)." },
    { categoria: "CSS // FLEXBOX", tema: "css-theme", q: "Para que serve o comando <code>justify-content: center</code>?", a: "Alinha e centraliza os elementos filhos ao longo do <strong>eixo principal</strong> do contêner Flexbox (na horizontal, caso flex-direction seja row)." },

    { categoria: "JS // MEMÓRIA", tema: "js-theme", q: "Qual a diferença entre criar uma variável com <code>let</code> e com <code>const</code>?", a: "Variáveis criadas com <code>let</code> podem sofrer reatribuição de valores no script. Constantes criadas com <code>const</code> são imutáveis após declaradas." },
    { categoria: "JS // ACESSO DO DOM", tema: "js-theme", q: "Como o JavaScript consegue 'capturar' um elemento nativo do HTML pelo ID?", a: "Utilizando a chamada global de interface de documento: <code>document.getElementById('id-do-elemento')</code>." },
    { categoria: "JS // INTERAÇÃO", tema: "js-theme", q: "O que faz a função de gatilho de classe <code>classList.toggle('active')</code>?", a: "Ela lê o elemento: se a classe <code>'active'</code> não estiver ativa, ela insere; se já estiver ativa na tag, ela remove automaticamente." },
    { categoria: "JS // FUNÇÕES", tema: "js-theme", q: "O que é uma <code>Arrow Function</code> e qual a sua vantagem?", a: "É uma sintaxe moderna e curta para escrever funções usando <code>() =&gt; {}</code>. Além de compacta, ela não cria o seu próprio contexto para a palavra-chave <code>this</code>." },
    { categoria: "JS // MANIPULAÇÃO", tema: "js-theme", q: "Para que serve o método de arrays <code>.map()</code>?", a: "Percorre todos os itens de um array original e devolve um <strong>novo array</strong> com as modificações processadas pela função de retorno." },
    { categoria: "JS // ARQUITETURA", tema: "js-theme", q: "O que significa dizer que o JavaScript é uma linguagem 'Single-Threaded'?", a: "Significa que possui apenas um único fluxo (linha) de execução principal, executando um único bloco de código ou comando de cada vez." },
    { categoria: "JS // COMPARAÇÕES", tema: "js-theme", q: "Qual a diferença crucial entre usar <code>==</code> e <code>===</code>?", a: "O operador <code>==</code> compara apenas os valores (fazendo conversão implícita de tipos). O operador <code>===</code> faz uma comparação estrita, checando valor e tipo." },
    { categoria: "JS // ASSÍNCRONO", tema: "js-theme", q: "Como funciona uma <code>Promise</code> no JavaScript?", a: "Representa um objeto que guarda a promessa de um valor futuro (que pode ser resolvido com sucesso ou rejeitado com erro), ideal para requisições de rede." },
    { categoria: "JS // CONVERSÕES", tema: "js-theme", q: "O que faz a função utilitária <code>JSON.stringify()</code>?", a: "Pega um objeto ou array do JavaScript e converte-o diretamente em uma <strong>string formatada em texto puro JSON</strong>." },
    { categoria: "JS // EVENTOS", tema: "js-theme", q: "Para que serve a função <code>addEventListener()</code>?", a: "Anexa uma função que fica à 'escuta' de um <strong>evento disparado pelo usuário</strong> (como um clique, digitação ou scroll) em um determinado elemento HTML." },

    { categoria: "GIT // INICIALIZAÇÃO", tema: "git-theme", q: "Qual é o comando Git utilizado para criar um repositório local vazio?", a: "É o comando <code>git init</code>. Ele cria a pasta oculta <code>.git</code> que começa a monitorar todas as alterações desse diretório." },
    { categoria: "GIT // PREPARAÇÃO", tema: "git-theme", q: "Para que serve o comando <code>git add .</code>?", a: "Envia todas as modificações, arquivos novos ou exclusões da pasta atual diretamente para o palco de preparação (<strong>Staging Area</strong>)." },
    { categoria: "GIT // HISTÓRICO", tema: "git-theme", q: "O que faz na prática o comando <code>git commit -m 'mensagem'</code>?", a: "Grava de forma permanente e imutável as alterações preparadas no histórico local, anexando uma mensagem que descreve o que foi feito." },
    { categoria: "GIT // ECOSSISTEMA", tema: "git-theme", q: "Qual a diferença conceitual entre o Git e o GitHub?", a: "O <strong>Git</strong> é a ferramenta de versionamento que roda localmente na sua máquina. O <strong>GitHub</strong> é o serviço na nuvem que hospeda os seus repositórios Git." },
    { categoria: "GIT // ENVIO", tema: "git-theme", q: "Qual comando usamos para enviar os commits locais para o servidor na nuvem?", a: "Utilizamos o comando <code>git push</code> (geralmente acompanhado da branch e origem, como <code>git push origin main</code>)." },
    { categoria: "GIT // ATUALIZAÇÃO", tema: "git-theme", q: "O que faz o comando <code>git pull</code>?", a: "Faz o download das alterações mais recentes que estão no repositório remoto e funde-as (merge) imediatamente com o seu código local." },
    { categoria: "GIT // RAMIFICAÇÃO", tema: "git-theme", q: "O que é uma Branch (ramo) no ecossistema Git?", a: "É uma <strong>linha de desenvolvimento paralela</strong>. Permite programar novas funcionalidades ou testar códigos sem arriscar quebrar a versão principal (main)." },
    { categoria: "GIT // NAVEGAÇÃO", tema: "git-theme", q: "Como você cria e muda para uma nova branch com um único comando?", a: "Utilizando o comando atalho <code>git checkout -b nome-da-branch</code> (ou na versão mais recente: <code>git switch -c nome-da-branch</code>)." },
    { categoria: "GIT // INTEGRAÇÃO", tema: "git-theme", q: "O que acontece ao rodar o comando <code>git merge recurso</code>?", a: "O Git tenta trazer e unificar todo o histórico e linhas de código da branch 'recurso' para dentro da branch onde você está posicionado no momento." },
    { categoria: "GITHUB // REVISÃO", tema: "git-theme", q: "O que é um Pull Request (PR) na plataforma GitHub?", a: "É uma solicitação formal enviada à equipe de um projeto para que eles revisem e aprovm a integração das suas alterações de código no ramo principal." },

    { categoria: "IONIC // ARQUITETURA", tema: "ionic-theme", q: "Qual é o papel do Capacitor Framework em um projeto Ionic?", a: "O <strong>Capacitor</strong> funciona como a ponte nativa. Ele converte o seu app web e permite acessar APIs do smartphone como Câmera, GPS e Armazenamento." },
    { categoria: "ANGULAR // ESTRUTURA", tema: "ionic-theme", q: "O que constitui essencialmente um Componente no Angular?", a: "Constitui a unidade visual do app. É composto por uma classe TypeScript (lógica), uma página HTML (estrutura) e folhas de estilo CSS/SCSS." },
    { categoria: "ANGULAR // DIRETIVAS", tema: "ionic-theme", q: "Para que serve a diretiva estrutural <code>*ngIf</code>?", a: "Serve para remover ou adicionar dinamicamente um elemento no HTML da página baseado no resultado verdadeiro ou falso de uma variável lógica." },
    { categoria: "ANGULAR // DIRETIVAS", tema: "ionic-theme", q: "Como opera a diretiva estrutural <code>*ngFor</code>?", a: "Funciona como um ciclo de repetição (loop foreach). Ela repete o elemento HTML para cada item contido dentro de um array de dados do TypeScript." },
    { categoria: "ANGULAR // COMUNICAÇÃO", tema: "ionic-theme", q: "Qual a diferença entre os decoradores <code>@Input()</code> e <code>@Output()</code>?", a: "O <code>@Input()</code> permite que um componente pai envie dados para o filho. O <code>@Output()</code> permite que o filho emita eventos de aviso para o pai." },
    { categoria: "IONIC // ROTEAMENTO", tema: "ionic-theme", q: "Para que serve a tag <code>&lt;ion-router-outlet&gt;</code>?", a: "Funciona como um contêner de navegação dinâmico do Ionic, determinando o local exato da tela onde o Angular Router vai injetar as páginas solicitadas." },
    { categoria: "ANGULAR // ARQUITETURA", tema: "ionic-theme", q: "O que faz a anotação <code>@Injectable()</code> (Services) no Angular?", a: "Define uma classe como um Serviço. É ideal para centralizar chamadas a APIs ou regras de negócio que precisam ser compartilhadas por vários componentes." },
    { categoria: "ANGULAR // DADOS", tema: "ionic-theme", q: "O que significa o conceito de Two-Way Data Binding (<code>[(ngModel)]</code>)?", a: "Significa sincronização bidirecional em tempo real. Qualquer alteração feita em um campo de texto no HTML altera o TypeScript, e vice-versa." },
    { categoria: "IONIC // CICLO DE VIDA", tema: "ionic-theme", q: "Quando é disparado o gatilho nativo <code>ionViewWillEnter</code>?", a: "É disparado pelo Ionic sempre que uma determinada página está prestes a entrar em foco e se tornar a tela visível e ativa para o usuário." },
    { categoria: "IONIC // CLI", tema: "ionic-theme", q: "Qual comando do terminal usamos para criar uma nova página em um projeto Ionic?", a: "Usamos o comando do CLI: <code>ionic generate page nome-da-pagina</code>. Ele gera os arquivos TypeScript, HTML, SCSS e injeta as rotas automaticamente." }
  ];

  constructor() {}

  iniciarRodada(tema: string) {
    this.temaSelecionado = tema;
    this.pontuacao = 0;

    const perguntasFiltradas = this.dbPerguntas.filter(p => p.tema === tema);

    const embaralhadas = [...perguntasFiltradas];
    for (let i = embaralhadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [embaralhadas[i], embaralhadas[j]] = [embaralhadas[j], embaralhadas[i]];
    }

    this.perguntasRodada = embaralhadas.slice(0, 10);
  }

  getPerguntasRodada(): Pergunta[] {
    return this.perguntasRodada;
  }

  getTemaSelecionado(): string {
    return this.temaSelecionado;
  }

  incrementarPontuacao() {
    this.pontuacao++;
  }

  getPontuacao(): number {
    return this.pontuacao;
  }
}