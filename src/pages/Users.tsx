import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getUsers, deleteUser, updateUser } from "@/services/User";
import { IUser } from "@/types/IUser";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-modal";
import useAlert from "@/hook/useAlert";

Modal.setAppElement("#root");

export default function Users() {
  const [data, setData] = useState<IUser[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);
  const [showAlert] = useAlert();

  async function getData() {
    const { data } = await getUsers();
    setData(data.users);
  }

  async function onDelete() {
    try {
      if (userToDelete) {
        const { data } = await deleteUser(userToDelete);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
        getData();
        showAlert("SUCCESS", data.message);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showAlert("WARNING", error.response?.data.message);
      } else {
        showAlert("WARNING", "An unexpected error occurred!");
      }
    }
  }

  async function onEdit() {
    try {
      if (
        userToEdit?.email &&
        userToEdit?.age &&
        userToEdit?.gender &&
        userToEdit?.lastname &&
        userToEdit?.name &&
        userToEdit?.username
      ) {
        if (
          userToEdit.email.includes("@gmail.com") ||
          userToEdit.email.includes("@hotmail.com")
        ) {
          if (userToEdit) {
            const { data } = await updateUser(userToEdit._id ?? "", userToEdit);
            setIsEditModalOpen(false);
            setUserToEdit(null);
            getData();
            showAlert("SUCCESS", data.message);
          }
        } else {
          showAlert("WARNING", "This is not a valid email!");
        }
      } else {
        showAlert("WARNING", "You must fill in all fields!");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showAlert("WARNING", error.response?.data.message);
      } else {
        showAlert("WARNING", "An unexpected error occurred!");
      }
    }
  }

  function openDeleteModal(id: string) {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  }

  function openEditModal(user: IUser) {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
    setUserToEdit(null);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col pt-2 grow pr-8">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="p-4 text-[#acacac] text-left">Name</th>
              <th className="p-4 text-[#acacac] text-left">Username</th>
              <th className="p-4 text-[#acacac]  text-left">Last Name</th>
              <th className="p-4 text-[#acacac] text-left">Email</th>
              <th className="p-4 text-[#acacac] text-left">Gender</th>
              <th className="p-4 text-[#acacac] text-left">Age</th>
              <th className="p-4 text-[#acacac] text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id} className="bg-white mb-2">
                <td className="p-4 border-b-8 border-[#f8f8f8]">{user.name}</td>
                <td className="p-4 border-b-8 border-[#f8f8f8]">
                  {user.username}
                </td>
                <td className="p-4 border-b-8 border-[#f8f8f8]">
                  {user.lastname}
                </td>
                <td className="p-4 border-b-8 border-[#f8f8f8]">
                  {user.email}
                </td>
                <td className="p-4 border-b-8 border-[#f8f8f8]">
                  {user.gender}
                </td>
                <td className="p-4 border-b-8 border-[#f8f8f8]">{user.age}</td>
                <td className="p-4 border-b-8 border-[#f8f8f8]">
                  <div className="flex items-center gap-2">
                    <MdEdit
                      className="cursor-pointer duration-200 active:scale-90"
                      size={22}
                      color="#feaf00"
                      onClick={() => openEditModal(user)}
                    />
                    <MdDelete
                      className="cursor-pointer duration-200 active:scale-90"
                      size={22}
                      color="#feaf00"
                      onClick={() => openDeleteModal(user._id!)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Madal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirm Deletion"
        className="flex flex-col justify-center flex-grow items-center min-h-full"
        style={{ content: { backgroundColor: "rgb(0, 0, 0, 0.5)" } }}
      >
        <div className="flex flex-col items-center bg-white p-6 w-4/12 rounded-md">
          <h2 className="text-lg">
            Are you sure you want to delete this user? You can't revert this
            process.
          </h2>
          <div className="mt-4">
            <button
              onClick={onDelete}
              className="bg-[#feaf00] text-white p-4 mr-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={closeDeleteModal}
              className="bg-[#acacac] text-white p-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal*/}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit User"
        className="flex flex-col justify-center flex-grow items-center min-h-full"
        style={{ content: { backgroundColor: "rgb(0, 0, 0, 0.5)" } }}
      >
        <div className="flex flex-col items-center bg-white p-6 w-4/12 rounded-md">
          <h2 className="text-lg font-bold">Edit User</h2>
          {userToEdit && (
            <div className="mt-4 w-full">
              <input
                type="text"
                value={userToEdit.name}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, name: e.target.value })
                }
                placeholder="Name"
                className="border p-4 rounded mb-2 w-full outline-none"
              />
              <input
                type="text"
                value={userToEdit.username}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, username: e.target.value })
                }
                placeholder="Username"
                className="border p-4 rounded mb-2 w-full outline-none"
              />
              <input
                type="text"
                value={userToEdit.lastname}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, lastname: e.target.value })
                }
                placeholder="Last Name"
                className="border p-4 rounded mb-2 w-full outline-none"
              />
              <input
                type="email"
                value={userToEdit.email}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, email: e.target.value })
                }
                placeholder="Email"
                className="border p-4 rounded mb-2 w-full outline-none"
              />
              <select
                value={userToEdit.gender}
                onChange={(e) =>
                  setUserToEdit({
                    ...userToEdit,
                    gender: e.target.value as "MALE" | "FEMALE",
                  })
                }
                className="border p-4 rounded mb-2 w-full outline-none"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              <input
                type="number"
                value={userToEdit.age}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, age: Number(e.target.value) })
                }
                placeholder="Age"
                className="border p-4 rounded mb-2 w-full outline-none"
              />
            </div>
          )}
          <div className="mt-4">
            <button
              onClick={onEdit}
              className="bg-[#feaf00] text-white p-4 mr-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={closeEditModal}
              className="bg-[#acacac] text-white p-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
