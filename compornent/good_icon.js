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
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/client";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, numberState, heartState } from "./recoil";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "@emotion/styled";

export const GoodIcon = (props) => {
  const [userId, setUserId] = useRecoilState(userState);
  const [number, setNumber] = useRecoilState(numberState);
  const [hearts, setHearts] = useState({});
  const [posts, setPosts] = useState({});
  const property = userId.id;

  useEffect(() => {
    (async () => {
      //データを新しく追加
      if (number.id === "1") {
        const cityref = await doc(db, "good", props.id);
        await setDoc(cityref, { [property]: "on" }, { merge: true });
        const docref = await doc(db, "good", props.id);
        const docsnap = await getDoc(docref);
        setHearts(docsnap.data());
        setNumber({ id: "2" });
        //データ取得
        const doCref = await doc(db, "number", props.id);
        const doCsnap = await getDoc(doCref);
        setPosts(doCsnap.data());
      } else {
        const docref = await doc(db, "good", props.id);
        const docsnap = await getDoc(docref);
        setHearts(docsnap.data());
        //データ取得
        const doCref = await doc(db, "number", props.id);
        const doCsnap = await getDoc(doCref);
        setPosts(doCsnap.data());
      }
    })();
  }, []);

  const addData = async (e) => {
    switch (hearts[property]) {
      case "on":
        e.preventDefault();
        //データを新しく追加
        const cityRef = await doc(db, "good", props.id);
        await setDoc(cityRef, { [property]: "true" }, { merge: true });
        const citYRef = await doc(db, "number", props.id);
        await setDoc(citYRef, { [property]: "true" }, { merge: true });
        break;
      case "true":
        e.preventDefault();
        //データを新しく追加
        const CityRef = await doc(db, "good", props.id);
        await setDoc(CityRef, { [property]: "false" }, { merge: true });
        await deleteDoc(doc(db, "number", props.id));
        break;
      case "false":
        //データを新しく追加
        const cityReF = await doc(db, "good", props.id);
        await setDoc(cityReF, { [property]: "true" }, { merge: true });
        const cityREf = await doc(db, "number", props.id);
        await setDoc(cityREf, { [property]: "true" }, { merge: true });
        break;
    }
    //props.idのデータを取得
    const docRef = await doc(db, "good", props.id);
    const docSnap = await getDoc(docRef);
    setHearts(docSnap.data());
    //データ取得
    const doCref = await doc(db, "number", props.id);
    const doCsnap = await getDoc(doCref);
    setPosts(doCsnap.data());
    console.log(typeof posts);
    console.log(typeof doCsnap.data());
  };

  return (
    <>
      <D1>
        <Button onClick={addData}>
          {(() => {
            if (
              hearts &&
              (hearts[property] === "false" || hearts[property] === "on")
            ) {
              return (
                <FavoriteBorderRoundedIcon color="blue" fontSize="small" />
              );
            } else {
              return <FavoriteIcon color="blue" fontSize="small" />;
            }
          })()}
        </Button>
        <p>{posts && Object.keys(posts).length}</p>
      </D1>
    </>
  );
};
const D1 = styled.div`
  display: flex;
`;
