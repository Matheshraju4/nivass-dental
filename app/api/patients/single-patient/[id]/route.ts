import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const patient = await prisma.patient.findUnique({
    where: {
      id: id,
    },
    include: {
      appointments: true,
    },
  });

  console.log(patient)
  return Response.json({ patient });
}
