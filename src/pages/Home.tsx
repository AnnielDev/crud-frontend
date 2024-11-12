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
  return (
    <div className="pt-2 grow pr-8">
      <div className="border-b-2">
        <h1 className="font-bold text-[22px]">User List</h1>
      </div>
    </div>
  );
}
