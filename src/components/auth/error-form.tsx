import React from 'react';
import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import Link from "next/link";


function ErrorForm() {
    return (
        <Card className={'w-[400px] shadow-md'}>
            <CardHeader>
                Something went wrong
            </CardHeader>
            <CardFooter>
                <Link href={'/sign-in'}>Back to login</Link>
            </CardFooter>
        </Card>
    );
}

export default ErrorForm;