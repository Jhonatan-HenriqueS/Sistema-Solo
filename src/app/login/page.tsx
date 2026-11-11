import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Entrar | Agro+",
};

export default function LoginPage() {
  return (
    <AuthShell
      cardTitle="Seu solo, *na palma da mão.*"
      cardText="Acompanhe cada leitura da sua terra."
      title="Entre na sua conta"
      description="Informe seu e-mail e sua senha para continuar."
    >
      <LoginForm />
    </AuthShell>
  );
}
