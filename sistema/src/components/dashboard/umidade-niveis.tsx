// Níveis de umidade do solo (escala de 5), usados no simulador e nos talhões.
import { cn } from "@/lib/utils";

export type NivelUmidade = "critico" | "abaixo" | "ideal" | "acima" | "encharcado";

// Limites (em % do medidor) calculados para CC = 70% e solo de textura média.
// Ficam só no código: o usuário vê apenas o nível.
const PMP = 35;
const LIMIAR_IRRIGACAO = 52.5;
const CC = 70;
const EXCESSO = 85;

export const niveis: Record<NivelUmidade, { titulo: string; mensagem: string; cls: string }> = {
  critico: {
    titulo: "Crítico",
    mensagem: "Solo seco demais. A planta pode murchar: irrigue o quanto antes.",
    cls: "bg-red-100 text-red-700 ring-red-200",
  },
  abaixo: {
    titulo: "Abaixo do ideal",
    mensagem: "A umidade está baixa e precisa melhorar. Planeje a próxima irrigação.",
    cls: "bg-amber-100 text-amber-800 ring-amber-200",
  },
  ideal: {
    titulo: "Ideal",
    mensagem: "Umidade recomendada. O solo está bom, não precisa fazer nada.",
    cls: "bg-leaf-soft text-forest ring-leaf/30",
  },
  acima: {
    titulo: "Acima do ideal",
    mensagem: "Solo com água demais. Regule a rega e talvez pare de irrigar por enquanto.",
    cls: "bg-blue-soft text-blue ring-blue/20",
  },
  encharcado: {
    titulo: "Encharcado",
    mensagem: "Solo saturado. Suspenda a irrigação: o excesso pode prejudicar as raízes.",
    cls: "bg-[#1e3a8a] text-white ring-[#1e3a8a]",
  },
};

export const ordem: NivelUmidade[] = ["critico", "abaixo", "ideal", "acima", "encharcado"];

export function classificar(percentual: number): NivelUmidade {
  if (percentual < PMP) return "critico";
  if (percentual < LIMIAR_IRRIGACAO) return "abaixo";
  if (percentual <= CC) return "ideal";
  if (percentual <= EXCESSO) return "acima";
  return "encharcado";
}

/** Selo com o nível de umidade de um percentual do medidor. */
export function SeloUmidade({ percentual }: { percentual: number }) {
  const nivel = classificar(percentual);
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap", niveis[nivel].cls)}>
      {niveis[nivel].titulo}
    </span>
  );
}
