
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
export default function midddleware(request:NextRequest){
    const header=request.headers.get("Authorization");
    if(!header || !header.startsWith("Bearer")){
        return NextResponse.json({message:"Not Authorized"},{status:403})
    }
    const token=header?.split(" ")[1];
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET!) as {userId:string}
        const response = NextResponse.next();
        response.headers.set('X-User-Id', payload.userId);
        
        return response;
    }catch(error:any){

    return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }
}