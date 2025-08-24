import { atom } from "jotai";

type ThemeType = "dark" | "light";

const themeAtom = atom<ThemeType>("dark");

export default themeAtom;