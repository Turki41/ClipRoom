import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const { userName, email, password } = await req.json()

        if (!email?.trim() || !password?.trim() || !userName?.trim()) {
            console.log('Missing fields in signup')
            return NextResponse.json({ message: 'Please fill all fields' }, { status: 400 })
        }

        const supabase = await createClient()

        const { data: authData, error: signUpError } = await supabase.auth.signUp({
            email: email.trim(),
            password: password.trim(),
        })

        if (signUpError) {
            console.log('Error in Sign up auth controller', signUpError)
            return NextResponse.json({ message: signUpError.message }, { status: 400 })
        }

        const insertUser = {
            id: authData.user?.id,
            email,
            userName: userName,
        }
        const { data: insertUserData, error: insertUserError } = await supabase.from('Users').insert(insertUser).select()

        if (insertUserError) {
            console.log('Error in inserting signed up user to db controller', insertUserError)
            return NextResponse.json({ message: 'Something went wrong' }, { status: 400 })
        }

        return NextResponse.json(
            {
                message: 'User created successfully',
                newUserDB: insertUserData
            },
            { status: 201 }
        )
    } catch (error) {
        console.log('Internal server error in signup controller', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}