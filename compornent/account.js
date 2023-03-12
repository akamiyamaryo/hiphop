import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { loginState, pageState, userState } from "./recoil";
import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function Account() {
  const router = useRouter();
  const [userId, setUserId] = useRecoilState(userState);
  const [login, setLogin] = useRecoilState(loginState);
  const [page, setPage] = useRecoilState(pageState);

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
  const clickSearch = () => {
    setPage("search");
  };
  const clickTop = () => {
    setPage("");
  };

  return (
    <>
      <D1>
        <D2>
          <SettingsIcon sx={{ marginTop: "20px", marginLeft: "" }} />
          <P1>設定</P1>
        </D2>
        <D2>
          <Button
            onClick={submit}
            sx={{ borderRadius: 10, width: "120px" }}
            startIcon={<AccountCircleRoundedIcon />}
          >
            アカウント
          </Button>
        </D2>
        <D2>
          {" "}
          <Button
            onClick={loginClick}
            sx={{ borderRadius: 10, width: "120px" }}
            startIcon={<LoginIcon />}
          >
            ログイン
          </Button>
        </D2>
        <D2>
          <Button
            onClick={clickSearch}
            sx={{ borderRadius: 10, width: "120px" }}
            startIcon={<SearchIcon />}
          >
            検索
          </Button>
        </D2>
        <D2>
          <Button
            onClick={clickTop}
            sx={{ borderRadius: 10, width: "120px" }}
            startIcon={<HomeOutlinedIcon />}
          >
            TOP
          </Button>
        </D2>
      </D1>
    </>
  );
}

export default Account;
const D1 = styled.div`
  width: auto;
  position: fixed;
  height: 300px;
`;
const D2 = styled.div`
  display: flex;
`;
const P1 = styled.h3`
  font-weight: bold;
`;
