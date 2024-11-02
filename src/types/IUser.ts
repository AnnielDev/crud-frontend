export interface IUser {
  _id?: string;
  name: string;
  username: string;
  lastname: string;
  email: string;
  gender: "MALE" | "FEMALE";
  age: number;
}
