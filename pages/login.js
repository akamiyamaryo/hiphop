import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Input, InputLabel, TextField } from "@mui/material";
import { db } from "../firebase/client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/client";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { loginState, userState } from "../compornent/recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { userNameState } from "../compornent/nicknameRecoil";
import { storage } from "../firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import styled from "@emotion/styled";
import { photoState } from "../compornent/photoRecoil";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Header2 from "../compornent/header2";

const Login = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useRecoilState(userState);
  const [userNameId, setUserNameId] = useRecoilState(userNameState);
  const [image, setImage] = useState("");
  const [photo, setPhoto] = useState("");
  const [a, setA] = useState("");
  const [photoId, setPhotoId] = useRecoilState(photoState);
  const [login, setLogin] = useRecoilState(loginState);

  const handleSubmit = async (e) => {
    if (email !== "" && password !== "" && nickname !== "" && photo !== "") {
      if (nickname.length <= 15 && password.length <= 20) {
        if (userId.id === "") {
          e.preventDefault();
          await signInWithEmailAndPassword(auth, email, password);
          addDoc(collection(db, "user"), {
            nickname: nickname,
            id: userId.id,
          });
          const storageRef = ref(storage, "image/" + photo.name);
          uploadBytes(storageRef, photo).then();
          //recoil???????????????
          setUserNameId(nickname);
          //?????????url??????
          getDownloadURL(ref(storage, "image/" + photo.name)).then((url) => {
            setPhotoId(url);
          });
          setLogin("true");
          router.push("/");
        } else {
          e.preventDefault();
          await signInWithEmailAndPassword(auth, email, password);
          const storageRef = ref(storage, "image/" + photo.name);
          uploadBytes(storageRef, photo).then();
          //recoil???????????????
          setUserNameId(nickname);
          //?????????url??????
          getDownloadURL(ref(storage, "image/" + photo.name)).then((url) => {
            setPhotoId(url);
          });
          const postData = collection(db, "posts");
          /*?????????????????????????????????*/
          const q = query(postData, where("user", "==", userId.id));
          onSnapshot(q, (querySnapshot) => {
            const array = [];
            querySnapshot.docs.map((doc) => {
              array.push({
                id: doc.id,
                time: doc?.data()?.timestamp?.seconds,
                ...doc.data(),
              });
            });
            array.map((name) => {
              const washingtonRef = doc(db, "posts", name.id);
              updateDoc(washingtonRef, {
                name: nickname,
                photourl: photoId,
              });
            });
          });

          setLogin("true");
          router.push("/");
        }
      } else {
        alert(
          "?????????????????????15??????????????????????????????20???????????????????????????????????????"
        );
      }
    } else {
      alert("????????????????????????????????????");
    }
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
    //firebase??????????????????
    const file = e.target.files[0];
    setPhoto(file);
    console.log(file);
    setA(window?.URL?.createObjectURL(file));
  };

  return (
    <>
      <Header2 />
      <H2>????????????</H2>
      <D1>
        <D3>
          <D5>
            {(() => {
              if (a === "") {
                return (
                  <>
                    <AccountCircleIcon
                      fontSize="large"
                      sx={{ width: "100px", marginTop: "20px" }}
                    />
                  </>
                );
              } else {
                return (
                  <>
                    <I1 src={a} />
                  </>
                );
              }
            })()}
          </D5>
          <D4>
            <Label>
              <Input
                type="file"
                name="example"
                accept=".png, .jpeg, .jpg"
                onChange={addPhoto}
                sx={{ width: "300px", display: "none" }}
              />
              ?????????????????????
            </Label>
          </D4>

          <InputLabel sx={{ width: "300px" }}>??????????????????</InputLabel>
          <TextField
            size="small"
            onChange={handleChangeNichname}
            sx={{ width: "300px" }}
            inputProps={{ maxlength: 15 }}
          />
          <InputLabel sx={{ width: "300px" }}>?????????????????????</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={handleChangeEmail}
            sx={{ width: "300px" }}
          />

          <InputLabel sx={{ width: "300px" }}>???????????????</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
            sx={{ width: "300px" }}
            inputProps={{ maxlength: 20 }}
          />

          <D2>
            <Button
              type="submit"
              variant="outlined"
              sx={{ width: "300px", marginTop: "12px" }}
              onClick={handleSubmit}
            >
              ????????????
            </Button>
            <D6>
              <Link href="/signup">???????????????????????????????????????</Link>
            </D6>
          </D2>
        </D3>
      </D1>
    </>
  );
};
const D1 = styled.div`
  margin: 14px auto 0;
  width: 400px;
  height: 440px;
  border: 1px solid #dddddd;
  border-radius: 10px;
`;
const D2 = styled.div`
  margin-top: 10px;
`;
const D3 = styled.div`
  margin: 12px auto 0;
  width: 300px;
`;
const D4 = styled.div`
  height: 30px;
  margin: 20px 0 10px 0;
`;
const D5 = styled.div`
  margin: 0 auto;
  width: 80px;
  height: 80px;
`;
const D6 = styled.div`
  margin-top: 6px;
  text-align: center;
`;
const H2 = styled.h2`
  width: 0 auto;
  margin: 70px 0 0 0;
  text-align: center;
`;
const P1 = styled.p`
  width: 300px;
  margin-top: 10px;
`;
const Label = styled.label`
  padding: 5px 94px;
  color: black;
  background-color: rgb(230, 230, 230);
  cursor: pointer;
  &:hover {
    background-color: rgb(210, 210, 210);
  }
`;
const I1 = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto;
`;

export default Login;
