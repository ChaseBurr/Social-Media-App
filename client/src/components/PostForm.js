import { useMutation } from "@apollo/client";
import React from "react";

import { Form, Button } from "semantic-ui-react";
import { useForm } from "./../util/hooks";
import { FETCH_POSTS_QUERY } from "./../util/graphql";

const gql = require("graphql-tag");

export default function PostForm() {
     const { values, onChange, onSubmit } = useForm(createPostCallback, {
          body: "",
     });

     const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
          variables: values,
          update(proxy, result) {
               // get all data from apollo cache
               const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
               });
               proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                         getPosts: [result.data.createPost, ...data.getPosts],
                    },
               });
               values.body = "";
          },
          errorPolicy: "all",
     });

     function createPostCallback() {
          createPost();
     }

     return (
          <>
               <Form onSubmit={onSubmit} className="post-form">
                    <h2>Create a post</h2>
                    <Form.Field className="form-section">
                         <Form.Input
                              className="form-input"
                              placeholder="Create a post"
                              name="body"
                              onChange={onChange}
                              value={values.body}
                              error={error ? true : false}
                         />
                         <Button type="submit" color="teal">
                              SUBMIT
                         </Button>
                    </Form.Field>
               </Form>
               {error && (
                    <div
                         className="ui error message"
                         style={{ marginBottom: "20px" }}
                    >
                         <li>{error.graphQLErrors[0].message}</li>
                    </div>
               )}
          </>
     );
}

// createPost returns the values inside

const CREATE_POST_MUTATION = gql`
     mutation createPost($body: String!) {
          createPost(body: $body) {
               id
               body
               createdAt
               username
               likes {
                    id
                    username
                    createdAt
               }
               # likeCount
               comments {
                    id
                    body
                    username
                    createdAt
               }
               # commentCount
          }
     }
`;
