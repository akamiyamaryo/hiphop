import { Button, InputLabel, TextField } from "@mui/material";
import Link from "next/link";
import { app } from "../firebase/client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../compornent/recoil";
import styled from "@emotion/styled";
import Header2 from "../compornent/header2";

const Singup = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useRecoilState(userState);

  const handleSubmit = async (e) => {
    console.log(window?.location?.pathname);
    if (password === "" || email === "") {
      alert("未入力の欄があります");
    } else {
      e.preventDefault();
      const user = await createUserWithEmailAndPassword(auth, email, password);
      user && setUserId({ id: user.user.uid });
      router.push("/login");
    }
  };
  const handleChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };
  return (
    <>
      <Header2 />
      <H2>ユーザー登録</H2>
      <D1>
        <D3>
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={handleChangeEmail}
            sx={{ width: "300px" }}
          />
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
            sx={{ width: "300px" }}
          />
          <D2>
            <Button
              type="submit"
              variant="outlined"
              onClick={handleSubmit}
              sx={{ width: "300px", marginTop: "16px" }}
            >
              登録
            </Button>
          </D2>
          <D4>
            <Link href="/login">アカウントをお持ちの方</Link>
          </D4>
        </D3>
      </D1>
    </>
  );
};
export default Singup;
const D1 = styled.div`
  margin: 20px auto 0;
  width: 400px;
  height: 260px;
  border: 1px solid #dddddd;
  border-radius: 10px;
`;
const D2 = styled.div`
  margin-top: 10px;
`;
const D3 = styled.div`
  margin: 24px auto 0;
  width: 300px;
`;
const D4 = styled.div`
  margin-top: 6px;
  text-align: center;
`;
const H2 = styled.h2`
  width: 0 auto;
  margin: 100px 0 0 0;
  text-align: center;
`;
