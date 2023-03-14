import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { loginState, pageState, userState } from "./recoil";
import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";

function Account() {
  const router = useRouter();
  const [userId, setUserId] = useRecoilState(userState);
  const [login, setLogin] = useRecoilState(loginState);
  const [page, setPage] = useRecoilState(pageState);
  const [setting, setSetting] = useState("");

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
  const clickSetting = () => {
    if (setting === "") {
      setSetting("true");
    } else {
      setSetting("");
    }
  };
  const logout = () => {
    if (login !== "") {
      setLogin("");
      router.push({ pathname: "/login" });
    } else {
    }
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
            onClick={clickTop}
            sx={{ borderRadius: 10, width: "120px", color: "black" }}
            startIcon={<HomeOutlinedIcon />}
          >
            TOP
          </Button>
        </D2>
        <D2>
          <Button
            onClick={clickSearch}
            sx={{ borderRadius: 10, width: "120px", color: "black" }}
            startIcon={<SearchIcon />}
          >
            検索
          </Button>
        </D2>
        <D2>
          <Button
            onClick={submit}
            sx={{ borderRadius: 10, width: "120px", color: "black" }}
            startIcon={<AccountCircleRoundedIcon />}
          >
            アカウント
          </Button>
        </D2>
        <D2>
          <Button
            onClick={loginClick}
            sx={{ borderRadius: 10, width: "120px", color: "black" }}
            startIcon={<LoginIcon />}
          >
            ログイン
          </Button>
        </D2>
      </D1>
      <D3>
        <IconButton
          sx={{ position: "fixed", top: "5px", right: "10px", zIndex: "1502" }}
          onClick={clickSetting}
        >
          <MenuRoundedIcon />
        </IconButton>
      </D3>
      {(() => {
        if (setting === "true") {
          return (
            <>
              <D4>
                <D2>
                  <SettingsIcon sx={{ marginTop: "20px", marginLeft: "" }} />
                  <P1>設定</P1>
                </D2>
                <D2>
                  <Button
                    onClick={clickTop}
                    sx={{
                      borderRadius: 10,
                      width: "120px",
                      color: "black",
                    }}
                    startIcon={<HomeOutlinedIcon />}
                  >
                    TOP
                  </Button>
                </D2>
                <D2>
                  <Button
                    onClick={clickSearch}
                    sx={{
                      borderRadius: 10,
                      width: "120px",
                      color: "black",
                    }}
                    startIcon={<SearchIcon />}
                  >
                    検索
                  </Button>
                </D2>
                <D2>
                  <Button
                    onClick={submit}
                    sx={{
                      borderRadius: 10,
                      width: "120px",
                      color: "black",
                    }}
                    startIcon={<AccountCircleRoundedIcon />}
                  >
                    アカウント
                  </Button>
                </D2>
                <D2>
                  <Button
                    onClick={loginClick}
                    sx={{
                      borderRadius: 10,
                      width: "120px",
                      color: "black",
                    }}
                    startIcon={<LoginIcon />}
                  >
                    ログイン
                  </Button>
                </D2>
                <D2>
                  <Button
                    onClick={logout}
                    sx={{
                      borderRadius: 10,
                      width: "120px",
                      color: "black",
                    }}
                    startIcon={<LogoutTwoToneIcon />}
                  >
                    ログアウト
                  </Button>
                </D2>
              </D4>
            </>
          );
        }
      })()}
    </>
  );
}

export default Account;
const D1 = styled.div`
  width: auto;
  position: fixed;
  height: 300px;
  @media (max-width: 990px) {
    display: none;
  }
`;
const D2 = styled.div`
  display: flex;
`;
const D3 = styled.div`
  @media (min-width: 990px) {
    display: none;
  }
`;
const D4 = styled.div`
  @media (min-width: 990px) {
    display: none;
  }
  position: fixed;
  right: 0;
  top: 50px;
  z-index: 1502;
  background-color: white;
  border: 1px solid #dddddd;
  width: 150px;
  border-radius: 10px;
`;
const P1 = styled.h3`
  font-weight: bold;
`;
