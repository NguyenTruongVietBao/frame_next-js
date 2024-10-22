'use server';

import * as z from "zod";
import bcrypt from "bcryptjs";
import {getUserByEmail} from "@/data/user";
import {RegisterSchema} from "@/schemas/zod";
import {prisma} from "@/lib/prisma";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields"};
    }
    const{ email, password, name} = validatedFields.data;

    const hashPassword = await bcrypt.hash(password, 10);

    const exitingUser = await getUserByEmail(email);

    if(exitingUser){
        return {error: "Email already exists"};
    }

    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashPassword,
        }
    });

    return {success: "Confirm email sent !"};
};
