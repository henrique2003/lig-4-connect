import { useMemo } from "react";
import { GameCellProps } from "./props";

export const useGameCell = ({ value }: GameCellProps) => {
  const color = useMemo(() => {
    switch (value) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-400";
      default:
        return "bg-transparent";
    }
  }, [value]);

  return color
};