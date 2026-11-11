import { MessageCircle, GraduationCap } from "lucide-react";
import { CTA } from "@/lib/site";
import { Logo } from "./primitives";

const nav = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#planos", label: "Planos" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Footer() {
  return (
    <footer className="px-4 pt-20 pb-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-[340px] text-[15px] leading-relaxed text-ink-soft">
              Sensor na terra, resposta no celular. Monitoramento de Nitrogênio,
              Fósforo, Potássio e umidade do solo.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-[13px] text-forest">
              <GraduationCap className="size-4" />
              Desenvolvido a partir de pesquisa aplicada do IFRO
            </p>
          </div>
          <div>
            <h4 className="font-display text-[22px]">Navegação</h4>
            <ul className="mt-4 space-y-3 text-[15px] text-ink-soft">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="underline-offset-4 hover:text-ink hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-[22px]">Contato</h4>
            <a
              href={CTA.reservar}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-smoke px-4 py-2.5 text-[15px] hover:bg-leaf-soft"
            >
              <MessageCircle className="size-4 text-leaf" />
              (69) 99389-7171
            </a>
            <p className="mt-3 text-[13px] text-ink-soft">
              Atendemos todo o Brasil.
            </p>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-black/5 pt-6 text-[12px] text-ink-soft md:flex-row md:items-center md:justify-between">
          <span>© 2026 Agro+. Todos os direitos reservados.</span>
          <span className="flex gap-4">
            {/* TODO: apontar para a página da Política de Privacidade */}
            <a href="#" className="hover:text-ink">Política de Privacidade</a>
            <span>Telas do app são ilustrativas.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
