import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export const checkAuth = async (req: NextRequest) => {
    try {
        const supabase = await createClient()

        const { data: {user}, error: getUserError } = await supabase.auth.getUser()

        if (getUserError || !user) {
            console.log('Error in getUser in auth middleware', getUserError)
            return NextResponse.redirect(new URL('/login', req.url))
        }

        return NextResponse.next()

    } catch (error) {
        console.log('Error in auth middleware', error)
        return NextResponse.redirect(new URL('/', req.url))
    }
}
