import React from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL Sorgusu
const GET_USER_DETAIL = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      name
      age
    }
  }
`;

const UserDetail = ({ userId, setSelectedUser }) => {
    const { loading, error, data } = useQuery(GET_USER_DETAIL, {
        variables: { id: userId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="user-detail">
            <h2>User Details</h2>
            <p>
                <strong>Name:</strong> {data.user.name}
            </p>
            <p>
                <strong>Age:</strong> {data.user.age}
            </p>
            <button onClick={() => setSelectedUser(null)}>Back</button>
        </div>
    );
};

export default UserDetail;
