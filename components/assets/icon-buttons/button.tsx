import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { AddIcon, ArrowForwardIcon, CheckIcon } from "../icons";
interface ButtonProps extends TouchableOpacityProps {
  icon: "add" | "forward" | "check";
}
export function Button({ icon = "add", ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[props.style, { paddingVertical: 4, paddingHorizontal: 6 }]}
      activeOpacity={0.5}
    >
      {icon === "add" && <AddIcon />}
      {icon === "check" && <CheckIcon />}
      {icon === "forward" && <ArrowForwardIcon />}
    </TouchableOpacity>
  );
}
