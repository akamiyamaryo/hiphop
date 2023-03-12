import React, { useEffect } from "react";
import Header from "../compornent/header";
import { Post } from "../compornent/post";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { loginState, userState } from "../compornent/recoil";
import { useRouter } from "next/router";

function Main() {
  const [login, setLogin] = useRecoilState(loginState);
  const [userId, setUserId] = useRecoilState(userState);
  const router = useRouter();

  return (
    <>
      <Header />

      <Post />
    </>
  );
}

export default Main;
