import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { loginState, userState } from "./recoil";
import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LoginIcon from "@mui/icons-material/Login";

function Account() {
  const router = useRouter();
  const [userId, setUserId] = useRecoilState(userState);
  const [login, setLogin] = useRecoilState(loginState);

  const submit = () => {
    if (login !== "") {
      router.push({
        pathname: `/${userId.id}/Account`,
        query: { user: userId.id },
      });
    } else {
      alert("ログインをしてください。");
    }
  };

  const loginClick = () => {
    if (login !== "") {
      alert("ログイン済みです");
    } else {
      router.push({
        pathname: "/login",
      });
    }
  };

  return (
    <>
      <D1>
        <D2>
          <SettingsIcon sx={{ marginTop: "20px", marginLeft: "" }} />
          <P1>設定</P1>
        </D2>
        <Button
          onClick={submit}
          sx={{ borderRadius: 10, width: "120px" }}
          startIcon={<AccountCircleRoundedIcon />}
        >
          アカウント
        </Button>
        <Button
          onClick={loginClick}
          sx={{ borderRadius: 10, width: "120px" }}
          startIcon={<LoginIcon />}
        >
          ログイン
        </Button>
      </D1>
    </>
  );
}

export default Account;
const D1 = styled.div`
  width: 120px;
  position: fixed;
`;
const D2 = styled.div`
  display: flex;
`;
const P1 = styled.h3`
  font-weight: bold;
`;
