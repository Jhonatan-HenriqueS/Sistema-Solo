"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Só checagem visual de formato. Nada é enviado nem salvo.
export const validar = {
  nome: (v: string) => (/\p{L}/u.test(v) ? "" : "Informe seu nome"),
  email: (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "E-mail inválido",
  telefone: (v: string) => {
    const n = v.replace(/\D/g, "").length;
    return n === 10 || n === 11 ? "" : "Telefone inválido";
  },
  senha: (v: string) => (v.length >= 6 ? "" : "Mínimo de 6 caracteres"),
};

export function mascaraTelefone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  const corte = d.length === 11 ? 5 : 4;
  if (resto.length <= corte) return `(${ddd}) ${resto}`;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  erro: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

export function Field({
  id,
  label,
  value,
  onChange,
  erro,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
}: FieldProps) {
  const [tocado, setTocado] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const senha = type === "password";
  const mostrarErro = tocado && value !== "" && erro !== "";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={senha && visivel ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTocado(true)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={mostrarErro}
          aria-describedby={mostrarErro ? `${id}-erro` : undefined}
          className={cn(
            "h-12 w-full rounded-2xl bg-smoke px-4 text-[15px] ring-1 ring-transparent transition outline-none placeholder:text-ink-soft/60 focus:bg-white focus:ring-blue/40",
            senha && "pr-12",
            mostrarErro && "ring-red-400 focus:ring-red-400",
          )}
        />
        {senha && (
          <button
            type="button"
            onClick={() => setVisivel((v) => !v)}
            aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-ink-soft hover:text-ink"
          >
            {visivel ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
      {mostrarErro && (
        <p id={`${id}-erro`} className="mt-1.5 text-[12px] text-red-600">
          {erro}
        </p>
      )}
    </div>
  );
}

export function Checkbox({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 text-[14px]">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 cursor-pointer rounded accent-blue"
      />
      <span>{children}</span>
    </label>
  );
}

export function SubmitButton({
  disabled,
  loading,
  children,
  loadingText,
}: {
  disabled: boolean;
  loading: boolean;
  children: string;
  loadingText: string;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={cn(
        "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-medium transition-colors",
        disabled && !loading
          ? "cursor-not-allowed bg-ink/15 text-ink/50"
          : "bg-ink text-white hover:bg-ink/90",
      )}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {loading ? loadingText : children}
    </button>
  );
}
