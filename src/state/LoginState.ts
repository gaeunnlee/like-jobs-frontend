import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const LoginStateAtom = atom({
  key: 'LoginState',
  default: {
    state: false,
    authority: '',
    // accessToken: '',
    // refreshToken: '',
    // studentId: '',
    // name: '',
    // teamName: '',
  },
  effects_UNSTABLE: [persistAtom],
});