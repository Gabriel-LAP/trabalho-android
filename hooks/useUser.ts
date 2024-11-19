import { User } from "@/types/UserType";
import { useState } from "react";
import { deleteUser, getAllUsers, updateUser } from "@/services/userServices"

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>();
    

    const handleUsers = async () => {
        await getAllUsers() 
            .then((user) => {
                setUsers(user);
            })
            .catch((error: any) => {
                console.log(error);
                throw error;
            })
    }
    const handleUpdateUser = async (user: User) => {
        const resp = await updateUser(user);
        console.log(resp)

        return resp
    }

    const handleDeleteUser = async (user: User) => {
        const resp = await deleteUser(user);
        console.log(resp)
    }

    return {
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        handleUsers,
        handleUpdateUser,
        handleDeleteUser
    }
}

export { useUsers };