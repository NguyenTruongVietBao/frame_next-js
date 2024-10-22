'use client';

import { logout } from "@/actions/logout";
import {useRouter} from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();
    const handleLogout = async () => {
        await logout();
        router.push('/sign-in')
    };

    return (
        <button
            onClick={handleLogout}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
            Sign Out
        </button>
    );
};

export default LogoutButton;
