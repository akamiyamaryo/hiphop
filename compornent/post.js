import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
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
  where,
} from "firebase/firestore";
import { db } from "../firebase/client";
import styled from "@emotion/styled";
import { GoodIcon } from "./good_icon";
import { useRecoilState } from "recoil";
import { photoState } from "./photoRecoil";
import { userNameState } from "./nicknameRecoil";
import { userState, loginState, pageState } from "./recoil";
import { formatDateStr } from "./ults";
import Account from "./account";
import SearchIcon from "@mui/icons-material/Search";

export function Post() {
  const [rapper, setRapper] = useState("");
  const [song, setSong] = useState("");
  const [comment, setComment] = useState("");
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [search3, setSearch3] = useState(0);
  const [posts, setPosts] = useState([]);
  const [photoId, setPhotoId] = useRecoilState(photoState);
  const [userNameId, setUserNameId] = useRecoilState(userNameState);
  const [userId, setUserId] = useRecoilState(userState);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);
  const [goodAdd, setGoodAdd] = useState(0);
  const [kinds, setKinds] = useState("");
  const [kinds2, setKinds2] = useState("");
  const [kinds3, setKinds3] = useState("");
  const [login, setLogin] = useRecoilState(loginState);
  const [page, setPage] = useRecoilState(pageState);

  const property = userId.id;

  /*firebaseからデータを取得*/
  useEffect(() => {
    const postData = collection(db, "posts");
    /*最新の投稿に並び変える*/
    const q = query(postData, orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const array = [];
      querySnapshot.docs.map((doc) => {
        array.push({
          id: doc?.id,
          time: doc?.data()?.timestamp?.seconds,
          ...doc.data(),
        });
      });
      setDoing(array);
    });
    const POstData = collection(db, "posts");
    const p = query(POstData, orderBy("timestamp", "desc"));
    onSnapshot(p, (querySnapshot) => {
      const aRray = [];
      querySnapshot.docs.map((doc) => {
        aRray?.push({
          id: doc.id,
          time: doc?.data()?.timestamp?.seconds,
          ...doc.data(),
        });
      });
      aRray.sort((a, b) => b.number - a.number);
      setDone(aRray);
    });
  }, [goodAdd]);

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
    setKinds2(kinds3);
    switch (search3) {
      case 0:
        setSearch3(1);
        break;
      case 1:
        setSearch3(2);
        break;
      case 2:
        setSearch3(1);
        break;
    }
  };
  const myStorage = () => {
    setGoodAdd(1);
    console.log(doing);
  };
  const popular = () => {
    setGoodAdd(0);
  };
  /*firebaseのデータベースに追加*/
  const send = async (e) => {
    if (login !== "") {
      if (rapper === "" || kinds === "") {
        alert("ラッパーまたはジャンルが未入力です。");
      } else {
        if (rapper.length <= 20 && song.length <= 20 && comment.length <= 200) {
          e.preventDefault();
          await addDoc(collection(db, "posts"), {
            rappername: rapper,
            songname: song,
            comment: comment,
            photourl: photoId,
            name: userNameId,
            user: userId.id,
            heart: "true",
            kinds: kinds,
            timestamp: serverTimestamp(),
          });
          setRapper("");
          setSong("");
          setComment("");
          setKinds("");
        } else {
          alert(
            "ラッパー、音源は20字、コメントは200字以内に設定してください。"
          );
        }
      }
    } else {
      alert("ログインしてください。");
    }
  };
  const kindsAdd = (e) => {
    setKinds(e.target.value);
  };
  const kindsAdd3 = (e) => {
    setKinds3(e.target.value);
  };

  return (
    <>
      <D11>
        <div>
          <Account />
        </div>
        <D3>
          {(() => {
            if (page === "") {
              return (
                <>
                  <D5>
                    <D2>
                      <D4>
                        <P7>ラッパー</P7>
                        <TextField
                          onChange={rapperStorage}
                          name={rapper}
                          value={rapper}
                          inputProps={{ maxlength: 20 }}
                          sx={{ width: "250px", margin: "0 30px 0 10px" }}
                          size="small"
                        ></TextField>
                      </D4>
                      <div>
                        <P4>音源</P4>
                        <TextField
                          onChange={songStorage}
                          name={song}
                          value={song}
                          inputProps={{ maxlength: 20 }}
                          sx={{ width: "250px" }}
                          size="small"
                        ></TextField>
                      </div>

                      <FormControl
                        sx={{ m: 1, minWidth: 120, margin: "35px 0 0 50px" }}
                        size="small"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ジャンル
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={kinds}
                          label="ジャンル"
                          onChange={kindsAdd}
                          width="100px"
                        >
                          <MenuItem value={"チル"}>チル</MenuItem>
                          <MenuItem value={"アングラ"}>アングラ</MenuItem>
                          <MenuItem value={"リリシズム"}>リリシズム</MenuItem>
                          <MenuItem value={"その他"}>その他</MenuItem>
                        </Select>
                      </FormControl>
                    </D2>

                    <P7>コメント</P7>
                    <TextField
                      onChange={commentStorage}
                      name={comment}
                      value={comment}
                      inputProps={{ maxlength: 200 }}
                      sx={{ width: 500, marginLeft: "10px", marginRight: 20 }}
                      size="small"
                    ></TextField>

                    <Button
                      onClick={send}
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "10px" }}
                    >
                      投稿
                    </Button>
                    <D12>
                      {(() => {
                        if (goodAdd === 1) {
                          return (
                            <>
                              <Button
                                onClick={popular}
                                sx={{
                                  width: "390px",
                                  color: "black",
                                }}
                              >
                                <P5>最新の投稿</P5>
                              </Button>
                              <Button
                                onClick={myStorage}
                                sx={{
                                  width: "390px",
                                  color: "black",
                                }}
                              >
                                <P6> 人気順</P6>
                              </Button>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <Button
                                onClick={popular}
                                sx={{
                                  width: "390px",
                                  color: "black",
                                }}
                              >
                                <P6>最新の投稿</P6>
                              </Button>
                              <Button
                                onClick={myStorage}
                                sx={{
                                  width: "390px",
                                  color: "black",
                                }}
                              >
                                <P5>人気順</P5>
                              </Button>
                            </>
                          );
                        }
                      })()}
                    </D12>
                  </D5>
                </>
              );
            } else {
              return (
                <>
                  <D6>
                    <D7>
                      <D2>
                        <P8>ラッパーで検索</P8>
                        <FormControl
                          sx={{ m: 1, minWidth: 120, marginLeft: "120px" }}
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-label">
                            ジャンル
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={kinds3}
                            label="ジャンル"
                            onChange={kindsAdd3}
                            width="100px"
                          >
                            <MenuItem value={"チル"}>チル</MenuItem>
                            <MenuItem value={"アングラ"}>アングラ</MenuItem>
                            <MenuItem value={"リリシズム"}>リリシズム</MenuItem>
                            <MenuItem value={"その他"}>その他</MenuItem>
                          </Select>
                        </FormControl>
                      </D2>

                      <TextField
                        onChange={rapperSearch}
                        value={search}
                        size="small"
                        sx={{ margin: "6px 60px 0 20px", width: "300px" }}
                      ></TextField>
                      <Button
                        onClick={rapperSearch2}
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: "10px", marginTop: "10px" }}
                        endIcon={<SearchIcon />}
                      >
                        検索
                      </Button>
                    </D7>
                  </D6>
                </>
              );
            }
          })()}

          {(() => {
            if (page === "") {
              return (
                <>
                  <D9>
                    {(() => {
                      if (goodAdd === 1) {
                        return (
                          <>
                            {done.map((post) => {
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
                      } else {
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

                                    <GoodIcon id={post.id} />
                                  </D1>
                                </>
                              );
                            })}
                          </>
                        );
                      }
                    })()}
                  </D9>
                </>
              );
            } else {
              return (
                <>
                  <D10>
                    {doing.map((post) => (
                      <>
                        {(() => {
                          switch (search3) {
                            case 1:
                              if (search2 === "") {
                                if (kinds2 === post.kinds) {
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
                                }
                              } else {
                                if (search2 === post.rappername) {
                                  if (kinds2 === "") {
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
                                  } else {
                                    if (kinds2 === post.kinds) {
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
                                    }
                                  }
                                }
                              }
                              break;
                            case 2:
                              if (search2 === "") {
                                if (kinds2 === post.kinds) {
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
                                }
                              } else {
                                if (search2 === post.rappername) {
                                  if (kinds2 === "") {
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
                                  } else {
                                    if (kinds2 === post.kinds) {
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
                                    }
                                  }
                                }
                              }
                              break;
                            case 0:
                              break;
                          }
                        })()}
                      </>
                    ))}
                  </D10>
                </>
              );
            }
          })()}
        </D3>
        {/* <div>
          <D13>
            <D2>
              <P8>ラッパーで検索</P8>
              <FormControl
                sx={{ m: 1, minWidth: 120, marginLeft: "120px" }}
                size="small"
              >
                <InputLabel id="demo-simple-select-label">ジャンル</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={kinds3}
                  label="ジャンル"
                  onChange={kindsAdd3}
                  width="100px"
                >
                  <MenuItem value={"チル"}>チル</MenuItem>
                  <MenuItem value={"アングラ"}>アングラ</MenuItem>
                  <MenuItem value={"リリシズム"}>リリシズム</MenuItem>
                  <MenuItem value={"その他"}>その他</MenuItem>
                </Select>
              </FormControl>
            </D2>

            <TextField
              onChange={rapperSearch}
              value={search}
              size="small"
              sx={{ margin: "6px 60px 0 20px" }}
            ></TextField>
            <Button
              onClick={rapperSearch2}
              variant="contained"
              color="primary"
              sx={{ borderRadius: "10px", marginTop: "10px" }}
              endIcon={<SearchIcon />}
            >
              検索
            </Button>
          </D13>
          <D10>
            {doing.map((post) => (
              <>
                {(() => {
                  switch (search3) {
                    case 1:
                      if (search2 === "") {
                        if (kinds2 === post.kinds) {
                          const create = formatDateStr(post.time);
                          return (
                            <>
                              <D7 key={post.id}>
                                <D2>
                                  <I2 src={post.photourl} />
                                  <p> {post.name}</p>
                                  <P1>{create}</P1>
                                </D2>
                                <D6>
                                  <P2>ジャンル</P2>
                                  <P1>{post.kinds}</P1>
                                </D6>
                                <D6>
                                  <P2>ラッパー</P2>
                                  <P1>{post.rappername}</P1>
                                </D6>
                                <D6>
                                  <P2>音源</P2>
                                  <P1>{post.songname}</P1>
                                </D6>
                                <P3>{post.comment}</P3>

                                <GoodIcon id={post.id} />
                              </D7>
                            </>
                          );
                        }
                      } else {
                        if (search2 === post.rappername) {
                          if (kinds2 === "") {
                            const create = formatDateStr(post.time);
                            return (
                              <>
                                <D7 key={post.id}>
                                  <D2>
                                    <I2 src={post.photourl} />
                                    <p>{post.name}</p>
                                    <P1>{create}</P1>
                                  </D2>
                                  <D6>
                                    <P2>ジャンル</P2>
                                    <P1>{post.kinds}</P1>
                                  </D6>
                                  <D6>
                                    <P2>ラッパー</P2>
                                    <P1>{post.rappername}</P1>
                                  </D6>
                                  <D6>
                                    <P2>音源</P2>
                                    <P1>{post.songname}</P1>
                                  </D6>
                                  <P3>{post.comment}</P3>

                                  <GoodIcon id={post.id} />
                                </D7>
                              </>
                            );
                          } else {
                            if (kinds2 === post.kinds) {
                              const create = formatDateStr(post.time);
                              return (
                                <>
                                  <D7 key={post.id}>
                                    <D2>
                                      <I2 src={post.photourl} />
                                      <p>{post.name}</p>
                                      <P1>{create}</P1>
                                    </D2>
                                    <D6>
                                      <P2>ジャンル</P2>
                                      <P1>{post.kinds}</P1>
                                    </D6>
                                    <D6>
                                      <P2>ラッパー</P2>
                                      <P1>{post.rappername}</P1>
                                    </D6>
                                    <D6>
                                      <P2>音源</P2>
                                      <P1>{post.songname}</P1>
                                    </D6>
                                    <P3>{post.comment}</P3>

                                    <GoodIcon id={post.id} />
                                  </D7>
                                </>
                              );
                            }
                          }
                        }
                      }
                      break;
                    case 2:
                      if (search2 === "") {
                        if (kinds2 === post.kinds) {
                          const create = formatDateStr(post.time);
                          return (
                            <>
                              <D7 key={post.id}>
                                <D2>
                                  <I2 src={post.photourl} />
                                  <p>{post.name}</p>
                                  <P1>{create}</P1>
                                </D2>
                                <D6>
                                  <P2>ジャンル</P2>
                                  <P1>{post.kinds}</P1>
                                </D6>
                                <D6>
                                  <P2>ラッパー</P2>
                                  <P1>{post.rappername}</P1>
                                </D6>
                                <D6>
                                  <P2>音源</P2>
                                  <P1>{post.songname}</P1>
                                </D6>
                                <P3>{post.comment}</P3>

                                <GoodIcon id={post.id} />
                              </D7>
                            </>
                          );
                        }
                      } else {
                        if (search2 === post.rappername) {
                          if (kinds2 === "") {
                            const create = formatDateStr(post.time);
                            return (
                              <>
                                <D7 key={post.id}>
                                  <D2>
                                    <I2 src={post.photourl} />
                                    <p>{post.name}</p>
                                    <P1>{create}</P1>
                                  </D2>
                                  <D6>
                                    <P2>ジャンル</P2>
                                    <P1>{post.kinds}</P1>
                                  </D6>
                                  <D6>
                                    <P2>ラッパー</P2>
                                    <P1>{post.rappername}</P1>
                                  </D6>
                                  <D6>
                                    <P2>音源</P2>
                                    <P1>{post.songname}</P1>
                                  </D6>
                                  <P3>{post.comment}</P3>

                                  <GoodIcon id={post.id} />
                                </D7>
                              </>
                            );
                          } else {
                            if (kinds2 === post.kinds) {
                              const create = formatDateStr(post.time);
                              return (
                                <>
                                  <D7 key={post.id}>
                                    <D2>
                                      <I2 src={post.photourl} />
                                      <p>{post.name}</p>
                                      <P1>{create}</P1>
                                    </D2>
                                    <D6>
                                      <P2>ジャンル</P2>
                                      <P1>{post.kinds}</P1>
                                    </D6>
                                    <D6>
                                      <P2>ラッパー</P2>
                                      <P1>{post.rappername}</P1>
                                    </D6>
                                    <D6>
                                      <P2>音源</P2>
                                      <P1>{post.songname}</P1>
                                    </D6>
                                    <P3>{post.comment}</P3>

                                    <GoodIcon id={post.id} />
                                  </D7>
                                </>
                              );
                            }
                          }
                        }
                      }
                      break;
                    case 0:
                      break;
                  }
                })()}
              </>
            ))}
          </D10>
        </div> */}
      </D11>
    </>
  );
}
const D1 = styled.div`
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  width: 750px;
`;
const D2 = styled.div`
  display: flex;
  justyify-content: center;
`;
const D3 = styled.div`
  width: 750px;
  margin: 0 auto;
`;
const D4 = styled.div`
  margin: 0 10px 0 10px
  width: 250px;
`;
const D5 = styled.div`
  margin: 0 auto;
  position: fixed;
  background-color: white;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  width: 750px;
  height: 208px;
  top: 50px;
`;
const D6 = styled.div`
  margin: 0 auto;
  position: fixed;
  background-color: white;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  width: 750px;
  height: 120px;
  top: 50px;
`;
const D7 = styled.div`
  margin: 0 auto;
  width: 480px;
`;
const D8 = styled.div`
  margin-top: 5px;
`;
const D9 = styled.div`
  width: 750px;
  margin-top: 195px;
`;
const D10 = styled.div`
  width: 750px;
  margin-top: 106px;
`;
const D11 = styled.div`
  margin: 65px auto 0;
  display: flex;
`;
const D12 = styled.div`
  display: flex;
  margin: 10px 0 10px 0;
`;
const D13 = styled.div`
  margin: 0 auto;
  position: fixed;
  background-color: white;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  width: 400px;
  height: 120px;
  top: 50px;
`;
const D14 = styled.div`
  width: 400px;
  margin: 0;
`;
const D15 = styled.div`
  display: flex;
`;
const P1 = styled.p`
  margin: 0 0 0 5px;
  font-size: 16px;
  border-bottom: 1px solid #92cb97;
  width: 330px;
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
  margin: 6px 0;
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
const P7 = styled.p`
  font-weight: bold;
  margin: 6px 0 6px 10px;
`;
const P8 = styled.p`
  font-weight: bold;
  margin: 16px 0 6px 30px;
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
const I2 = styled.img`
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;
