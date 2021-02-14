import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

// Context
import { AuthContext } from "./../context/auth";

// Custom hooks
import { useForm } from "./../util/hooks";

// Styling
import { Button, Form } from "semantic-ui-react";

export default function Register(props) {
     const context = useContext(AuthContext); // gives access to context

     const [errors, setErrors] = useState({});

     const { onChange, onSubmit, values } = useForm(registerUser, {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
     });

     const [addUser, { loading }] = useMutation(REGISTER_USER, {
          update(proxy, { data: { register: userData } }) {
               context.login(userData);
               props.history.push("/");
          },
          onError(err) {
               console.log(err);
               setErrors(err.graphQLErrors[0].extensions.exception.errors);
          },
          variables: values,
          errorPolicy: "all",
     });

     function registerUser() {
          addUser();
     }

     return (
          <div className="form-container">
               <Form
                    onSubmit={onSubmit}
                    noValidate
                    className={loading ? "loading" : ""}
               >
                    <h1>Register</h1>
                    <Form.Input
                         label="Username"
                         placeholder="Username.."
                         name="username"
                         type="text"
                         value={values.username}
                         errors={errors.username ? true : false}
                         onChange={onChange}
                    />
                    <Form.Input
                         label="Email"
                         placeholder="Email.."
                         name="email"
                         type="email"
                         value={values.email}
                         errors={errors.email ? true : false}
                         onChange={onChange}
                    />
                    <Form.Input
                         label="Password"
                         placeholder="Password.."
                         name="password"
                         type="password"
                         value={values.password}
                         errors={errors.password ? true : false}
                         onChange={onChange}
                    />
                    <Form.Input
                         label="Confirm Password"
                         placeholder="Confirm Password.."
                         name="confirmPassword"
                         type="password"
                         value={values.confirmPassword}
                         errors={errors.confirmPassword ? true : false}
                         onChange={onChange}
                    />
                    <Button type="submit" primary>
                         Register
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

const REGISTER_USER = gql`
     mutation register(
          $username: String!
          $email: String!
          $password: String!
          $confirmPassword: String!
     ) {
          register(
               registerInput: {
                    username: $username
                    email: $email
                    password: $password
                    confirmPassword: $confirmPassword
               }
          ) {
               id
               email
               username
               createdAt
               token
          }
     }
`;
