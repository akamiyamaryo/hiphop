import { Button, Input } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/client";
import styled from "@emotion/styled";
import { GoodIcon } from "./good_icon";
import { useRecoilState } from "recoil";
import { photoState } from "./photoRecoil";
import { userNameState } from "./nicknameRecoil";

export function Post() {
  const [rapper, setRapper] = useState("");
  const [song, setSong] = useState("");
  const [comment, setComment] = useState("");
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [posts, setPosts] = useState([]);
  const [photoId, setPhotoId] = useRecoilState(photoState);
  const [userNameId, setUserNameId] = useRecoilState(userNameState);
  const [doing, setDoing] = useState([]);

  /*firebaseからデータを取得*/
  useEffect(() => {
    const postData = collection(db, "posts");
    /*最新の投稿に並び変える*/
    const q = query(postData, orderBy("timestamp", "desc"));
    //getDocs(q).then((querySnapshot) => {
    //setPosts(querySnapshot.docs.map((doc) => doc.data()));
    //});
    /*リアルタイムでデータを取得*/
    console.log(q);
    const array = [];
    const unsub = onSnapshot(postData, (querySnapshot) => {
      setDoing(
        querySnapshot.docs.map((doc) => {
          console.log(doc.data());
          //array.push(doc);
          return doc.data();
        })
      );
    });
    //setDoing(array);
    return unsub;
  }, []);

  const rapperStorage = (e) => {
    setRapper(e.target.value);
  };
  const songStorage = (e) => {
    setSong(e.target.value);
  };
  const commentStorage = (e) => {
    setComment(e.target.value);
  };
  const rapperSearch = (e) => {
    setSearch(e.target.value);
  };
  const rapperSearch2 = () => {
    setSearch2(search);
  };
  /*firebaseのデータベースに追加*/
  const send = async (e) => {
    /*画面リロードを防ぐ*/
    if (rapper === "") {
      return;
    } else {
      e.preventDefault();
      await addDoc(collection(db, "posts"), {
        rappername: rapper,
        songname: song,
        comment: comment,
        photourl: photoId,
        name: userNameId,
        heart: "true",
        timestamp: serverTimestamp(),
      });
      setRapper("");
      setSong("");
      setComment("");
    }
  };

  return (
    <>
      <D2>
        <div>
          <form>
            <div>ラッパー名</div>
            <Input onChange={rapperStorage} value={rapper}></Input>
            <div>曲名</div>
            <Input onChange={songStorage} value={song}></Input>
            <div>コメント</div>
            <Input onChange={commentStorage} value={comment}></Input>
            <Button onClick={send}>投稿</Button>
          </form>
          {doing.map((post) => (
            <>
              <D1 key={post.id}>
                <D2>
                  <img src={post.data().photourl} height="50px" width="50px" />
                  <p>{post.data().name}</p>
                </D2>
                <p>ラッパー {post.data().rappername}</p>
                <p>曲 {post.data().songname}</p>
                <p>{post.data().comment}</p>
                <GoodIcon id={post.id} />
              </D1>
            </>
          ))}
        </div>
        <div>
          <p>ラッパーで検索</p>
          <Input onChange={rapperSearch} value={search}></Input>
          <Button onClick={rapperSearch2}>検索</Button>
          {doing.map((post) => (
            <>
              {(() => {
                if (search2 === post.data().rappername) {
                  return (
                    <>
                      <D1 key={post.id}>
                        <p>ラッパー {post.data().rappername}</p>
                        <p>曲 {post.data().songname}</p>
                        <p>{post.data().comment}</p>
                        <GoodIcon />
                      </D1>
                    </>
                  );
                } else {
                }
              })()}
            </>
          ))}
        </div>
      </D2>
    </>
  );
}
const D1 = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  margin-bottom: 10px;
  width: 300px;
`;
const D2 = styled.div`
  display: flex;
`;
