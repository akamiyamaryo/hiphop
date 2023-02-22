import { Button, InputLabel, TextField } from "@mui/material";
import Link from "next/link";
import { app } from "../firebase/client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";

const Singup = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    router.push("/login");
  };
  const handleChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <InputLabel>メールアドレス</InputLabel>
        <TextField
          name="email"
          type="email"
          size="small"
          onChange={handleChangeEmail}
        />
      </div>
      <div>
        <InputLabel>パスワード</InputLabel>
        <TextField
          name="password"
          type="password"
          size="small"
          onChange={handleChangePassword}
        />
      </div>
      <div>
        <Button type="submit" variant="outlined">
          登録
        </Button>
      </div>
      <div>
        <Link href={"/login"}>すでに登録している人はこちら</Link>
      </div>
    </form>
  );
};
export default Singup;
