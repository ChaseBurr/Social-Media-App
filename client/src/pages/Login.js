import gql from "graphql-tag";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { useForm } from "./../util/hooks";

import { Button, Form } from "semantic-ui-react";

export default function Login(props) {
     const [errors, setErrors] = useState({});

     const { onChange, onSubmit, values } = useForm(loginUserCallback, {
          username: "",
          password: "",
     });

     const [loginUser, { loading }] = useMutation(LOGIN_USER, {
          update(proxy, result) {
               props.history.push("/");
          },
          onError(err) {
               setErrors({ value: "Invalid Username or Password" });
          },
          variables: values,
     });

     function loginUserCallback() {
          loginUser();
     }

     return (
          <div className="form-container">
               <Form
                    onSubmit={onSubmit}
                    noValidate
                    className={loading ? "loading" : ""}
               >
                    <h1>Login</h1>
                    <Form.Input
                         label="Username"
                         placeholder="Username.."
                         name="username"
                         type="text"
                         value={values.username}
                         onChange={onChange}
                    />
                    <Form.Input
                         label="Password"
                         placeholder="Password.."
                         name="password"
                         type="password"
                         value={values.password}
                         onChange={onChange}
                    />
                    <Button type="submit" primary>
                         Login
                    </Button>
               </Form>
               {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                         <div className="list">
                              {Object.values(errors).map((value) => (
                                   <li key={value}>{value}</li>
                              ))}
                         </div>
                    </div>
               )}
          </div>
     );
}

const LOGIN_USER = gql`
     mutation login($username: String!, $password: String!) {
          login(registerInput: { username: $username, password: $password }) {
               id
               email
               username
               createdAt
               token
          }
     }
`;
