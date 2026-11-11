import Image from "next/image";
import { FlaskConical, Grid3x3, Coins, WifiOff } from "lucide-react";
import { CTA } from "@/lib/site";
import { CtaLink, Eyebrow, Heading, Reveal } from "./primitives";

const dores = [
  {
    icon: FlaskConical,
    titulo: "Laboratório demora",
    texto: "Você paga a análise e o resultado chega quando já passou da hora.",
  },
  {
    icon: Grid3x3,
    titulo: "Tudo adubado igual",
    texto: "Cada pedaço da terra é diferente, mas recebe a mesma dose.",
  },
  {
    icon: Coins,
    titulo: "Adubo a mais",
    texto: "Compra fertilizante “por garantia”, e o dinheiro some no chão.",
  },
  {
    icon: WifiOff,
    titulo: "Sem sinal no mato",
    texto: "Onde não pega internet, nenhum aplicativo funciona.",
  },
];

export function Pain() {
  return (
    <section className="p-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-b from-[#3b7de6] via-[#6fa4ea] to-[#b9d6f3] px-4 pt-24 pb-40 md:pb-56">
        <Image
          src="/images/trigo-ceu.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover object-bottom opacity-90 [mask-image:linear-gradient(to_bottom,transparent_45%,black_85%)]"
        />
        <div className="mx-auto max-w-[1180px] text-center text-white">
          <Reveal className="flex justify-center">
            <Eyebrow tone="glass">O problema</Eyebrow>
          </Reveal>
          <Heading
            text="O laboratório demora. *O Agro+ não.*"
            className="mt-6 text-[42px] leading-[1.05] md:text-[64px]"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-relaxed text-white/90">
              Enquanto a análise não chega, a lavoura segue sem resposta. O
              Agro+ lê o solo na hora e mostra no celular.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            {dores.map((d, i) => (
              <Reveal
                key={d.titulo}
                delay={i * 0.08}
                className="rounded-[24px] bg-white p-6 text-ink shadow-[0_20px_40px_-20px_rgba(0,40,120,0.35)] transition-[scale,background-color,box-shadow] duration-300 ease-out hover:scale-[1.04] hover:bg-[#eef2f8]"
              >
                <span className="grid size-11 place-items-center rounded-full bg-blue-soft">
                  <d.icon className="size-5 text-blue" />
                </span>
                <h3 className="font-display mt-10 text-[28px] leading-[1.1]">
                  {d.titulo}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {d.texto}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex justify-center">
            <CtaLink href={CTA.verSolo}>Quero ver meu solo</CtaLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
