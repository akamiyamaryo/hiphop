import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "user",
  default: { id: "" },
  effects_UNSTABLE: [persistAtom],
});

export const numberState = atom({
  key: "number",
  default: { id: "1" },
  effects_UNSTABLE: [persistAtom],
});
export const heartState = atom({
  key: "heart",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
export const goodState = atom({
  key: "good",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const loginState = atom({
  key: "login",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
