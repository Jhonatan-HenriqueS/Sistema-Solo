import { CTA } from "@/lib/site";
import { CtaLink, Eyebrow, Heading, Reveal } from "./primitives";
import {
  ClassificacaoCard,
  FazendasCard,
  HistoricoCard,
  OfflineCard,
} from "./dashboard-cards";

const cards = [
  {
    tag: "Simples",
    titulo: "Telas fáceis de entender",
    texto: "Cores que dizem tudo e tutorial passo a passo. Sem complicação.",
    Mock: ClassificacaoCard,
  },
  {
    tag: "Offline",
    titulo: "Funciona no meio do mato",
    texto: "Sem sinal, sem problema. Tudo sincroniza sozinho depois.",
    Mock: OfflineCard,
  },
  {
    tag: "Histórico",
    titulo: "Compare safra com safra",
    texto: "Todas as leituras guardadas. Veja se o manejo está dando certo.",
    Mock: HistoricoCard,
  },
  {
    tag: "Plano Plus",
    titulo: "Várias fazendas, um painel",
    texto: "Até 10 fazendas ou áreas no mesmo lugar.",
    Mock: FazendasCard,
  },
];

export function Features() {
  return (
    <section id="beneficios" className="scroll-mt-20 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Benefícios</Eyebrow>
          </Reveal>
          <Heading
            text="Tudo que seu solo precisa, *num só lugar*"
            className="mx-auto mt-6 max-w-[760px] text-[40px] leading-[1.08] md:text-[64px]"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-[500px] text-[16px] leading-relaxed text-ink-soft">
              Você decide com dados, na hora certa. E gasta adubo só onde precisa.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex justify-center">
            <CtaLink href={CTA.reservar}>Reservar meu kit</CtaLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal
              key={c.tag}
              delay={(i % 2) * 0.1}
              className="flex flex-col rounded-[28px] bg-smoke p-6 md:p-8"
            >
              <span className="w-fit rounded-full bg-blue-soft px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-blue uppercase">
                {c.tag}
              </span>
              <h3 className="font-display mt-4 text-[30px] leading-[1.1] md:text-[36px]">
                {c.titulo}
              </h3>
              <div className="my-8 flex flex-1 items-center justify-center">
                <c.Mock className="w-full max-w-[300px]" />
              </div>
              <p className="text-[15px] leading-relaxed text-ink-soft">{c.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
