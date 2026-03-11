"use client";

import { useRef, useCallback, memo } from "react";
import { gsap } from "@/lib/gsap";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

function TiltCardInner({ children, className = "", intensity = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(cardRef.current, {
        rotateY: x * intensity,
        rotateX: -y * intensity,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

const TiltCard = memo(TiltCardInner);
export default TiltCard;
