import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const loginSignup = async (req: NextRequest) => {
    try {
        const supabase = await createClient()

        const { data: {user}, error } = await supabase.auth.getUser()

        if (user) {
            return NextResponse.redirect(new URL('/', req.url))
        }

        return NextResponse.next()
    } catch (error) {
        console.log('Error in login-signup middleware', error)
        return NextResponse.redirect(new URL('/', req.url))
    }
}