import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      age
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($name: String!, $age: Int!) {
    addUser(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

const UserForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [addUser, { error }] = useMutation(ADD_USER, {
        // Kullanıcı eklendikten sonra kullanıcı listesini yeniden sorgular
        refetchQueries: [{ query: GET_USERS }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !age || isNaN(age)) {
            alert("Name and Age are required, and Age must be a valid number!");
            return;
        }
        try {
            await addUser({ variables: { name, age: parseInt(age, 10) } });
            setName('');
            setAge('');
        } catch (err) {
            console.error(err);
            alert("An error occurred while adding the user.");
        }
    };

    if (error) {
        console.error(error.message);
    }

    return (
        <div className="user-form">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default UserForm;