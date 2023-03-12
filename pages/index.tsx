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

  useEffect(() => {
    if (userId.id === "") {
      router.push("/signup");
    } else {
      if (login !== "true") {
        router.push("/login");
      }
    }
  }, []);
  return (
    <>
      <Header />

      <Post />
    </>
  );
}

export default Main;
