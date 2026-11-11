import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTA } from "@/lib/site";
import { CtaLink, Eyebrow, Heading, Reveal } from "./primitives";

const perguntas = [
  {
    p: "Preciso de internet?",
    r: "Não. O Agro+ coleta e mostra os dados offline e sincroniza sozinho quando o sinal volta.",
  },
  {
    p: "Serve pra quem não entende de tecnologia?",
    r: "Sim. As telas são simples, tem tutorial passo a passo e a nossa equipe ensina na instalação.",
  },
  {
    p: "Funciona pra qualquer cultura?",
    r: "Sim. O Agro+ analisa o solo, não a planta. Serve para café, grão, cacau, pasto e o que mais você plantar.",
  },
  {
    p: "Substitui a análise de laboratório?",
    r: "Não. Complementa: você acompanha o solo no dia a dia e usa o laboratório quando precisar do laudo completo.",
  },
  {
    p: "Quando recebo meu kit?",
    r: "O Agro+ está em fase final de desenvolvimento. Quem reserva agora garante o preço de lançamento e recebe na ordem de reserva. Nossa equipe informa o prazo pelo WhatsApp.",
  },
  {
    p: "Posso testar antes?",
    r: "Pode. Você faz 1 avaliação gratuita com a gente, presencial ou por videochamada.",
  },
  {
    p: "Tenho mais de uma fazenda. Como faço?",
    r: "No plano Plus você controla até 10 fazendas ou áreas. Pode usar um kit só ou comprar um para cada área.",
  },
  {
    p: "Como pago?",
    r: "O kit é pago à vista e o plano é mensal. As formas de pagamento são combinadas no WhatsApp.",
  },
];

export function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-20 px-4 pb-24 md:pb-32">
      <div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <Eyebrow>Dúvidas</Eyebrow>
          </Reveal>
          <Heading
            text="Perguntas *frequentes*"
            className="mt-6 text-[40px] leading-[1.08] md:text-[60px]"
          />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-[380px] text-[16px] leading-relaxed text-ink-soft">
              Não achou sua resposta? Chama a gente no WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8">
            <CtaLink href={CTA.verSolo}>Quero ver meu solo</CtaLink>
          </Reveal>
        </div>
        <Reveal>
          <Accordion className="space-y-3">
            {perguntas.map((q) => (
              <AccordionItem
                key={q.p}
                value={q.p}
                className="rounded-[20px] border-none bg-smoke px-5"
              >
                <AccordionTrigger className="py-5 text-left text-[16px] font-medium hover:no-underline">
                  {q.p}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-ink-soft">
                  {q.r}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
