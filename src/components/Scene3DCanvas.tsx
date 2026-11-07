import Scene3D from '@/components/Scene3D';

type Scene3DCanvasProps = {
  className?: string;
};

export default function Scene3DCanvas({ className = '' }: Scene3DCanvasProps) {
  return (
    <div className={className}>
      <Scene3D />
    </div>
  );
}
