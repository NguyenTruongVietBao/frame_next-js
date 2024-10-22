"use server";

import {signIn} from "@/auth";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {LoginSchema} from "@/schemas/zod";
import bcrypt from "bcryptjs";
import {getUserByEmail} from "@/data/user";

export const loginSocial = async (provider: string) => {
    await signIn(provider, { redirectTo: '/settings'});
    revalidatePath('/settings');
};

export const login = async (values?: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password } = validatedFields.data;

    // Fetch user from the database using email
    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Email does not exist"};
    }

    // Compare provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, existingUser?.password);
    if (!isPasswordValid) {
        return { error: "Incorrect password" };
    }

    await signIn('credentials', {
        email,
        password,
        redirect: false
    });
    revalidatePath("/settings");

    return { success: "Login successful" };
};
