"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SITE_URL } from "@/lib/config";
import { ArrowLeft } from "lucide-react";
import { Checkbox, Field, SubmitButton, mascaraTelefone, validar } from "./fields";

export function SignupForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [termos, setTermos] = useState(false);
  const [loading, setLoading] = useState(false);

  const erros = {
    nome: validar.nome(nome),
    email: validar.email(email),
    telefone: validar.telefone(telefone),
    senha: validar.senha(senha),
  };
  const valido = Object.values(erros).every((e) => !e) && termos;

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!valido) return;
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 800);
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-5">
      <Field
        id="nome"
        label="Nome"
        value={nome}
        onChange={setNome}
        erro={erros.nome}
        placeholder="Seu nome completo"
        autoComplete="name"
      />
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
        id="telefone"
        label="Telefone"
        type="tel"
        value={telefone}
        onChange={(v) => setTelefone(mascaraTelefone(v))}
        erro={erros.telefone}
        placeholder="(69) 99999-9999"
        autoComplete="tel"
        inputMode="numeric"
      />
      <Field
        id="senha"
        label="Senha"
        type="password"
        value={senha}
        onChange={setSenha}
        erro={erros.senha}
        placeholder="Crie uma senha"
        autoComplete="new-password"
      />
      <div className="pt-1">
        <Checkbox id="termos" checked={termos} onChange={setTermos}>
          Li e aceito os{" "}
          <a href={SITE_URL} className="font-medium underline underline-offset-4">
            Termos e Condições
          </a>
        </Checkbox>
      </div>
      <div className="pt-2">
        <SubmitButton disabled={!valido} loading={loading} loadingText="Criando conta...">
          Criar conta
        </SubmitButton>
      </div>
      <p className="pt-1 text-center text-[14px] text-ink-soft">
        Já tem uma conta?{" "}
        <Link href="/login" className="font-medium text-ink underline underline-offset-4">
          Entrar
        </Link>
      </p>
      <a
        href={`${SITE_URL}/#planos`}
        className="inline-flex items-center gap-1.5 text-[13px] text-ink-soft hover:text-ink"
      >
        <ArrowLeft className="size-3.5" />
        Ver os planos
      </a>
    </form>
  );
}
