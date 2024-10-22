
import Image from "next/image";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import LogoutButton from "@/components/auth/logout-button";

const SettingsPage = async () => {

    const session = await auth();
    if(!session) {
        redirect('/')
    }

    return (
        <div>
            <h1>Settings Page</h1>
            <>
                <h2 className="text-xl">User Information</h2>
                <p><strong>Name:</strong> {session.user?.name}</p>
                <p><strong>Email:</strong> {session.user?.email}</p>
                <p><strong>Image:</strong></p>
                {session?.user?.image ? (
                    <Image
                        src={session?.user?.image}
                        alt="User avatar"
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                        <span>No Image</span>
                    </div>
                )}
                <LogoutButton />
            </>
        </div>
    );
};

export default SettingsPage;
