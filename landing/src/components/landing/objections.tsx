import { Quote, ShieldCheck, Video, MapPin } from "lucide-react";
import { CTA } from "@/lib/site";
import { CtaLink, Eyebrow, Heading, Reveal } from "./primitives";

const objecoes = [
  {
    duvida: "Na minha roça não tem internet...",
    resposta:
      "Tudo bem. O Agro+ mede e mostra os dados offline. Quando o sinal volta, sincroniza sozinho.",
  },
  {
    duvida: "Eu não sei mexer com sistema...",
    resposta:
      "Foi feito pensando em você. Telas simples, cores que dizem tudo e tutorial guiado. A gente ensina na instalação.",
  },
  {
    duvida: "É caro...",
    resposta:
      "Pense no adubo jogado fora por falta de informação. Um erro de adubação numa safra pode custar mais que o kit.",
  },
  {
    duvida: "O sensor substitui o laboratório?",
    resposta:
      "Não, e a gente fala isso com clareza. Ele complementa: você acompanha todo dia e usa o laboratório para o laudo.",
  },
  {
    duvida: "Eu moro longe...",
    resposta:
      "Atendemos o Brasil todo. A avaliação gratuita pode ser presencial ou por videochamada.",
  },
];

function ObjecaoCard({ duvida, resposta }: (typeof objecoes)[number]) {
  return (
    <figure className="w-[300px] shrink-0 rounded-[24px] bg-smoke p-6 md:w-[360px]">
      <Quote className="size-7 fill-blue text-blue" />
      <blockquote className="font-display mt-5 text-[26px] leading-[1.15]">
        “{duvida}”
      </blockquote>
      <figcaption className="mt-4 text-[15px] leading-relaxed text-ink-soft">
        {resposta}
      </figcaption>
    </figure>
  );
}

export function Objections() {
  return (
    <section className="py-24 md:py-32">
      <div className="px-4 text-center">
        <Reveal className="flex justify-center">
          <Eyebrow>Sem rodeio</Eyebrow>
        </Reveal>
        <Heading
          text="O que todo produtor *pergunta*"
          className="mx-auto mt-6 max-w-[760px] text-[40px] leading-[1.08] md:text-[64px]"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-[460px] text-[16px] leading-relaxed text-ink-soft">
            As dúvidas mais comuns, respondidas sem enrolação.
          </p>
        </Reveal>
      </div>

      <div className="group relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-[marquee_45s_linear_infinite] gap-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...objecoes, ...objecoes].map((o, i) => (
            <div key={i} aria-hidden={i >= objecoes.length}>
              <ObjecaoCard {...o} />
            </div>
          ))}
        </div>
      </div>

      {/* Garantia */}
      <div className="px-4">
        <Reveal className="mx-auto mt-20 max-w-[1100px] overflow-hidden rounded-[28px] bg-gradient-to-br from-blue to-[#0a3fb0] p-6 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="relative mx-auto grid size-36 place-items-center rounded-full border-2 border-dashed border-white/40 md:size-40">
              <div className="grid size-28 place-items-center rounded-full bg-white text-center text-blue md:size-32">
                <div>
                  <ShieldCheck className="mx-auto size-7" />
                  <div className="mt-1 text-[11px] leading-tight font-semibold uppercase">
                    Avaliação
                    <br />
                    gratuita
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <Heading
                as="h3"
                text="Teste *antes* de decidir"
                className="text-[36px] leading-[1.08] md:text-[52px]"
              />
              <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-white/85">
                Antes de fechar, você faz 1 avaliação gratuita com a nossa equipe.
                Vê o sistema funcionando e tira todas as dúvidas. Só reserva se
                fizer sentido para você.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2 text-[13px] md:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
                  <MapPin className="size-3.5" /> Presencial
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
                  <Video className="size-3.5" /> Videochamada
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
                  Sem compromisso
                </span>
              </div>
            </div>
            <CtaLink href={CTA.avaliacao} variant="light" className="mx-auto">
              Agendar avaliação
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
