"use client";

// Aba Perfil: foto, nome, e-mail e senha. Só visual: "Salvar" não grava nada.
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SecaoCard } from "./secao-card";
import { Avatar } from "./aba-geral";

// Linha com o campo à esquerda e o botão fixo na direita do card; no celular o botão desce e ocupa a largura toda.
const linha = "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";
const salvar = (
  <Button variant="outline" className="h-11 shrink-0 rounded-full px-5">
    Salvar
  </Button>
);

function CampoSenha({ id, rotulo, valor, onChange }: { id: string; rotulo: string; valor: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{rotulo}</Label>
      <Input
        id={id}
        type="password"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="new-password"
        className="h-11 rounded-xl"
      />
    </div>
  );
}

function SenhaModal({ open, onOpenChange }: { open: boolean; onOpenChange: (aberto: boolean) => void }) {
  const [atual, setAtual] = useState("");
  const [nova, setNova] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const liberado = atual !== "" && nova.length >= 6 && nova === confirmacao;

  function mudarAberto(novo: boolean) {
    onOpenChange(novo);
    if (!novo) {
      setAtual("");
      setNova("");
      setConfirmacao("");
    }
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (liberado) mudarAberto(false);
  }

  return (
    <Dialog open={open} onOpenChange={mudarAberto}>
      <DialogContent className="gap-0 overflow-hidden rounded-[24px] bg-white p-0 sm:max-w-[480px]">
        <form onSubmit={enviar} noValidate>
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="font-sans text-[24px] leading-tight font-semibold">Alterar senha</DialogTitle>
            <DialogDescription className="text-[14px]">
              A nova senha precisa ter pelo menos 6 caracteres.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 px-6 py-6">
            <CampoSenha id="senha-atual" rotulo="Senha atual" valor={atual} onChange={setAtual} />
            <CampoSenha id="senha-nova" rotulo="Nova senha" valor={nova} onChange={setNova} />
            <CampoSenha id="senha-confirmar" rotulo="Confirme a nova senha" valor={confirmacao} onChange={setConfirmacao} />
            {confirmacao !== "" && nova !== confirmacao && (
              <p className="text-[12px] text-red-600">As senhas não são iguais.</p>
            )}
          </div>
          <DialogFooter className="mx-0 mb-0 rounded-none bg-smoke px-6 py-4">
            <Button type="button" variant="outline" onClick={() => mudarAberto(false)} className="h-10 rounded-full px-5">
              Cancelar
            </Button>
            <Button type="submit" disabled={!liberado} className="h-10 rounded-full px-5">
              Salvar senha
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AbaPerfil() {
  const [previa, setPrevia] = useState<string | null>(null);
  const [verSenha, setVerSenha] = useState(false);
  const [senhaAberto, setSenhaAberto] = useState(false);
  const arquivoRef = useRef<HTMLInputElement>(null);

  // Libera a URL temporária da prévia ao trocar de foto ou sair da página.
  useEffect(() => {
    return () => {
      if (previa) URL.revokeObjectURL(previa);
    };
  }, [previa]);

  function escolherFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (arquivo) setPrevia(URL.createObjectURL(arquivo));
  }

  return (
    <div className="space-y-6">
      <SecaoCard
        titulo="Foto de perfil"
        descricao="Essa é a sua foto. Envie uma imagem do seu computador."
        lateral={<Avatar src={previa} tamanho="size-20" />}
      >
        <input ref={arquivoRef} type="file" accept="image/*" onChange={escolherFoto} className="hidden" />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button variant="outline" onClick={() => arquivoRef.current?.click()} className="h-11 rounded-full px-5">
            <ImageIcon /> Alterar foto
          </Button>
          {salvar}
        </div>
      </SecaoCard>

      <SecaoCard
        titulo="Nome"
        descricao="Seu nome completo ou como prefere ser chamado."
      >
        <div className={linha}>
          <Input defaultValue="João Silva" maxLength={32} aria-label="Nome" className="h-11 rounded-xl sm:max-w-[420px]" />
          {salvar}
        </div>
      </SecaoCard>

      <SecaoCard
        titulo="E-mail"
        descricao="Usado para entrar no sistema e receber avisos."
      >
        <div className={linha}>
          <Input
            type="email"
            defaultValue="joao@fazendaboavista.com.br"
            aria-label="E-mail"
            className="h-11 rounded-xl sm:max-w-[420px]"
          />
          {salvar}
        </div>
      </SecaoCard>

      <SecaoCard
        titulo="Senha"
        descricao="A senha que você usa para entrar no sistema."
      >
        <div className={linha}>
        <div className="relative w-full sm:max-w-[420px]">
          <Input
            type={verSenha ? "text" : "password"}
            value="agroplus2026"
            readOnly
            aria-label="Senha"
            className="h-11 rounded-xl pr-12"
          />
          <button
            type="button"
            onClick={() => setVerSenha((v) => !v)}
            aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-ink-soft hover:text-ink"
          >
            {verSenha ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <Button onClick={() => setSenhaAberto(true)} className="h-11 shrink-0 rounded-full px-5">
          Alterar senha
        </Button>
        </div>
      </SecaoCard>

      <SenhaModal open={senhaAberto} onOpenChange={setSenhaAberto} />
    </div>
  );
}
