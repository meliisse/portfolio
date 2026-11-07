import { useCallback, useRef, useState } from 'react';

type TiltStyle = {
  transform: string;
  transition: string;
};

export function useTilt(maxTilt = 14) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<TiltStyle>({
    transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transition: 'transform .15s ease-out',
  });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 2 * maxTilt;
      const rotateX = -(py - 0.5) * 2 * maxTilt;
      setStyle({
        transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(20px)`,
        transition: 'transform .08s ease-out',
      });
    },
    [maxTilt],
  );

  const handleLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform .5s cubic-bezier(.2,.7,.2,1)',
    });
  }, []);

  return { ref, style, handleMove, handleLeave };
}
