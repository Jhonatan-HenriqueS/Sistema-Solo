import { Sprout, HardDriveDownload, Smartphone, Check } from "lucide-react";
import { CTA } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CtaLink, Eyebrow, Heading, Reveal } from "./primitives";

const passos = [
  {
    icon: Sprout,
    titulo: "Espeta",
    texto: "O kit vai no solo e mede Nitrogênio, Fósforo, Potássio e umidade.",
    cta: { label: "Reservar meu kit", href: CTA.reservar },
  },
  {
    icon: HardDriveDownload,
    titulo: "Coleta",
    texto:
      "A central guarda as leituras, mesmo sem internet. Quando o sinal volta, sincroniza sozinha.",
    cta: { label: "Quero ver meu solo", href: CTA.verSolo },
  },
  {
    icon: Smartphone,
    titulo: "Decide",
    texto:
      "O app mostra se o solo está ruim, baixo, ideal, ótimo ou excelente, comparado ao valor ideal.",
    cta: { label: "Reservar meu kit", href: CTA.reservar },
  },
];

const ganhos = [
  { titulo: "Decisão na hora certa", texto: "Você vê o solo hoje, não daqui a semanas." },
  { titulo: "Adubo onde precisa", texto: "Menos desperdício, mais dinheiro no bolso." },
  { titulo: "Instalado por nós", texto: "O kit chega com frete e instalação inclusos." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 px-4 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Como funciona</Eyebrow>
          </Reveal>
          <Heading
            text="Espeta, coleta e *decide*"
            className="mt-6 text-[40px] leading-[1.08] md:text-[64px]"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-[460px] text-[16px] leading-relaxed text-ink-soft">
              Sensor na terra, resposta no celular. Em três passos.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-5 md:grid-cols-3">
          {passos.map((p, i) => (
            <Reveal
              key={p.titulo}
              delay={i * 0.1}
              className={cn(
                "rounded-[28px] bg-smoke p-6 md:p-8 transition-[scale,background-color,box-shadow] duration-300 ease-out hover:scale-[1.04] hover:bg-[#e9e9e9]",
                i === 1 && "md:mt-10",
                i === 2 && "md:mt-20",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-full bg-blue">
                  <p.icon className="size-5 text-white" />
                </span>
                <span className="font-display text-[44px] leading-none text-ink/15">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display mt-10 text-[34px] leading-none">{p.titulo}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{p.texto}</p>
              <CtaLink href={p.cta.href} className="mt-8 h-10 px-5 text-[14px]">
                {p.cta.label}
              </CtaLink>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-[28px] bg-forest p-6 text-white md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.08em] text-lime uppercase">
                Sem promessa vazia
              </span>
              <p className="font-display mt-3 text-[28px] leading-[1.15] md:text-[36px]">
                O Agro+ complementa o laboratório, não substitui.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                Use a análise completa quando precisar do laudo. No resto do
                tempo, saiba o que acontece no solo todo dia.
              </p>
            </div>
            <ul className="grid gap-4">
              {ganhos.map((g) => (
                <li key={g.titulo} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-lime" strokeWidth={3} />
                  <span>
                    <span className="block text-[15px] font-semibold">{g.titulo}</span>
                    <span className="block text-[14px] text-white/70">{g.texto}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
