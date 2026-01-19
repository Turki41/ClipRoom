import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const { email, password } = await req.json()

        if (!email?.trim() || !password?.trim()) {
            console.log('Missing fields in login')
            return NextResponse.json({ message: 'Please fill all fields' }, { status: 400 })
        }

        const supabase = await createClient()

        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password })

        if (loginError) {
            console.log('Login error in login controller', loginError.message)
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
        }

        const { data: user, error: fetchUserError } = await supabase.from('Users').select('*').eq('id', loginData.user.id).single()

        if (fetchUserError) {
            console.log('Error fetching user data after login', fetchUserError)
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
        }

        return NextResponse.json({ user: user }, { status: 200 })

    } catch (error) {
        console.log('Server error in login controller', error)
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
    }
}