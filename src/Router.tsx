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

  // useEffect(() => {
  //   fetch('/auth/member/login',{
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: "user1",
  //       password: "user1",
  //     }),
  //   })
  // .then(function(response) {
  //   return response.text();
  // }).then(function(data) {
  //   console.log(data); // this will be a string
  // });
  // }, []);
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<RecruitInfo />} />
        <Route
          path="/my-page"
          element={
            token.authority === "ROLE_USER" ? <UserMyPage /> : <CompanyMyPage />
          }
        />
        <Route path="/post/recruit" element={<RecruitEditor />} />
        <Route path="/recruit/:id" element={<ResumeEditor />} />
      </Routes>
    </BrowserRouter>
  );
}
