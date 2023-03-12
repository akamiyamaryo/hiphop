import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

const Header2 = () => {
  const router = useRouter();

  const hipTop = () => {
    router.push({
      pathname: `/`,
    });
  };

  return (
    <>
      <HEADER>
        <Button
          sx={{
            position: "absolute",
            right: "0px",
            color: "black",
            margin: "10px 5px 0px 0px",
          }}
          onClick={hipTop}
        >
          TOPへ移動
        </Button>
      </HEADER>
    </>
  );
};
export default Header2;

const HEADER = styled.header`
  background-color: #92cb97;
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1501;
`;
const D1 = styled.div`
  width: auto;
`;
