import http from "@/utils/http";
import { IUser } from "@/types/IUser";
import { AxiosResponse } from "axios";

type LoginType = {
  email: string;
  password: string;
};
// GET
export async function getUsers() {
  return http.get("users/getUsers").then((data) => data);
}

// POST
export async function createUsers(body: { data: IUser }) {
  return http.post("users/createUser", body).then((data) => data);
}

export async function loginUsers(
  body: LoginType
): Promise<AxiosResponse<{ user: IUser }>> {
  return http.post("users/loginUser", body).then((data) => data);
}

// DELETE
export async function deleteUser(userId: string) {
  return http.delete(`users/deleteUser/${userId}`).then((data) => data);
}

// UPDATE
export async function updateUser(userId: string, body: IUser) {
  return http.put(`users/updateUser/${userId}`, body).then((data) => data);
}
