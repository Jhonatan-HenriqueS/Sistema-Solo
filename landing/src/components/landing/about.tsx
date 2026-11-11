import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { Heading, Reveal, StarBadge } from "./primitives";
import { OfflineCard, StatusChip } from "./dashboard-cards";

const numeros = [
  { valor: "4", texto: "indicadores do solo: N, P, K e umidade" },
  { valor: "100%", texto: "offline: coleta e painel sem internet" },
  { valor: "10", texto: "fazendas em um painel no plano Plus" },
  { valor: "1", texto: "avaliação gratuita com a nossa equipe" },
];

export function About() {
  return (
    <section className="px-4 pt-28 pb-24 md:pt-36">
      <div className="mx-auto max-w-[1100px] text-center">
        <Reveal className="flex justify-center">
          <StarBadge />
        </Reveal>
        <Heading
          text="A lavoura não espera o laboratório. Com o Agro+, você sabe *como está sua terra hoje.*"
          className="mx-auto mt-6 max-w-[900px] text-[34px] leading-[1.12] md:text-[56px]"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-relaxed text-ink-soft">
            Um espeto de sensores lê o solo e mostra o resultado no celular, em
            linguagem simples. Você decide com dados e gasta adubo só onde precisa.
          </p>
        </Reveal>

        <Reveal className="relative mx-auto mt-14 w-full max-w-[420px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
            <Image
              src="/images/solo-milho.webp"
              alt="Milho brotando em solo preparado"
              fill
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-cover"
            />
          </div>
          <div className="absolute -top-6 right-2 w-[200px] rotate-2 text-left md:-right-24">
            <OfflineCard />
          </div>
          <div className="absolute -bottom-6 left-2 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(16,24,40,0.18)] md:-left-20">
            <span className="text-[12px] font-semibold">Talhão 2</span>
            <StatusChip s="excelente" />
          </div>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <span className="inline-flex items-center gap-2 text-[13px] font-medium text-blue">
            <GraduationCap className="size-4" />
            Desenvolvido a partir de pesquisa aplicada do IFRO
          </span>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 text-left md:grid-cols-4">
          {numeros.map((n, i) => (
            <Reveal key={n.valor + i} delay={i * 0.08} className="flex items-center gap-3">
              <span className="font-display text-[48px] leading-none md:text-[56px]">
                {n.valor}
              </span>
              <span className="max-w-[150px] text-[13px] leading-snug text-ink-soft">
                {n.texto}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
