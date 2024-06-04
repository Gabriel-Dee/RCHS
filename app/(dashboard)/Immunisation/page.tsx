"use client"
import useUsers from '@/hooks/use-users';
import { FC } from 'react';
 // Adjust the import path as necessary

const UsersPage: FC = () => {
  const { users, loading, error } = useUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.child_name}</h2>
          <p>{user.child_gender}</p>
          <p>{user.child_residence}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
