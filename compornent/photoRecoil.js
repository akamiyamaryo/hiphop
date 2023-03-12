import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const photoState = atom({
  key: "photoid",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
