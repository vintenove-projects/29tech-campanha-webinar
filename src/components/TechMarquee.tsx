import { useEffect, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

const technologies = [
  { name: "HTML5", icon: "html5", color: "E34F26" },
  { name: "CSS3", icon: "css3", color: "1572B6" },
  { name: "JavaScript", icon: "javascript", color: "F7DF1E" },
  { name: "TypeScript", icon: "typescript", color: "3178C6" },
  { name: "Node.js", icon: "nodedotjs", color: "339933" },
  { name: "React", icon: "react", color: "61DAFB" },
  { name: "Next.js", icon: "nextdotjs", color: "000000" },
  { name: "Flutter", icon: "flutter", color: "02569B" },
  { name: "Dart", icon: "dart", color: "0175C2" },
  { name: "Python", icon: "python", color: "3776AB" },
  { name: "Django", icon: "django", color: "092E20" },
  { name: "FastAPI", icon: "fastapi", color: "009688" },
  { name: "C#", icon: "csharp", color: "239120" },
  { name: ".NET", icon: "dotnet", color: "512BD4" },
  { name: "Java", icon: "openjdk", color: "007396" },
  { name: "Kotlin", icon: "kotlin", color: "7F52FF" },
  { name: "Swift", icon: "swift", color: "F05138" },
  { name: "PHP", icon: "php", color: "777BB4" },
  { name: "Laravel", icon: "laravel", color: "FF2D20" },
  { name: "PostgreSQL", icon: "postgresql", color: "4169E1" },
  { name: "MySQL", icon: "mysql", color: "4479A1" },
  { name: "MongoDB", icon: "mongodb", color: "47A248" },
  { name: "Redis", icon: "redis", color: "DC382D" },
  { name: "Docker", icon: "docker", color: "2496ED" },
  { name: "Kubernetes", icon: "kubernetes", color: "326CE5" },
  { name: "AWS", icon: "amazonaws", color: "232F3E" },
  { name: "Google Cloud", icon: "googlecloud", color: "4285F4" },
  { name: "Firebase", icon: "firebase", color: "FFCA28" },
  { name: "GraphQL", icon: "graphql", color: "E10098" },
];

const TypingText = () => {
  const { t } = useTranslation();

  const phrases = t("techMarquee.phrases", { returnObjects: true }) as string[];
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 45);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsDeleting(true), 2500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <div className="py-[60px] bg-background flex flex-col items-center px-4">
      <p
        className="text-center max-w-[780px] min-h-[80px] md:min-h-[80px]"
        style={{
          fontSize: "clamp(20px, 3vw, 28px)",
          fontWeight: 400,
          color: "#0A0A0A",
          whiteSpace: "pre-wrap",
        }}
      >
        {displayText}
        <span
          className="inline-block w-[2px] ml-[2px] align-baseline"
          style={{
            height: "1em",
            backgroundColor: "hsl(var(--primary))",
            opacity: cursorVisible ? 1 : 0,
          }}
        />
      </p>
      <p
        className="mt-6 text-center uppercase tracking-widest"
        style={{ fontSize: "14px", color: "#999" }}
      >
        {t("techMarquee.subtitle")}
      </p>
    </div>
  );
};

const DESKTOP_COUNT = 13;
const MOBILE_COUNT = 7;
const ARC_HEIGHT = 80;
const MIN_SIZE = 52;
const MAX_SIZE = 80;
const WAVE_SPEED = 0.8; // radians per second

const ArcLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [failedIcons, setFailedIcons] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current) {
        const delta = (time - lastTimeRef.current) / 1000;
        setPhase((p) => p + WAVE_SPEED * delta);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleError = useCallback((icon: string) => {
    setFailedIcons((prev) => {
      const next = new Set(prev);
      next.add(icon);
      return next;
    });
  }, []);

  const validTechs = technologies.filter((t) => !failedIcons.has(t.icon));
  const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;
  const visibleTechs = validTechs.slice(0, count);
  const n = visibleTechs.length;

  return (
    <div
      className="relative w-full mx-auto overflow-visible"
      style={{ height: isMobile ? 140 : 180, maxWidth: 1200, margin: "0 auto" }}
    >
      {visibleTechs.map((tech, i) => {
        const t = n <= 1 ? 0.5 : i / (n - 1);
        // Wave: base arc + travelling sine wave
        const baseArc = Math.sin(Math.PI * t);
        const wave = Math.sin(Math.PI * t * 2 - phase) * 0.25;
        const combined = Math.max(0, baseArc + wave * baseArc);

        const size = MIN_SIZE + (MAX_SIZE - MIN_SIZE) * combined;
        const bottom = ARC_HEIGHT * combined;
        const left = t * 100;
        const iconSize = size * 0.45;

        return (
          <div
            key={tech.icon}
            className="absolute flex items-center justify-center rounded-full cursor-pointer"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom,
              transform: "translateX(-50%)",
              background: "#F5F5F5",
              transition: "background 200ms ease, box-shadow 200ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "#FFFFFF";
              el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.10)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "#F5F5F5";
              el.style.boxShadow = "none";
            }}
            title={tech.name}
          >
            <img
              src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color}`}
              alt={tech.name}
              width={iconSize}
              height={iconSize}
              loading="lazy"
              onError={() => handleError(tech.icon)}
            />
          </div>
        );
      })}
    </div>
  );
};

const TechMarquee = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background py-16 px-4">
      <p
        className="text-center pb-8 uppercase tracking-[0.2em]"
        style={{ fontSize: 12, color: "#999" }}
      >
        {t("techMarquee.title")}
      </p>

      <ArcLayout />

      <TypingText />
    </section>
  );
};

export default TechMarquee;
