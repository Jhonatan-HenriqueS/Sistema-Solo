"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "motion/react";
import { Star, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
  italicClassName,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  italicClassName?: string;
}) {
  const words = parseWords(text);
  return (
    <Tag className={cn("font-display text-balance", className)}>
      <span className="sr-only">{text.replaceAll("*", "")}</span>
      <span aria-hidden>
        {words.map(({ word, isItalic }, i) => {
          return (
            <motion.span
              key={i}
              className={cn(
                "inline-block will-change-transform",
                isItalic && cn("italic", italicClassName),
              )}
              initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
            >
              {word}
              {i < words.length - 1 && " "}
            </motion.span>
          );
        })}
      </span>
    </Tag>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children?: React.ReactNode;
  tone?: "light" | "glass";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase",
        tone === "light"
          ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.05)]"
          : "bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md",
        className,
      )}
    >
      <Star
        className={cn(
          "size-3.5 fill-current",
          tone === "light" ? "text-blue" : "text-white",
        )}
      />
      {children}
    </span>
  );
}

/** Botão pílula com o texto rolando no hover, igual à referência. */
export function CtaLink({
  href,
  children,
  variant = "dark",
  className,
}: {
  href: string;
  children: string;
  variant?: "dark" | "light" | "outline" | "blue";
  className?: string;
}) {
  // Só o WhatsApp abre em nova aba; o login do sistema abre na mesma.
  const external = href.startsWith("https://wa.me");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        buttonVariants(),
        "group/cta h-12 overflow-hidden rounded-full px-6 text-[15px] font-medium",
        variant === "dark" && "bg-ink text-white hover:bg-ink",
        variant === "light" && "bg-white text-ink hover:bg-white",
        variant === "outline" &&
          "bg-white text-ink ring-1 ring-black/10 hover:bg-white",
        variant === "blue" && "bg-blue text-white hover:bg-blue",
        className,
      )}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover/cta:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover/cta:translate-y-0"
        >
          {children}
        </span>
      </span>
    </Link>
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

export function StarBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-9 place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,84,249,0.12)]",
        className,
      )}
    >
      <Star className="size-4 fill-blue text-blue" />
    </span>
  );
}
