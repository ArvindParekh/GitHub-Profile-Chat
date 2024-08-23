import { atom } from "recoil";

export const urlAtom = atom({
   key: "urlAtom",
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
