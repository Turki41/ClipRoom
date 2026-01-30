import { NextResponse } from "next/server";

export const GET = async (request: Request, params: Promise<{ id: string }>) => {
    try {
        const { id } = await params;
        
    
        return NextResponse.json({ message: `Video ID is ${id}` }, { status: 200 });
    } catch (error) {
        console.error("Error fetching video by ID:", error);
        return NextResponse.json({ message: `Internal server error` }, { status: 500 });
    }
}