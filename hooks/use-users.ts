// hooks/useUsers.ts
import { useState, useEffect } from 'react';

interface User {
  id: number;
  child_name: string;
  healthcare_centre_name: string;
  child_number: number;
  child_gender: string;
  date_of_birth: string;
  weight_at_birth: number;
  length_at_birth: number;
  place_of_birth: string;
  maternal_health_worker: string;
  child_residence: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/child/');
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useUsers;
