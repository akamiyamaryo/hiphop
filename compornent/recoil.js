import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "user",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const numberState = atom({
  key: "number",
  default: { id: "1" },
  effects_UNSTABLE: [persistAtom],
});
export const heartState = atom({
  key: "number",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
