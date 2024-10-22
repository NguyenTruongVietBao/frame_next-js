/**
 * Send mail to reset password
 */

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

function ForgotPasswordForm() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Forgot Password ?</CardTitle>
                    <CardDescription>Reset your password</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input placeholder={'Type your email !'}/>
                </CardContent>
                <CardFooter>
                    <Button>Send</Button>
                </CardFooter>
            </Card>

        </div>
    );
}

export default ForgotPasswordForm;