// Ícone de cada cultura, usado no select de talhões e nos cards de plantios.
import { Bean, Cloud, Coffee, Leaf, Sprout, Wheat, type LucideIcon } from "lucide-react";

export const iconeCultura: Record<string, LucideIcon> = {
  Soja: Sprout,
  Milho: Wheat,
  "Cana-de-açúcar": Leaf,
  Café: Coffee,
  Algodão: Cloud,
  Feijão: Bean,
};

