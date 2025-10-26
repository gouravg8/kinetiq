import { SessionType } from "@/components/ui/Header";
import { atom } from "jotai";

export const userAtom = atom<SessionType | null>(null);
