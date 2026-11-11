"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { whatsappLink } from "@/lib/config";
import { Checkbox, Field, SubmitButton, validar } from "./fields";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [loading, setLoading] = useState(false);

  const erros = { email: validar.email(email), senha: validar.senha(senha) };
  const valido = !erros.email && !erros.senha;

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!valido) return;
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 800);
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-5">
      <Field
        id="email"
        label="E-mail"
        type="email"
        value={email}
        onChange={setEmail}
        erro={erros.email}
        placeholder="voce@email.com"
        autoComplete="email"
        inputMode="email"
      />
      <Field
        id="senha"
        label="Senha"
        type="password"
        value={senha}
        onChange={setSenha}
        erro={erros.senha}
        placeholder="Sua senha"
        autoComplete="current-password"
      />
      <div className="flex items-center justify-between gap-4 pt-1">
        <Checkbox id="lembrar" checked={lembrar} onChange={setLembrar}>
          Lembrar de mim
        </Checkbox>
        <a
          href={whatsappLink("Olá! Esqueci minha senha do Agro+.")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] text-ink-soft hover:text-ink"
        >
          Esqueceu sua senha?
        </a>
      </div>
      <div className="pt-2">
        <SubmitButton disabled={!valido} loading={loading} loadingText="Entrando...">
          Entrar
        </SubmitButton>
      </div>
      <p className="pt-2 text-center text-[14px] text-ink-soft">
        Ainda não tem uma conta?{" "}
        <Link href="/cadastro" className="font-medium text-ink underline underline-offset-4">
          Criar conta
        </Link>
      </p>
    </form>
  );
}
