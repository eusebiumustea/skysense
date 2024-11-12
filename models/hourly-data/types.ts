import { IconNames } from "../ui/types";

export interface HourData {
  time: string;
  temperature: number;
  precipitationPropability: number;
  isFocused: boolean;
  iconName: IconNames;
}
