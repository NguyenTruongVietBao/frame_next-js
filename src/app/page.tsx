import Link from "next/link";
import {auth} from "@/auth";

export default async function Home() {
    const session = await auth();

  return (
    <div>
        {session ? (
            <>
                <div>Home Page</div>
            </>
        ) : (
            <Link href={'/sign-in'}>Login</Link>
        )}
    </div>
  )
}
