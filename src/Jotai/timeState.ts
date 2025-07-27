import { atom } from "jotai"

type timeType = "week" | "month";
export const timeAtom = atom<timeType>("week");