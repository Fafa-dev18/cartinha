import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Gift, Heart, ArrowRight, Sparkles, Mail } from "lucide-react";

type Step = "gift" | "letter" | "thanks";
const LETTER = [
  "Entre tantas coisas que acontecem nos meus dias, estar com você é o que me deixa mais feliz. Dormir em call, assistir algo juntos ou só ficar com você, mesmo sem fazer nada. Cada segundo com você é um presente incrível.",
  "Fiz essa cartinha para te mostrar, com um pequeno gesto, o quanto você é especial e o quanto eu quero que a gente continue construindo momentos juntos.",
  "Espero que você goste, gatinha linda te adoro.",
];

function HeartConfetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 42 }, () => ({
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
          key={i}
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
      <p className="hint">fiz com muito carinho</p>
    </section>
  );
}
function LetterScreen({ onClose }: { onClose: () => void }) {
  return (
    <section className="screen">
      <span className="eyebrow">UMA CARTINHA PARA VOCÊ</span>
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
          Fechar a cartinha
          <Mail size={18} />
        </button>
      </article>
    </section>
  );
}
function ThankYouScreen() {
  return (
    <section className="screen thank-you">
      <div className="heart-emblem" aria-hidden="true">
        <Heart size={64} fill="currentColor" strokeWidth={1} />
      </div>
      <span className="eyebrow">COM TODO O MEU CARINHO</span>
      <h1 tabIndex={-1}>
        Obrigado
        <br />
        <em>por ser você.</em>
      </h1>
      <p className="intro">
        Você é muito importante pra mim.
        <br />
        Eu adoro você seu jeitinho seu carinho.
        <br /> te adoro muito gatinha linda.
      </p>
      <div className="thank-you-note">
        Beijo. <Heart size={16} aria-hidden="true" />
      </div>
    </section>
  );
}
export default function App() {
  const [step, setStep] = useState<Step>("gift");
  const [opening, setOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!opening) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const confettiTimer = reducedMotion
      ? undefined
      : setTimeout(() => setShowConfetti(true), 350);
    const transitionTimer = setTimeout(() => {
      setStep("letter");
      setOpening(false);
    }, reducedMotion ? 0 : 1250);
    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(transitionTimer);
    };
  }, [opening]);
  useEffect(() => {
    if (step !== "gift" || document.activeElement?.closest(".brand")) {
      window.scrollTo({ top: 0, behavior: "instant" });
      titleRef.current?.querySelector("h1")?.focus({ preventScroll: true });
    }
  }, [step]);
  return (
    <main className="app">
      <div className="ambient" aria-hidden="true" />
      <header className="header">
        <a
          href={import.meta.env.BASE_URL}
          className="brand"
          aria-label="Voltar ao início"
          onClick={(event) => {
            event.preventDefault();
            setStep("gift");
            setOpening(false);
            setShowConfetti(false);
          }}
        >
          <Heart size={21} /> <span>feito de carinho</span>
        </a>
      </header>
      {showConfetti && <HeartConfetti />}
      <div className="stage" ref={titleRef} tabIndex={-1}>
        <div key={step} className="transition-screen">
          {step === "gift" ? (
            <GiftScreen opening={opening} onOpen={() => setOpening(true)} />
          ) : step === "letter" ? (
            <LetterScreen onClose={() => setStep("thanks")} />
          ) : (
            <ThankYouScreen />
          )}
        </div>
      </div>
      <footer className="site-footer">feito por Fafa-Dev18</footer>
    </main>
  );
}
