import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <HEADER>
        <LI>
          <Link href="../pages/login">React</Link>
        </LI>
        <LI>
          <Link href="../pages/Singup">Python</Link>
        </LI>
        <LI>
          <Link href="../pages/login">Django</Link>
        </LI>
      </HEADER>
    </>
  );
};
export default Header;

const LI = styled.li`
  margin: 0px 20px 0px 0px;
  list-style: none;
`;
const HEADER = styled.header`
  background-color: black;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
`;
