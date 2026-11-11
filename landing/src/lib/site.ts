// Dados comerciais da LP. Atualize aqui e a página toda acompanha.

export const WHATSAPP_NUMBER = "5569993897171";

// Endereço do sistema (projeto separado). Em produção, defina NEXT_PUBLIC_APP_URL.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";

// Atualizar à mão a cada kit vendido no preço de lançamento.
export const KITS_RESTANTES = 10;
export const KITS_LANCAMENTO = 10;

export const KIT = {
  precoOriginal: "4.999,90",
  precoLancamento: "2.990,90",
  itens: [
    "Espeto com sensor NPK (Nitrogênio, Fósforo, Potássio)",
    "Sensor de umidade do solo",
    "Central de coleta com bateria",
    "Caixa à prova d'água",
    "Instalação feita pela nossa equipe",
    "Frete incluso",
  ],
};

export type Plano = {
  nome: string;
  preco: string;
  resumo: string;
  itens: string[];
  destaque?: boolean;
};

export const PLANOS: Plano[] = [
  {
    nome: "Básico",
    preco: "49,90",
    resumo: "Para começar a medir o solo.",
    itens: [
      "Coleta completa de N, P, K e umidade",
      "Histórico de todas as leituras",
      "Funciona sem internet",
      "Tutorial passo a passo",
    ],
  },
  {
    nome: "Pro",
    preco: "99,90",
    resumo: "Para decidir com clareza.",
    destaque: true,
    itens: [
      "Tudo do Básico",
      "Todos os dashboards e gráficos",
      "Classificação do solo: ruim a excelente",
      "Comparação com o valor ideal",
    ],
  },
  {
    nome: "Plus",
    preco: "149,90",
    resumo: "Para quem cuida de várias áreas.",
    itens: [
      "Tudo do Pro",
      "Até 10 fazendas ou áreas",
      "Todas as áreas no mesmo painel",
      "Use 1 kit ou vários, como preferir",
    ],
  },
];

export function whatsappLink(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}

export const CTA = {
  reservar: whatsappLink("Olá! Quero reservar meu kit Agro+."),
  verSolo: whatsappLink("Olá! Quero ver como o Agro+ mostra o meu solo."),
  avaliacao: whatsappLink("Olá! Quero agendar minha avaliação gratuita do Agro+."),
  plano: (nome: string) =>
    whatsappLink(`Olá! Quero reservar meu kit Agro+ com o plano ${nome}.`),
};
