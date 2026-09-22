"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Gift, Heart, ArrowRight, Sparkles, Mail } from "lucide-react";
import Link from "next/link";

type Step = "gift" | "letter" | "question" | "yes";
const LETTER = [
  "Entre tantas coisas que acontecem nos meus dias, estar com você é o que me deixa mais feliz. Dormir em call, assistir algo juntos ou só ficar com você, mesmo sem fazer nada. Cada segundo com você é um presente incrível.",
  "Fiz essa cartinha para te mostrar, com um pequeno gesto, o quanto você é especial e o quanto eu quero que a gente continue construindo momentos juntos.",
  "Espero que você goste, gatinha linda.",
];

function HeartConfetti({ burst }: { burst: number }) {
  const [pieces] = useState(() =>
    Array.from({ length: burst === 1 ? 42 : 96 }, () => ({
      x: Math.random() * 100,
      drift: (Math.random() - 0.5) * 260,
      delay: Math.random() * 1.5,
      size: 10 + Math.random() * 19,
      rotation: Math.random() * 720,
    })),
  );
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFinished(true), 6500);
    return () => clearTimeout(timeout);
  }, []);

  if (finished) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={`${burst}-${i}`}
          style={
            {
              left: `${p.x}%`,
              fontSize: p.size,
              animationDelay: `${p.delay}s`,
              color: ["#bd86ff", "#8451f5", "#e1c3ff", "#d98eff"][i % 4],
              "--drift": `${p.drift}px`,
              "--rotation": `${p.rotation}deg`,
            } as CSSProperties
          }
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function GiftScreen({
  opening,
  onOpen,
}: {
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <section className="screen gift-screen">
      <span className="eyebrow"></span>
      <h1 tabIndex={-1}>
        Tem uma surpresa
        <br />
        <em>esperando por você.</em>
      </h1>
      <p className="intro">Fiz uma pequena coisinha para você, gatinha.</p>
      <button
        className={`gift-button ${opening ? "opening" : ""}`}
        onClick={onOpen}
        disabled={opening}
        aria-label="Abrir o presente"
      >
        <span className="orbit orbit-one" />
        <Sparkles className="spark spark-one" size={26} />
        <Sparkles className="spark spark-two" size={18} />
        <span className="gift-disc">
          <Gift size={116} strokeWidth={1.15} />
        </span>
        <Heart className="floating-heart" size={22} />
      </button>
      <button className="primary" disabled={opening} onClick={onOpen}>
        {opening ? "Abrindo a surpresa…" : "Abrir meu presente"}
        <ArrowRight size={18} />
      </button>
      <p className="hint">abre com calma, fiz com carinho</p>
    </section>
  );
}
function LetterScreen({ onClose }: { onClose: () => void }) {
  return (
    <section className="screen">
      <span className="eyebrow">ANTES, UMA CARTINHA</span>
      <article className="letter">
        <div className="letter-top">
          <span>Para você</span>
          <Mail size={26} strokeWidth={1.3} />
        </div>
        <h1 tabIndex={-1}>
          Um pouquinho
          <br />
          <em>do que eu sinto.</em>
        </h1>
        {LETTER.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="signature">
          Com carinho <Heart size={17} />
        </div>
        <div className="letter-line" />
        <button className="primary" onClick={onClose}>
          Continuar
          <ArrowRight size={18} />
        </button>
      </article>
    </section>
  );
}
function QuestionScreen({ onAnswer }: { onAnswer: () => void }) {
  return (
    <section className="screen question">
      <div className="heart-emblem">
        <Heart size={52} strokeWidth={1.2} />
      </div>
      <span className="eyebrow">UMA COISA QUE EU QUERIA TE DIZER</span>
      <h1 tabIndex={-1}>
        Você quer continuar dividindo risadas, conversas
        <br />
        e todos os momentos bons que ainda vêm por aí
        <br />
        <em> dias?</em>
      </h1>
      <p className="intro">Porque estar com você deixa tudo mais leve.</p>
      <div className="choices">
        <button className="primary" onClick={onAnswer}>
          Sim
          <Heart size={18} />
        </button>
        <button className="secondary" onClick={onAnswer}>
          Claro
        </button>
      </div>
    </section>
  );
}
function CelebrationScreen() {
  return (
    <section className="screen celebration">
      <div className="heart-emblem">
        <Heart size={64} fill="currentColor" strokeWidth={1} />
      </div>
      <span className="eyebrow">ISSO É MUITO ESPECIAL PRA MIM</span>
      <h1 tabIndex={-1}>
        Ter você comigo
        <br />
        <em>faz meus dias melhores.</em>
      </h1>
      <p className="intro">
        Espero que a gente continue dividindo risadas, conversas
        <br />e todos os momentos bons que ainda vêm por aí. 💜
      </p>
      <div className="celebration-note">
        <Heart size={16} /> Você é muito especial para mim.
      </div>
    </section>
  );
}
export default function Home() {
  const [step, setStep] = useState<Step>("gift");
  const [opening, setOpening] = useState(false);
  const [burst, setBurst] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!opening) return;
    const confettiTimer = setTimeout(() => setBurst(1), 350);
    const transitionTimer = setTimeout(() => {
      setStep("letter");
      setOpening(false);
    }, 1250);
    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(transitionTimer);
    };
  }, [opening]);
  useEffect(() => {
    if (step !== "gift") {
      window.scrollTo({ top: 0, behavior: "instant" });
      titleRef.current?.querySelector("h1")?.focus({ preventScroll: true });
    }
  }, [step]);
  return (
    <main className="app">
      <div className="ambient" aria-hidden="true" />
      <header className="header">
        <Link
          href="/"
          className="brand"
          aria-label="Voltar ao início"
          onClick={() => {
            setStep("gift");
            setOpening(false);
            setBurst(0);
          }}
        >
          <Heart size={21} /> <span>feito de carinho</span>
        </Link>
      </header>
      {burst > 0 && <HeartConfetti key={burst} burst={burst} />}
      <div className="stage" ref={titleRef} tabIndex={-1}>
        <div key={step} className="transition-screen">
          {step === "gift" ? (
            <GiftScreen opening={opening} onOpen={() => setOpening(true)} />
          ) : step === "letter" ? (
            <LetterScreen onClose={() => setStep("question")} />
          ) : step === "question" ? (
            <QuestionScreen
              onAnswer={() => {
                setStep("yes");
                setBurst(2);
              }}
            />
          ) : step === "yes" ? (
            <CelebrationScreen />
          ) : null}
        </div>
      </div>
    </main>
  );
}
