import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import RecruitInfo from "./pages/RecruitInfo";
import { useRecoilValue } from "recoil";
import { LoginStateAtom } from "./state/LoginState";
import UserMyPage from "./pages/UserMyPage";
import ResumeEditor from "./pages/ResumeEditor";
import CompanyMyPage from "./pages/CompanyMyPage";
import RecruitEditor from "./pages/RecruitEditor";

export default function Router() {
  const token = useRecoilValue(LoginStateAtom);
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<RecruitInfo />} />
        <Route
          path="/my-page"
          element={
            token.authority === "user" ? <UserMyPage /> : <CompanyMyPage />
          }
        />
        <Route path="/resume" element={<ResumeEditor />} />
        <Route path="/post/recruit" element={<RecruitEditor />} />
      </Routes>
    </BrowserRouter>
  );
}
