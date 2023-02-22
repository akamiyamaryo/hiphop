import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, InputLabel, TextField } from "@mui/material";
import { db } from "../firebase/client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/client";
import { addDoc, collection } from "firebase/firestore";
import { userState } from "../compornent/recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { userNameState } from "../compornent/nicknameRecoil";
import { storage } from "../firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import styled from "@emotion/styled";
import { photoState } from "../compornent/photoRecoil";

const Login = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const user = auth.currentUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useRecoilState(userState);
  const [userNameId, setUserNameId] = useRecoilState(userNameState);
  const [image, setImage] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoId, setPhotoId] = useRecoilState(photoState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    addDoc(collection(db, "user"), {
      nickname: nickname,
      id: user.accessToken,
    });
    //recoilに値を追加
    setUserId({ id: user.accessToken });
    setUserNameId(nickname);
    //画像のurl取得
    getDownloadURL(ref(storage, "image/" + photo)).then((url) => {
      setPhotoId(url);
    });
    console.log(userId);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };
  const handleChangeNichname = (e) => {
    setNickname(e.target.value);
  };
  const addPhoto = (e) => {
    //firebaseに画像アップ
    const file = e.target.files[0];
    setPhoto(file.name);
    const storageRef = ref(storage, "image/" + file.name);
    uploadBytes(storageRef, file).then();
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            name="example"
            accept=".png, .jpeg, .jpg"
            onChange={addPhoto}
          />
          <InputLabel>ニックネーム</InputLabel>
          <TextField size="small" onChange={handleChangeNichname} />
        </div>
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
            ログイン
          </Button>
        </div>
        <div>
          ユーザ登録は
          <Link href={"/Singup"}>こちら</Link>
          から
        </div>
      </form>
    </div>
  );
};
const D1 = styled.div`
  border-radius: 50px;
`;

export default Login;
