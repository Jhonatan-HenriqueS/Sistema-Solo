"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  className,
  delay = 0,
  children,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function parseWords(text: string) {
  let italic = false;
  return text.split(" ").map((raw) => {
    if (raw.startsWith("*")) italic = true;
    const isItalic = italic;
    if (raw.endsWith("*")) italic = false;
    return { word: raw.replaceAll("*", ""), isItalic };
  });
}

/**
 * Título serifado com revelação palavra a palavra.
 * Palavras entre *asteriscos* saem em itálico.
 */
export function Heading({
  text,
  as: Tag = "h2",
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const words = parseWords(text);
  return (
    <Tag className={cn("font-display text-balance", className)}>
      <span className="sr-only">{text.replaceAll("*", "")}</span>
      <span aria-hidden>
        {words.map(({ word, isItalic }, i) => (
          <motion.span
            key={i}
            className={cn("inline-block will-change-transform", isItalic && "italic")}
            initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.05 }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cn(
          "grid size-10 place-items-center rounded-full",
          light ? "bg-white text-ink" : "bg-ink text-white",
        )}
      >
        <Plus
          className={cn("size-5", light ? "text-forest" : "text-lime")}
          strokeWidth={3}
        />
      </span>
      <span
        className={cn(
          "font-display text-2xl leading-none",
          light ? "text-white" : "text-ink",
        )}
      >
        Agro<span className="text-leaf">+</span>
      </span>
    </span>
  );
}
