import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}