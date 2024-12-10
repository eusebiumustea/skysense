import { PropsWithChildren } from "react";
import {
  ComposedGesture,
  Gesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";
interface DetectGestureProps {
  enabled: boolean;
  gesture: ComposedGesture | GestureType | false;
}
export function DetectGesture({
  enabled,
  gesture,
  children,
}: PropsWithChildren<DetectGestureProps>) {
  if (!enabled) return <>{children}</>;
  if (gesture) {
    return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
  }
}
