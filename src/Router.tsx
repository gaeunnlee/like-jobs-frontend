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
import RecruitDetail from "./pages/RecruitDetail";
import { useEffect } from "react";

export default function Router() {
  const token = useRecoilValue(LoginStateAtom);

  useEffect(() => {
    fetch("/recruit/").then((response) => console.log(response.body));
  }, []);
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
        <Route path="/recruit/:id" element={<RecruitDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
