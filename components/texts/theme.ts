import type { Size } from "../../@types/theme";
import type { HeadingLevel } from "./types";

export const sizes: Record<Size, string> = {
  sm: "text-sm md:text-base",
  md: "text-base md:text-lg",
  lg: "text-lg md:text-xl",
};

export const headingSizes: Record<HeadingLevel, string> = {
  h1: "text-3xl md:text-4xl lg:text-5xl font-bold",
  h2: "text-2xl md:text-3xl lg:text-4xl font-bold",
  h3: "text-xl md:text-2xl lg:text-3xl font-semibold",
  h4: "text-lg md:text-xl lg:text-2xl font-semibold",
  h5: "text-base md:text-lg lg:text-xl font-semibold",
  h6: "text-sm md:text-base lg:text-lg font-semibold",
};
