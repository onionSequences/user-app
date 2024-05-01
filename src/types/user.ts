import { Timestamp } from 'firebase/firestore';

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
  createdAt?: Timestamp;
};

export type UserCreationData = Omit<User, 'createdAt' | 'id'>;

export type Users = User[];
