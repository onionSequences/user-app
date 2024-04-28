export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export type User = {
  id?: string;
  name: string;
  age: string;
  avatar: string;
  gender: Gender;
  createdAt?: string;
};

export type UserCreationData = Omit<User, 'createdAt' | 'id'>;

export type Users = User[];
