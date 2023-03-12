import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/client";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userState,
  numberState,
  heartState,
  goodState,
  loginState,
} from "./recoil";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";

export const GoodIcon = (props) => {
  const [userId, setUserId] = useRecoilState(userState);
  const [goodData, setGoodData] = useRecoilState(goodState);
  const [hearts, setHearts] = useState({});
  const [posts, setPosts] = useState({});
  const property = userId.id;
  const [login, setLogin] = useRecoilState(loginState);
  const array = [];

  useEffect(() => {
    (async () => {
      //データを新しく取得
      const docref = await doc(db, "good", props.id);
      const docsnap = await getDoc(docref);
      //array.push({ ...docsnap.data() });
      const obj = { ...docsnap.data() };
      setHearts(docsnap.data());
      //データ取得
      const doCref = await doc(db, "number", props.id);
      const doCsnap = await getDoc(doCref);
      const num = { ...doCsnap.data() };
      setPosts(doCsnap.data());
      const cityRef = await doc(db, "posts", props.id);
      await setDoc(
        cityRef,
        { number: num && (Object.keys(num).length || 0) },
        { merge: true }
      );
      /*if (hearts && typeof hearts[property] === "undefined") {
        const cityref = await doc(db, "good", props.id);
        await setDoc(cityref, { [property]: "on" }, { merge: true });
        const Docref = await doc(db, "good", props.id);
        const Docsnap = await getDoc(Docref);
        await setHearts(Docsnap.data());
        //データ取得
        const DoCref = await doc(db, "number", props.id);
        const DoCsnap = await getDoc(DoCref);
        await setPosts(DoCsnap.data());
      } else {
      }*/
      switch (obj && typeof obj[property]) {
        case "undefined":
          const cityref = await doc(db, "good", props.id);
          await setDoc(
            cityref,
            { [property]: "on", timestamp: serverTimestamp() },
            { merge: true }
          );
          const Docref = await doc(db, "good", props.id);
          const Docsnap = await getDoc(Docref);
          await setHearts(Docsnap.data());
          //データ取得
          const DoCref = await doc(db, "number", props.id);
          const DoCsnap = await getDoc(DoCref);
          await setPosts(DoCsnap.data());
      }
    })();
  }, []);

  const addData = async (e) => {
    if (login !== "") {
      switch (hearts && hearts[property]) {
        case "on":
          e.preventDefault();
          //データを新しく追加
          const cityRef = await doc(db, "good", props.id);
          await setDoc(
            cityRef,
            { [property]: "true", timestamp: serverTimestamp() },
            { merge: true }
          );
          const citYRef = await doc(db, "number", props.id);
          await setDoc(citYRef, { [property]: "true" }, { merge: true });
          break;
        case "true":
          e.preventDefault();
          //データを新しく追加
          const CityRef = await doc(db, "good", props.id);
          await setDoc(
            CityRef,
            { [property]: "false", timestamp: serverTimestamp() },
            { merge: true }
          );
          const CityREf = await doc(db, "number", props.id);
          await updateDoc(CityREf, {
            [property]: deleteField(),
          });
          break;
        case "false":
          //データを新しく追加
          const cityReF = await doc(db, "good", props.id);
          await setDoc(
            cityReF,
            { [property]: "true", timestamp: serverTimestamp() },
            { merge: true }
          );
          const cityREf = await doc(db, "number", props.id);
          await setDoc(cityREf, { [property]: "true" }, { merge: true });
          break;
      }
      //props.idのデータを取得
      const docRef = await doc(db, "good", props.id);
      const docSnap = await getDoc(docRef);
      await setHearts(docSnap.data());
      //データ取得
      const doCref = await doc(db, "number", props.id);
      const doCsnap = await getDoc(doCref);
      const num = { ...doCsnap.data() };
      await setPosts(doCsnap.data());
      const cityRef = await doc(db, "posts", props.id);
      await setDoc(
        cityRef,
        { number: num && (Object.keys(num).length || 0) },
        { merge: true }
      );
    } else {
      alert("ログインしてください。");
    }
  };

  return (
    <>
      <D1>
        <IconButton onClick={addData} color="primary" size="small">
          {(() => {
            if (
              hearts &&
              (hearts[property] === "false" || hearts[property] === "on")
            ) {
              return (
                <FavoriteBorderRoundedIcon
                  fontSize="small"
                  sx={{ zIndex: "-1" }}
                />
              );
            } else {
              return <FavoriteIcon fontSize="small" sx={{ zIndex: "-1" }} />;
            }
          })()}
        </IconButton>
        <P1>{posts && Object.keys(posts).length}</P1>
      </D1>
    </>
  );
};
const D1 = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const P1 = styled.p`
  font-size: 12px;
  margin: 6px 0 4px;
`;
