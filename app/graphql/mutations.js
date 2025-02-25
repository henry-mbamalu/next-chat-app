import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(signUpInput: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(signInInput: { username: $username, password: $password }) {
      accessToken
      username
    }
  }
`;
