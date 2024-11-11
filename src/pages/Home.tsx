import { useEffect, useState } from "react";
import { getUsers } from "@/services/User";
import { IUser } from "@/types/IUser";
export default function Home() {
  const [, setData] = useState<IUser[]>([]);

  async function getData() {
    const { data } = await getUsers();
    setData(data.users);
  }

  useEffect(() => {
    getData();
  }, []);
  return <div></div>;
}
