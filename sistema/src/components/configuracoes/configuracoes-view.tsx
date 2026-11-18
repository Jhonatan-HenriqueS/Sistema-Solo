"use client";

// Submenu de Configurações: lateral no desktop, abas no topo no celular.
import { useState } from "react";
import { Ruler, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { AbaArea } from "./aba-area";
import { AbaGeral } from "./aba-geral";
import { AbaPerfil } from "./aba-perfil";

type Aba = "geral" | "perfil" | "area";

function ItemMenu({ ativo, onClick, icone: Icone, children }: { ativo: boolean; onClick: () => void; icone: typeof Settings; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={ativo ? "page" : undefined}
      className={cn(
        "flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-[14px] transition-colors",
        ativo ? "bg-blue-soft font-medium text-blue" : "text-ink-soft hover:bg-white",
      )}
    >
      <Icone className="size-4" />
      {children}
    </button>
  );
}

export function ConfiguracoesView() {
  const [aba, setAba] = useState<Aba>("geral");

  return (
    <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
      <nav className="flex gap-1 overflow-x-auto md:sticky md:top-10 md:w-[200px] md:flex-col">
        <ItemMenu ativo={aba === "geral"} onClick={() => setAba("geral")} icone={Settings}>
          Geral
        </ItemMenu>
        <ItemMenu ativo={aba === "perfil"} onClick={() => setAba("perfil")} icone={User}>
          Perfil
        </ItemMenu>
        <ItemMenu ativo={aba === "area"} onClick={() => setAba("area")} icone={Ruler}>
          Unidade de área
        </ItemMenu>
      </nav>
      <div className="min-w-0 flex-1 md:max-w-[820px]">
        {aba === "geral" && <AbaGeral onIrParaPerfil={() => setAba("perfil")} />}
        {aba === "perfil" && <AbaPerfil />}
        {aba === "area" && <AbaArea />}
      </div>
    </div>
  );
}
