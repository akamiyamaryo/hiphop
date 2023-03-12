import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { useRecoilState } from "recoil";
import { loginState } from "./recoil";
import { useRouter } from "next/router";

const Header = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const router = useRouter();

  const logout = () => {
    if (login !== "") {
      setLogin("");
      router.push({ pathname: "/login" });
    } else {
      // alert("ログインしてください。");
      // router.push({ pathname: "/login" });
    }
  };
  return (
    <>
      <HEADER>
        <Button
          startIcon={<LogoutTwoToneIcon />}
          sx={{
            position: "absolute",
            right: "0px",
            color: "black",
            margin: "10px 5px 0px 0px",
          }}
          onClick={logout}
        >
          ログアウト
        </Button>
      </HEADER>
    </>
  );
};
export default Header;

const HEADER = styled.header`
  background-color: #92cb97;
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1501;
`;
const D1 = styled.div`
  width: auto;
`;
