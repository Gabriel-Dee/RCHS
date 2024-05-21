"use client"
import useUsers from '@/hooks/use-users';
import { FC } from 'react';


const UsersPage: FC = () => {
  const { users, loading } = useUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.username}) - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
