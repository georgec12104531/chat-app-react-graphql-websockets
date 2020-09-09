import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
  variables,
} from "@apollo/client";

import { Container, Row, Col, FormInput, Button } from "shards-react";

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

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({ user }) => {
  console.log({ user });
  const { data } = useQuery(GET_MESSAGES, {
    pollInterval: 500,
  });

  if (!data) return null;

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
  const [stateData, setStateData] = useState({
    user: "George",
    content: "Wo you da ji ji",
  });

  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    if (stateData.content.length === 0) {
    }

    postMessage({
      variables: stateData,
    });

    setStateData({
      ...stateData,
      content: "",
    });
  };

  return (
    <Container>
      <Messages user={stateData.user}></Messages>
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label="User"
            value={stateData.user}
            onChange={(e) => {
              setStateData({
                ...stateData,
                user: e.target.value,
              });

              console.log(stateData.user);
            }}
          ></FormInput>
        </Col>
        <Col xs={8} style={{ padding: 0 }}>
          <FormInput
            label="Content"
            value={stateData.content}
            onChange={(e) => {
              console.log(stateData.content);
              return setStateData({
                ...stateData,
                content: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) onSend();
            }}
          ></FormInput>
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button onClick={onSend}>Send</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat></Chat>
  </ApolloProvider>
);
