declare module '@splinetool/react-spline' {
  import { ComponentType } from 'react';
  
  interface SplineProps {
    scene: string;
    className?: string;
    onLoad?: () => void;
    onMouseDown?: (e: any) => void;
    onMouseUp?: (e: any) => void;
    onMouseHover?: (e: any) => void;
    onKeyDown?: (e: any) => void;
    onKeyUp?: (e: any) => void;
    onStart?: (e: any) => void;
    onLookAt?: (e: any) => void;
    onFollow?: (e: any) => void;
    onWheel?: (e: any) => void;
    renderOnDemand?: boolean;
  }

  const Spline: ComponentType<SplineProps>;
  export default Spline;
}
