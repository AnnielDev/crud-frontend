import { useEffect, useState } from "react";
import { getUsers } from "@/services/User";
import useAlert from "@/hook/useAlert";
import { IUser } from "@/types/IUser";
export default function Home() {
  const [showAlert] = useAlert();
  const [data, setData] = useState<IUser[]>([]);

  async function getData() {
    const { data } = await getUsers();
    setData(data.users);
  }

  useEffect(() => {
    getData();
  }, []);
  return <div></div>;
}
