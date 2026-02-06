import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    try {
        const supabase = await createClient()
        const { data: AuthUser , error: getSessionError } = await supabase.auth.getUser()

        if (getSessionError || !AuthUser) {
            console.log('No active session found.', getSessionError)
            return NextResponse.json({ message: 'No User Found' }, { status: 404 })
        }

        const { data: user, error: getUserError } = await supabase.from('Users').select('*').eq('id', AuthUser.user.id).single()

        if (getUserError) {
            console.error('Error fetching user data:', getUserError)
            return NextResponse.json({ message: 'No User Found' }, { status: 404 })
        }

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error('Error checking authentication:', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}