# Agro+

**Monitoramento da fertilidade do solo na palma da mão.**

O Agro+ é uma solução de agricultura de precisão que mede **Nitrogênio (N), Fósforo (P), Potássio (K) e umidade** direto no solo e mostra no celular se a terra está ruim, baixa, ideal, ótima ou excelente, inclusive sem internet no campo.

Este repositório reúne a parte web do projeto: a **landing page de vendas** e o **protótipo visual do sistema** (login, cadastro e dashboard).

> **Status:** protótipo em desenvolvimento. O hardware ainda está em fase de projeto e o sistema web ainda não tem back-end. Veja a seção [Avisos importantes](#avisos-importantes).

---

## Sumário

- [Avisos importantes](#avisos-importantes)
- [Sobre o projeto](#sobre-o-projeto)
- [O que existe neste repositório](#o-que-existe-neste-repositório)
- [Tecnologias](#tecnologias)
- [Requisitos](#requisitos)
- [Como rodar](#como-rodar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Onde editar o conteúdo](#onde-editar-o-conteúdo)
- [Scripts](#scripts)
- [Publicação (deploy)](#publicação-deploy)
- [Próximos passos](#próximos-passos)
- [Privacidade, LGPD e direito do consumidor](#privacidade-lgpd-e-direito-do-consumidor)
- [Créditos e licenças de terceiros](#créditos-e-licenças-de-terceiros)
- [Licença](#licença)

---

## Avisos importantes

- **Protótipo visual.** Login, cadastro e dashboard não têm banco de dados, autenticação, criptografia nem API. Nenhum dado digitado é enviado, salvo ou armazenado, nem no servidor nem no navegador (`localStorage`).
- **Dados ilustrativos.** Todos os números do dashboard e das telas do app na landing (umidade, NPK, leituras, fazendas, talhões) são exemplos fixos no código. Eles não vêm de sensores reais.
- **Complementa o laboratório, não substitui.** Sensores de NPK fornecem estimativas rápidas para acompanhamento contínuo, mas não substituem a análise laboratorial completa (Hartono et al., 2024).
- **Pré-venda.** O kit é oferecido em reserva ("Reservar meu kit"), atendida pelo WhatsApp. A landing não processa pagamentos.

---

## Sobre o projeto

O Agro+ nasceu do projeto de pesquisa aplicada **"Sistema Inteligente para Monitoramento da Fertilidade do Solo na Agricultura de Precisão utilizando IoT"**, desenvolvido no **Instituto Federal de Rondônia (IFRO), campus Ji-Paraná**.

### O problema

A análise de solo tradicional depende de coleta de amostras e envio para laboratório. O resultado demora dias ou semanas, custa caro e é feito poucas vezes por ano. Com isso, a adubação acaba sendo feita "no escuro": fertilizante demais em uma área e de menos em outra.

### A solução planejada

| Camada | Componente | Função |
|---|---|---|
| Campo | Sensor NPK + sensor de umidade (capacitivo) | Lê o solo |
| Coleta | Microcontrolador Arduino R4 Wi-Fi, bateria e caixa à prova d'água | Guarda as leituras, inclusive sem internet, e sincroniza quando o sinal volta |
| Nuvem | Banco de dados | Armazena o histórico das medições |
| Aplicação | Sistema web e mobile | Mostra os dados, os gráficos e a classificação do solo |

### Planos comerciais

| Plano | Preço | Inclui |
|---|---|---|
| Kit Agro+ | R$ 2.990,90 à vista (lançamento, de R$ 4.999,90) | Sensores, central de coleta, bateria, caixa, instalação e frete |
| Básico | R$ 49,90/mês | Coleta completa de N, P, K e umidade, mais o histórico |
| Pro | R$ 99,90/mês | Tudo do Básico, mais dashboards, gráficos e classificação do solo |
| Plus | R$ 149,90/mês | Tudo do Pro, mais até 10 fazendas ou áreas no mesmo painel |

---

## O que existe neste repositório

O repositório tem **dois projetos Next.js independentes**, cada um com suas próprias dependências e porta.

| Projeto | Pasta | Porta local | Rotas |
|---|---|---|---|
| Landing page | [`landing/`](landing/) | `3000` | `/` |
| Sistema (protótipo) | [`sistema/`](sistema/) | `3001` | `/` (redireciona para `/login`), `/login`, `/cadastro`, `/dashboard` |

### Fluxo entre os projetos

```
Landing (3000) ──"Entrar"──▶ Sistema /login (3001) ──enviar──▶ /dashboard
     ▲                                                              │
     └────────────────"Voltar ao site" / "Sair"─────────────────────┘
```

### Landing page (`landing/`)

Página única de vendas com estas seções: hero, proposta de valor, problema, benefícios (com telas ilustrativas do app), como funciona, planos e kit, objeções, avaliação gratuita, FAQ e chamada final. Todos os botões de compra abrem o WhatsApp com uma mensagem pronta.

### Sistema (`sistema/`)

- **`/login`:** e-mail e senha.
- **`/cadastro`:** nome, e-mail, telefone (com máscara) e senha, mais o aceite dos termos.
- **Validação só de formato:** o botão só é liberado quando o e-mail tem o formato `nome@dominio.ext`, o telefone tem 10 ou 11 dígitos, a senha tem pelo menos 6 caracteres e, no cadastro, os termos foram aceitos. Ao enviar, a pessoa é levada ao dashboard.
- **`/dashboard`:**
  - 4 cards (estado do solo, umidade, NPK e leituras do mês);
  - gráfico de barras de umidade semanal, com a faixa ideal;
  - gráfico de rosca de NPK;
  - histórico que alterna entre "Últimas leituras" e "Próximas ações";
  - barra lateral fixa no desktop, que vira gaveta no mobile.

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js](https://nextjs.org) (App Router) | 16.4.5 | Framework |
| [React](https://react.dev) | 19.3.0 | Interface |
| [TypeScript](https://www.typescriptlang.org) | 5 | Tipagem |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilos |
| [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com) | 4.23 / 1.9 | Botões, menus, gaveta, acordeão |
| [Recharts](https://recharts.org) (via shadcn Chart) | 3.8.0 | Gráficos do dashboard (só em `sistema/`) |
| [Motion](https://motion.dev) | 14.9.1 | Animações de entrada |
| [Lucide](https://lucide.dev) | 1.68.0 | Ícones |

---

## Requisitos

- **Node.js 20.9 ou superior**, versão mínima exigida pelo Next.js 16. O projeto foi desenvolvido com o Node.js 24.
- **npm**, o gerenciador de pacotes adotado no projeto.

---

## Como rodar

Clone o repositório e instale as dependências de cada projeto:

```bash
git clone <url-do-repositorio> agro-plus
cd agro-plus
npm install --prefix landing
npm install --prefix sistema
```

Suba os dois projetos, cada um em um terminal:

```bash
npm run dev --prefix landing
```

```bash
npm run dev --prefix sistema
```

Depois abra no navegador:

- Landing page: <http://localhost:3000>
- Sistema: <http://localhost:3001>

---

## Variáveis de ambiente

Em desenvolvimento nenhuma variável é necessária: os valores padrão apontam para `localhost`. Em produção, defina:

| Projeto | Variável | Exemplo | Para que serve |
|---|---|---|---|
| `landing` | `NEXT_PUBLIC_APP_URL` | `https://app.agroplus.com.br` | Destino do botão "Entrar" |
| `sistema` | `NEXT_PUBLIC_SITE_URL` | `https://agroplus.com.br` | Destino de "Voltar ao site", "Sair", "Termos" e "Ver os planos" |

Crie um arquivo `.env.local` dentro de cada pasta. Ele já é ignorado pelo Git.

---

## Estrutura de pastas

```
.
├── landing/                      # Landing page (porta 3000)
│   ├── public/images/            # Fotos das seções
│   └── src/
│       ├── app/                  # layout, página e estilos globais
│       ├── components/
│       │   ├── landing/          # Seções da página e telas ilustrativas do app
│       │   └── ui/               # Componentes shadcn/ui
│       └── lib/site.ts           # Preços, planos, kit, WhatsApp e URLs
│
└── sistema/                      # Sistema (porta 3001)
    ├── public/images/
    └── src/
        ├── app/
        │   ├── login/            # Tela de login
        │   ├── cadastro/         # Tela de cadastro
        │   └── dashboard/        # Dashboard
        ├── components/
        │   ├── auth/             # Layout, campos e formulários de acesso
        │   ├── brand/            # Logo e animações
        │   ├── dashboard/        # Barra lateral, cards, gráficos e histórico
        │   └── ui/               # Componentes shadcn/ui
        └── lib/config.ts         # URL da landing e WhatsApp
```

---

## Onde editar o conteúdo

| O que mudar | Arquivo |
|---|---|
| Preços do kit e dos planos, itens inclusos | [`landing/src/lib/site.ts`](landing/src/lib/site.ts) |
| Contador de kits no preço de lançamento | `KITS_RESTANTES` em [`landing/src/lib/site.ts`](landing/src/lib/site.ts). Atualize à mão a cada venda. |
| Número do WhatsApp | `WHATSAPP_NUMBER` em [`landing/src/lib/site.ts`](landing/src/lib/site.ts) e [`sistema/src/lib/config.ts`](sistema/src/lib/config.ts) |
| Textos das seções da landing | [`landing/src/components/landing/`](landing/src/components/landing/) |
| Valores dos cards do dashboard | [`sistema/src/components/dashboard/stat-cards.tsx`](sistema/src/components/dashboard/stat-cards.tsx) |
| Dados dos gráficos | Constante `dados` em [`umidade-chart.tsx`](sistema/src/components/dashboard/umidade-chart.tsx) e [`npk-chart.tsx`](sistema/src/components/dashboard/npk-chart.tsx) |
| Itens do histórico | [`sistema/src/components/dashboard/historico.tsx`](sistema/src/components/dashboard/historico.tsx) |
| Regras de formato dos formulários | [`sistema/src/components/auth/fields.tsx`](sistema/src/components/auth/fields.tsx) |

> No dashboard, os valores ficam escritos direto no JSX, por decisão de projeto. A única exceção são as listas dos gráficos, que o Recharts exige para desenhar.

---

## Scripts

Os mesmos scripts existem nos dois projetos. Rode com `npm run <script> --prefix <pasta>`.

| Script | O que faz |
|---|---|
| `dev` | Servidor de desenvolvimento (landing em 3000, sistema em 3001) |
| `build` | Gera a versão de produção |
| `start` | Serve a versão de produção na mesma porta do `dev` |
| `lint` | Verifica o código com o ESLint |

---

## Publicação (deploy)

Os dois projetos são publicados separadamente, por exemplo como dois projetos na Vercel, cada um apontando para sua pasta (*Root Directory* = `landing` ou `sistema`).

1. Defina as [variáveis de ambiente](#variáveis-de-ambiente) com os domínios finais.
2. Rode `npm run build` em cada pasta para conferir que o build passa.
3. Antes de divulgar, revise a seção [Privacidade, LGPD e direito do consumidor](#privacidade-lgpd-e-direito-do-consumidor).

---

## Próximos passos

Itens previstos no projeto de pesquisa que **ainda não estão implementados**:

- [ ] Firmware do módulo de coleta (Arduino R4 Wi-Fi com sensores NPK e de umidade)
- [ ] Armazenamento local offline e sincronização com a nuvem
- [ ] Banco de dados e API para receber as leituras
- [ ] Autenticação real (hash de senha, sessão e recuperação de conta)
- [ ] Dashboard com dados reais e as páginas Leituras, Fazendas e Configurações
- [ ] Suporte a várias fazendas (plano Plus)
- [ ] Aplicativo mobile
- [ ] Testes experimentais e validação do protótipo em ambiente controlado

---

## Privacidade, LGPD e direito do consumidor

### Situação atual

- A landing não tem formulários e não coleta dados pessoais. Os botões abrem o WhatsApp, um serviço de terceiros com a própria política de privacidade.
- Os formulários do sistema são só visuais: nenhum dado é enviado, salvo ou compartilhado.
- O projeto não usa cookies próprios, Pixel, Analytics nem qualquer outra ferramenta de rastreamento.

### Antes de ir para produção

- **Lei Geral de Proteção de Dados (Lei nº 13.709/2018).** Ao passar a coletar dados reais (nome, e-mail, telefone, localização da fazenda):
  - publique uma Política de Privacidade (o rodapé da landing já tem o link, ainda sem destino);
  - informe a finalidade e a base legal do tratamento;
  - garanta os direitos do titular (acesso, correção, exclusão);
  - armazene senhas apenas com hash forte.
- **Termos e Condições.** O cadastro exige o aceite dos termos, mas o documento ainda não existe: hoje o link aponta para a landing. Ele precisa ser redigido antes do lançamento.
- **Código de Defesa do Consumidor (Lei nº 8.078/1990).**
  - Vendas fora do estabelecimento comercial, como pelo WhatsApp, dão ao consumidor **7 dias para desistir** da compra (art. 49).
  - Produtos duráveis, como o kit, têm **garantia legal de 90 dias** (art. 26).
  - Na pré-venda, informe com clareza o prazo de entrega.
- **Ferramentas de rastreamento (Pixel, GA4).** Se forem adicionadas, exibem aviso de cookies e coletam consentimento quando necessário.
- **Afirmações de resultado.** A página não traz números de economia nem de produtividade. Só use esse tipo de número depois de medi-lo de verdade.

---

## Créditos e licenças de terceiros

### Pesquisa

Projeto de pesquisa aplicada **"Sistema Inteligente para Monitoramento da Fertilidade do Solo na Agricultura de Precisão utilizando IoT"**, Instituto Federal de Rondônia (IFRO), campus Ji-Paraná.

### Bibliotecas

| Biblioteca | Licença |
|---|---|
| Next.js, React, Tailwind CSS, shadcn/ui, Base UI, Recharts, Motion | MIT |
| Lucide | ISC |

### Fontes

- [Inter](https://fonts.google.com/specimen/Inter) e [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif), carregadas via `next/font`. Licença [SIL Open Font License 1.1](https://openfontlicense.org).

### Imagens

As fotos em `public/images/` vêm do [Unsplash](https://unsplash.com) e seguem a [Licença Unsplash](https://unsplash.com/license), que permite uso comercial gratuito. Elas são provisórias e devem ser trocadas por fotos reais do kit e de lavouras atendidas.

### Referência de design

O layout da landing foi inspirado na estrutura visual de um template comercial do Webflow (Catalis). Código, textos, telas do app e ícones foram escritos do zero para o Agro+. Nenhum arquivo, imagem ou código do template foi copiado.

---

## Licença

Este repositório ainda **não tem uma licença de código aberto**. Até que um arquivo `LICENSE` seja adicionado, vale a regra padrão do direito autoral (Lei nº 9.610/1998): **todos os direitos reservados** à equipe Agro+. Ninguém pode copiar, modificar ou distribuir este código sem autorização.

Como o projeto usa recursos e resultados de pesquisa do IFRO, confirme com o Núcleo de Inovação Tecnológica (NIT) do instituto as regras de titularidade e de exploração comercial previstas na Lei de Inovação (Lei nº 10.973/2004) e na política de inovação da instituição.

---

**Contato:** [WhatsApp (69) 99389-7171](https://wa.me/5569993897171)
