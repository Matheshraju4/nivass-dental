import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, phoneNumber, service, cost } = await request.json();

  try {
    const patient = await prisma.patient.create({
      data: {
        name,
        phone: phoneNumber,
        service,
        price: cost,
      },
    });
    return NextResponse.json({ message: "Patient saved", patient });
  } catch (error) {
    return NextResponse.json({ message: "Patient not saved", error });
  }
}
