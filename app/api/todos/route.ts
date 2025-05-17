import { NextResponse,NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(request:NextRequest) {
   
        const todos = await prisma.todo.findMany({
          orderBy: { createdAt: 'desc' }
        });
      
        return NextResponse.json(todos);
      
      

   
}

export async function POST(request:NextRequest) {
    const { title,description,status }:any=request.json;
    const userId=request.headers.get('X-User-Id');
    if(!title || !status ){
        return NextResponse.json({message:"Invalid Arguments"},{status:201});
    }
    const todo=await prisma.todo.create({
        data:{
            title,
            description,
            status,
            userId
        }
    })
    if(!todo){
        return NextResponse.json({message:"Todo Creation Failed"},{status:500})
    }

    return NextResponse.json({message:"Created a todo"},{status:200})
}


export async function DELETE(request:NextRequest) {
    

    return NextResponse.json({message:"Create a todo"},{status:200})
}