import React, { useState } from 'react';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import UserForm from './components/UserForm';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <h1>GraphQL React App</h1>
      {selectedUser ? (
        <UserDetail userId={selectedUser} setSelectedUser={setSelectedUser} />
      ) : (
        <>
          <UserForm />
          <Users setSelectedUser={setSelectedUser} />
        </>
      )}
    </div>
  );
};

export default App;
