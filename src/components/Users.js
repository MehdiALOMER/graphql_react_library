import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// GraphQL Sorguları ve Mutasyonları
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      age
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const Users = ({ setSelectedUser }) => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (id) => {
    deleteUser({ variables: { id } });
  };

  return (
    <div className="users">
      <h2>Users</h2>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            <span onClick={() => setSelectedUser(user.id)}>
              {user.name} - {user.age} years old
            </span>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
