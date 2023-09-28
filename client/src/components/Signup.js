import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      id
      name
      email
      // add any other fields you want to retrieve after signup
    }
  }
`;

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { error }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      // Handle the successful signup, you might not get a token directly according to your schema
    },
    onError: (err) => {
      console.error('Signup error', err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ variables: { username: name, email, password } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Signup;
