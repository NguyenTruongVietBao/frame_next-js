import {SignInForm} from "@/components/auth/sign-in-form";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

export default async function SignInPage() {
    const session = await auth();
    if(session?.user){
        redirect("/settings");
    }
  return (
    <div>
        <SignInForm/>
    </div>
  )
}
