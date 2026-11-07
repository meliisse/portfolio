import type { ReactNode } from 'react';
import { useTilt } from '@/useTilt';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
};

export default function TiltCard({ children, className = '', maxTilt = 12, glare = true }: TiltCardProps) {
  const { ref, style, handleMove, handleLeave } = useTilt(maxTilt);

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="tilt-inner">{children}</div>
      {glare && <div className="tilt-glare" />}
    </div>
  );
}
