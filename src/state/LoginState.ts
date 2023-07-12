import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const LoginStateAtom = atom({
  key: "LoginState",
  default: {
    state: false,
    authority: "",
    accessToken: "",
    accessTokenExpiresIn: 1689147677786,
    grantType: "",
    refreshToken: ""
  },
  effects_UNSTABLE: [persistAtom],
});
