// Card de configuração no padrão da Vercel: título, descrição, conteúdo e rodapé com dica e ação.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SecaoCard({
  titulo,
  descricao,
  lateral,
  children,
  dica,
  acao,
  className,
}: {
  titulo: string;
  descricao?: React.ReactNode;
  /** Conteúdo à direita do título, como a foto de perfil. */
  lateral?: React.ReactNode;
  children?: React.ReactNode;
  dica?: React.ReactNode;
  acao?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("gap-0 rounded-[24px] bg-white py-0 ring-black/5 [--card-spacing:--spacing(6)]", className)}>
      <CardHeader className="pt-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <CardTitle className="font-sans text-[18px] font-semibold">{titulo}</CardTitle>
            {descricao && (
              <CardDescription className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                {descricao}
              </CardDescription>
            )}
          </div>
          {lateral}
        </div>
      </CardHeader>
      <CardContent className={cn("pb-6", children ? "pt-5" : "pt-0")}>{children}</CardContent>
      {(dica || acao) && (
        <CardFooter className="justify-between gap-4 bg-smoke px-6 py-3.5 text-[13px] text-ink-soft">
          <span>{dica}</span>
          {acao}
        </CardFooter>
      )}
    </Card>
  );
}
