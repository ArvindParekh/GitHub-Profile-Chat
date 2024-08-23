"use client";

import { dataContextAtom } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";

export default function Chat() {
   const data = useRecoilValue(dataContextAtom);

   return <p>{data.user.bio}</p>;
}
