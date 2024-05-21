import { GetStaticProps, NextPage } from 'next';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  // Add other fields as necessary
}

interface UsersProps {
  users: User[];
}

export const getStaticProps: GetStaticProps<UsersProps> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: User[] = await res.json();

  return {
    props: { users: data }
  };
};

const Users: NextPage<UsersProps> = ({ users }) => {
  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.username}) - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
