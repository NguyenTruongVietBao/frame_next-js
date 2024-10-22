import {NextAuthConfig} from "next-auth";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import {LoginSchema} from "@/schemas/zod";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";

export default {
    providers: [
        GitHub,
        Google,
        Credentials({
            async authorize (credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if(validatedFields.success){
                    const {email, password} = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if(!user || !user.password){
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (passwordMatch) {
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig