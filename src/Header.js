/** @jsx jsx */
import { NavLink } from "react-router-dom";
import { Box, Flex, Text } from "rebass";
import { css, jsx } from "@emotion/core";

import config from "../package.json";

const linkStyle = css`
  text-decoration: none;
  color: black;
`;

const activeStyle = {
  borderBottom: "2px solid black"
};

const LinkWapper = ({ children }) => <Text p={2}>{children}</Text>;

export default function Header() {
  return (
    <Flex alignItems="center">
      <LinkWapper>
        <NavLink to="/" css={linkStyle}>
          {config.name}
        </NavLink>
      </LinkWapper>
      <Box mx="auto" />
      <Flex>
        <LinkWapper>
          <NavLink
            to="/"
            exact={true}
            css={linkStyle}
            activeStyle={activeStyle}
          >
            Search
          </NavLink>
        </LinkWapper>
        <LinkWapper>
          <NavLink to="/about" css={linkStyle} activeStyle={activeStyle}>
            About
          </NavLink>
        </LinkWapper>
      </Flex>
    </Flex>
  );
}
