import dayjs from "dayjs";
import { atom } from "jotai"

export type timeType = "week" | "month" | "analytics";
export const timeAtom = atom<timeType>("week");

export const dateAtom = atom(dayjs());