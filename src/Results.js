/** @jsx jsx */
import { Link } from "react-router-dom";
import { Heading, Flex, Box, Text } from "rebass";
import { css, jsx } from "@emotion/core";

const linkStyle = css`
  text-decoration: none;
  color: blue;
`;

export default function Results({ data, user }) {
  return (
    <div>
      <Heading as="h1">{user.login}</Heading>
      <Flex>
        <Box>
          <img src={user.avatar_url} alt={user.name} />
        </Box>
        <Box ml={4} textAlign="left">
          <table>
            <tbody>
              {user.name && (
                <tr>
                  <th>Name</th>
                  <td>{user.name}</td>
                </tr>
              )}
              {user.company && (
                <tr>
                  <th>Company</th>
                  <td>{user.company}</td>
                </tr>
              )}
              {user.email && (
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
              )}
              {user.blog && (
                <tr>
                  <th>Site</th>
                  <td>{user.blog}</td>
                </tr>
              )}
              {user.location && (
                <tr>
                  <th>Location</th>
                  <td>{user.location}</td>
                </tr>
              )}
              {user.bio && (
                <tr>
                  <th>Bio</th>
                  <td>{user.bio}</td>
                </tr>
              )}
              {user.type === "User" && (
                <tr>
                  <th>Following</th>
                  <td>{user.following}</td>
                </tr>
              )}
              {user.type === "User" && (
                <tr>
                  <th>Followers</th>
                  <td>{user.followers}</td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>
      </Flex>
      <Heading as="h2">{`${user.public_repos} Repo${
        user.public_repos !== 1 ? "s" : ""
      }`}</Heading>
      {data.map(repo => (
        <Repo {...repo} />
      ))}
    </div>
  );
}

function Repo({ id, name, description, created_at, updated_at, language }) {
  return (
    <Box key={id}>
      <Heading as="h3">
        <Link to={`/repositories/${name}`} css={linkStyle}>
          {name}
        </Link>
      </Heading>
      <Text p={2} color="gray">
        {language}
      </Text>
      <p>{description}</p>
      <Flex>
        <Text p={2}>
          Created{" "}
          {`${new Date(created_at).getMonth() + 1}-${new Date(
            created_at
          ).getFullYear()}`}
        </Text>
        <Text p={2}>
          Updated{" "}
          {`${new Date(updated_at).getMonth() + 1}-${new Date(
            updated_at
          ).getFullYear()}`}
        </Text>
      </Flex>
    </Box>
  );
}
