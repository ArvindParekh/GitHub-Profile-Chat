import { atom } from "recoil";

export const urlAtom = atom<string>({
   key: "urlAtom",
   default: "",
});

export const promptAtom = atom<string>({
   key: "promptAtom",
   default: "",
});

export const responseAtom = atom<string>({
   key: "responseAtom",
   default: "",
});

export const dataContextAtom = atom<GhData>({
   key: "dataContextAtom",
   default: {
      user: {},
      stargazers: [],
      // events: [],
   },
});
