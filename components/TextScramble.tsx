"use client";

import { useRef, useEffect, useState, memo } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  trigger?: boolean;
  charset?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

function TextScrambleInner({
  text,
  className = "",
  speed = 30,
  trigger = true,
  charset = CHARS,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const totalFrames = text.length;

    const scramble = () => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return charset[Math.floor(Math.random() * charset.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration < totalFrames) {
        frameRef.current = window.setTimeout(scramble, speed);
      } else {
        setDisplayText(text);
      }
    };

    scramble();

    return () => {
      if (frameRef.current) {
        clearTimeout(frameRef.current);
      }
    };
  }, [text, trigger, speed, charset]);

  return <span className={className}>{displayText}</span>;
}

const TextScramble = memo(TextScrambleInner);
export default TextScramble;
