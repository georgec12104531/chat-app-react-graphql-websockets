import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

import { Container } from "shards-react";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  query {
    messages {
      id
      user
      content
    }
  }
`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES);

  if (!data) return null;

  console.log("message", data.messages);

  return (
    <div>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div key={id}>
          <div
            style={{
              display: "flex",
              justifyContent: user === messageUser ? "flex-end" : "flex-start",
              paddingBottom: "1em",
            }}
          >
            {user !== messageUser ? (
              <div
                style={{
                  height: 50,
                  width: 50,
                  marginRight: "0.5em",
                  border: "2px solid #e5e6ea",
                  borderRadius: 25,
                  textAlign: "center",
                  fontSize: 18,
                  paddingTop: 9,
                }}
              >
                {messageUser.slice(0, 2).toUpperCase()}
              </div>
            ) : (
              ""
            )}

            <div
              style={{
                background: user === messageUser ? "#58bf56" : "#e5e6ea",
                color: user === messageUser ? "white" : "black",
                padding: "1em",
                borderRadius: "1em",
                maxWidth: "60%",
              }}
            >
              {content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Chat = () => {
  return (
    <Container>
      <Messages user="George"></Messages>
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat></Chat>
  </ApolloProvider>
);
