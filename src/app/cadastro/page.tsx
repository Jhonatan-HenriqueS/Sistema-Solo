import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Criar conta | Agro+",
};

export default function CadastroPage() {
  return (
    <AuthShell
      cardTitle="Dados claros. *Decisões certas.*"
      cardText="N, P, K e umidade. Tudo no seu lugar."
      title="Crie sua conta"
      description="Leva menos de 1 minuto."
    >
      <SignupForm />
    </AuthShell>
  );
}
