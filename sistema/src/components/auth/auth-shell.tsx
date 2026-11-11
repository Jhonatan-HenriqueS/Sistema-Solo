import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Heading, Logo, Reveal } from "@/components/brand/primitives";
import { SITE_URL } from "@/lib/config";

/** Layout das telas de login e cadastro: card com foto à esquerda, formulário à direita. */
export function AuthShell({
  cardTitle,
  cardText,
  title,
  description,
  children,
}: {
  cardTitle: string;
  cardText: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-svh bg-white p-3 lg:grid-cols-2 lg:gap-3">
      <aside className="relative isolate hidden overflow-hidden rounded-[28px] lg:flex lg:flex-col">
        <Image
          src="/images/hero-campo.webp"
          alt="Lavoura em linhas sob céu azul"
          fill
          priority
          sizes="50vw"
          className="-z-20 object-cover object-top"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b3fa8]/70 via-[#0b3fa8]/35 to-[#0b3fa8]/55" />

        <div className="flex items-center justify-between p-8">
          <a href={SITE_URL} aria-label="Agro+ início">
            <Logo light />
          </a>
          <a
            href={SITE_URL}
            className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2.5 text-[14px] text-white ring-1 ring-white/30 backdrop-blur-md transition-colors hover:bg-white/30"
          >
            Voltar ao site
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-10 pb-24 text-center text-white">
          <Heading
            as="h2"
            text={cardTitle}
            className="max-w-[460px] text-[48px] leading-[1.05] xl:text-[60px]"
          />
          <Reveal delay={0.3}>
            <p className="mt-5 max-w-[320px] text-[16px] leading-relaxed text-white/90">
              {cardText}
            </p>
            <span className="mx-auto mt-8 block h-px w-10 bg-white/70" />
          </Reveal>
        </div>
      </aside>

      <section className="flex flex-col px-3 py-6 lg:items-center lg:justify-center lg:px-10">
        <div className="mb-10 flex items-center justify-between lg:hidden">
          <a href={SITE_URL} aria-label="Agro+ início">
            <Logo />
          </a>
          <a
            href={SITE_URL}
            className="inline-flex items-center gap-1.5 text-[14px] text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Voltar ao site
          </a>
        </div>

        <div className="mx-auto w-full max-w-[440px]">
          <Heading
            as="h1"
            text={title}
            className="text-[44px] leading-[1.05] md:text-[52px]"
          />
          <Reveal delay={0.2}>
            <p className="mt-3 text-[15px] text-ink-soft">{description}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8">
            {children}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
