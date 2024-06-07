export type Role = 'user' | 'admin';

export type User = {
  id: string;
  role: Role;
  login: string;
  password: string;
};

export type Todo = {
  id: number;
  title: string;
  text: string;
  status: 'active' | 'completed';
};
