import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, phoneNumber, service, cost } = await request.json();

  try {
    const patient = await prisma.patient.upsert({

      where:{
        phone:phoneNumber
      },
      update:{
      appointments:{
        create:{
          service:service,
          price:cost
        }
      },
     
      },
      create:{
        name:name,
        phone:phoneNumber,
        appointments:{
          create:{
            service,price:cost
          }
        }
      }
    });
    return NextResponse.json({ message: "Patient saved", patient,status:true });
  } catch (error) {
    return NextResponse.json({ message: "Patient not saved", error ,status:false});
  }
}
