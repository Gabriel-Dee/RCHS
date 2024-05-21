"use client";
import { getUsers } from "@/app/lib/actions/users";
import { useEffect, useState } from "react";

export default function Home() {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((data) => {
      if (data.error) {
        return console.error(data.error)
      }
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map((user: any) => {
        return (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        );
      })}
    </div>
  );
}
