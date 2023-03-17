import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { GoodIcon } from "../../compornent/good_icon";
import { userState } from "../../compornent/recoil";
import { app, db, storage } from "../../firebase/client";
import styled from "@emotion/styled";
import { formatDateStr } from "../../compornent/ults";
import { Button, Input, InputLabel, TextField } from "@mui/material";
import { userNameState } from "../../compornent/nicknameRecoil";
import { photoState } from "../../compornent/photoRecoil";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import IconButton from "@mui/material/IconButton";
import Header from "../../compornent/header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Account() {
  const auth = getAuth(app);
  const [doing, setDoing] = useState([]);
  const [userId, setUserId] = useRecoilState(userState);
  const [changePro, setChangePro] = useState("false");
  const [changePost, setChangePost] = useState("1");
  const [nickname, setNickname] = useState("");
  const [goodPosts, setGoodPosts] = useState([]);
  const [userNameId, setUserNameId] = useRecoilState(userNameState);
  const [photoId, setPhotoId] = useRecoilState(photoState);
  const router = useRouter();
  const property = userId.id;
  const [changePhoto, setChangePhoto] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (userId.id !== window.location.pathname.slice(1, 29)) {
      router.push({
        pathname: `/`,
      });
    }
    const postData = collection(db, "posts");
    /*最新の投稿に並び変える*/
    const q = query(
      postData,
      where("user", "==", userId.id),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const array = [];
      querySnapshot.docs.map((doc) => {
        array.push({
          id: doc.id,
          time: doc?.data()?.timestamp?.seconds,
          ...doc.data(),
        });
      });
      setDoing(array);
    });

    const postDatA = collection(db, "good");

    const Q = query(postDatA, where(property, "==", "true"));
    onSnapshot(Q, (querySnapshot) => {
      const array = [];
      //console.log(querySnapshot.docs);
      querySnapshot.docs.map(async (doc) => {
        array.push({
          id: doc.id,
        });
      });

      const aRray = [];
      array.map(async (d) => {
        const docRef = doc(db, "posts", d.id);
        const docSnap = await getDoc(docRef);
        aRray.push({
          id: docSnap.id,
          time: docSnap?.data()?.timestamp?.seconds,
          ...docSnap.data(),
        });
      });
      setGoodPosts(aRray);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const routerIndex = () => {
    router.push({
      pathname: `/`,
    });
  };
  const change = () => {
    if (changePro === "false") {
      setChangePro("true");
    } else {
      setChangePro("false");
    }
  };
  const myPost = () => {
    setChangePost("1");
  };
  const goodPost = async () => {
    setChangePost("2");
  };
  const changeAdd = async () => {
    if (nickname !== "" && nickname.length <= 15 && changePhoto !== "") {
      setChangePro("");
      setUserNameId(nickname);
      const storageRef = ref(storage, "image/" + photo.name);
      uploadBytes(storageRef, photo).then(() => {
        //画像のurl取得
        getDownloadURL(ref(storage, "image/" + photo.name)).then(
          async (url) => {
            setPhotoId(url);
            const q = query(
              collection(db, "posts"),
              where("user", "==", userId.id)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((name) => {
              const wash = doc(db, "posts", name.id);
              setDoc(wash, { name: nickname, photourl: url }, { merge: true });
            });
          }
        );
      });
    } else {
      alert("未入力の箇所があります。");
    }
  };
  const handleChangeNichname = (e) => {
    setNickname(e.target.value);
  };
  const Delete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    await deleteDoc(doc(db, "good", id));
    await deleteDoc(doc(db, "number", id));
    const postData = collection(db, "posts");
    /*最新の投稿に並び変える*/
    const q = query(
      postData,
      where("user", "==", userId.id),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const array = [];
      querySnapshot.docs.map((doc) => {
        array.push({
          id: doc.id,
          time: doc.data().timestamp.seconds,
          ...doc.data(),
        });
      });
      setDoing(array);
    });
  };
  const addPhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setChangePhoto(window?.URL?.createObjectURL(file));
  };

  return (
    <>
      <Header />
      <D4>
        <D7>
          <D2>
            <I1 src={photoId} />
            <div>
              <P4>{userNameId}</P4>

              <Button
                onClick={change}
                sx={{
                  borderRadius: 10,
                  marginRight: "10px",
                  marginTop: "12px",
                  height: "30px",
                }}
              >
                ユーザー情報
              </Button>
              {(() => {
                if (changePro === "true") {
                  return (
                    <>
                      <D10>
                        <D11>
                          <D6>
                            {(() => {
                              if (changePhoto === "") {
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
                                    <I3 src={changePhoto} />
                                  </>
                                );
                              }
                            })()}
                          </D6>
                          <D13>
                            <D12>
                              <Label>
                                <Input
                                  type="file"
                                  name="example"
                                  accept=".png, .jpeg, .jpg"
                                  onChange={addPhoto}
                                  sx={{
                                    width: "300px",
                                    display: "none",
                                  }}
                                />
                                ファイルを選択
                              </Label>
                            </D12>
                            <InputLabel>ニックネーム</InputLabel>
                            <TextField
                              size="small"
                              onChange={handleChangeNichname}
                              inputProps={{ maxlength: 15 }}
                              sx={{ width: "300px" }}
                            />
                          </D13>
                          <D16>
                            <Button
                              onClick={() => {
                                setChangePro("");
                              }}
                              sx={{}}
                            >
                              戻る
                            </Button>
                            <Button onClick={changeAdd} sx={{}}>
                              変更
                            </Button>
                          </D16>
                        </D11>
                      </D10>
                    </>
                  );
                }
              })()}
            </div>
            <IconButton
              color="primary"
              sx={{
                height: "30px",
                position: "absolute",
                right: "5px",
                top: "10px",
              }}
              onClick={routerIndex}
            >
              <KeyboardReturnIcon />
            </IconButton>
          </D2>

          <D3>
            {(() => {
              if (changePost === "1") {
                return (
                  <>
                    <Button
                      sx={{
                        width: "390px",
                        color: "black",
                      }}
                      onClick={myPost}
                    >
                      <P6>自分の投稿</P6>
                    </Button>

                    <Button
                      onClick={goodPost}
                      sx={{
                        width: "390px",
                        color: "black",
                      }}
                    >
                      <P5>お気に入り</P5>
                    </Button>
                  </>
                );
              } else {
                return (
                  <>
                    <Button
                      sx={{
                        width: "390px",
                        color: "black",
                      }}
                      onClick={myPost}
                    >
                      <P5>自分の投稿</P5>
                    </Button>

                    <Button
                      onClick={goodPost}
                      sx={{
                        width: "390px",
                        color: "black",
                      }}
                    >
                      <P6>お気に入り</P6>
                    </Button>
                  </>
                );
              }
            })()}
          </D3>
        </D7>

        <D5>
          {(() => {
            if (changePost === "1") {
              return (
                <>
                  {doing.map((post) => {
                    const create = formatDateStr(post.time);
                    return (
                      <>
                        <D1 key={post.id}>
                          <D2>
                            <I2 src={post.photourl} />
                            <p>{post.name}</p>
                            <P10>{create}</P10>
                            <D8>
                              <P2>ジャンル</P2>
                              <P9>{post.kinds}</P9>
                            </D8>
                          </D2>
                          <D15>
                            <D14>
                              <P2>ラッパー</P2>
                              <P1>{post.rappername}</P1>
                            </D14>
                            <D14>
                              <P2>音源</P2>
                              <P1>{post.songname}</P1>
                            </D14>
                          </D15>
                          <P2>コメント</P2>
                          <P3>{post.comment}</P3>
                          <D9>
                            <Button
                              onClick={() => Delete(post.id)}
                              variant="outlined"
                              startIcon={<DeleteIcon fontSize="small" />}
                              size="small"
                              sx={{ borderRadius: 10, marginLeft: "670px" }}
                            >
                              削除
                            </Button>
                            <GoodIcon id={post.id} />
                          </D9>
                        </D1>
                      </>
                    );
                  })}
                </>
              );
            } else {
              return (
                <>
                  {goodPosts.map((post) => {
                    const create = formatDateStr(post.time);
                    return (
                      <>
                        <D1 key={post.id}>
                          <D2>
                            <I2 src={post.photourl} />
                            <p>{post.name}</p>
                            <P10>{create}</P10>
                            <D8>
                              <P2>ジャンル</P2>
                              <P9>{post.kinds}</P9>
                            </D8>
                          </D2>
                          <D15>
                            <D14>
                              <P2>ラッパー</P2>
                              <P1>{post.rappername}</P1>
                            </D14>
                            <D14>
                              <P2>音源</P2>
                              <P1>{post.songname}</P1>
                            </D14>
                          </D15>
                          <P2>コメント</P2>
                          <P3>{post.comment}</P3>

                          <GoodIcon id={post.id} />
                        </D1>
                      </>
                    );
                  })}
                </>
              );
            }
          })()}
        </D5>
      </D4>
    </>
  );
}
const D1 = styled.div`
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  width: 800px;
`;
const D2 = styled.div`
  display: flex;
  justyify-content: center;
`;
const D3 = styled.div`
  display: flex;
  margin: 10px 0 10px 0;
`;
const D4 = styled.div`
  margin: 0 auto;
  width: 800px;
  @media (max-width: 820px) {
    width: 100vw;
    margin: 0;
    left: 0;
  }
`;
const D5 = styled.div`
  margin-top: 256px;
  width: 800px;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
`;
const D6 = styled.div`
  margin: 10px auto 0;
  width: 100px;
  height: 100px;
`;
const D7 = styled.div`
  position: fixed;
  top: 50px;
  background-color: white;
  width: 800px;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  z-index: 1501;
  height: 205px;
  @media (max-width: 820px) {
    width: 100vw;
    margin: 0 auto;
    left: 0;
  }
`;
const D8 = styled.div`
  margin-top: 5px;
`;
const D9 = styled.div`
  display: flex;
`;
const D10 = styled.div`
  min-width: 100%;
  min-height: 100vh;
  z-index: 1505;
  background-color: rgba(128, 128, 128, 0.5);
  position: fixed;
  top: 0;
  left: 0;
`;
const D11 = styled.div`
  border: 1px solid #dddddd;
  background-color: white;
  margin: 150px auto;
  width: 400px;
  height: 320px;
  border-radius: 5%;
`;
const D12 = styled.div`
  height: 30px;
  margin: 20px 0 10px 0;
`;
const D13 = styled.div`
  width: 300px;
  margin: 0 auto;
`;
const D14 = styled.div`
  width: 400px;
  margin: 0;
`;
const D15 = styled.div`
  display: flex;
`;
const D16 = styled.div`
  margin: 10px 0 0 230px;
`;
const P1 = styled.p`
  margin: 0 0 0 5px;
  font-size: 16px;
  border-bottom: 1px solid #92cb97;
  width: 370px;
  text-align: center;
  height: 20px;
`;
const P2 = styled.p`
  font-weight: bold;
  font-size: 8px;
  margin: 0 0 0 5px;
  color: #92cb97;
`;
const P3 = styled.p`
  margin: 0 0 0 5px;
`;
const P4 = styled.p`
  font-weight: bold;
  font-size: 24px;
  margin: 30px 0 0 10px;
`;
const P5 = styled.p`
  font-weight: bold;
  margin: 0;
  line-height: 30px;
`;
const P6 = styled.p`
  font-weight: bold;
  border-bottom: 3px solid blue;
  margin: 0;
  line-height: 30px;
`;
const P9 = styled.p`
  margin: 0px;
  font-size: 16px;
  border-bottom: 1px solid #dddddd;
  width: 80px;
  text-align: center;
`;
const P10 = styled.p`
  margin: 16px 30px 16px 10px;
`;
const I1 = styled.img`
  width: 150px;
  border-radius: 50%;
  height: 150px;
`;
const I2 = styled.img`
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;
const I3 = styled.img`
  width: 100px;
  border-radius: 50%;
  height: 100px;
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
