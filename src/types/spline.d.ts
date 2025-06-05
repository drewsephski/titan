declare module '@splinetool/react-spline' {
  import { ComponentType } from 'react';
  import { MouseEvent, KeyboardEvent, WheelEvent } from 'react';

  interface SplineProps {
    scene: string;
    className?: string;
    onLoad?: () => void;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseUp?: (e: MouseEvent) => void;
    onMouseHover?: (e: MouseEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    onKeyUp?: (e: KeyboardEvent) => void;
    onStart?: (e: MouseEvent) => void;
    onLookAt?: (e: MouseEvent) => void;
    onFollow?: (e: MouseEvent) => void;
    onWheel?: (e: WheelEvent) => void;
    renderOnDemand?: boolean;
  }

  const Spline: ComponentType<SplineProps>;
  export default Spline;
}
