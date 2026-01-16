import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const qr = await prisma.qRCode.create({
    data: {
      serialNumber: body.serialNumber,
    },
  });

  return NextResponse.json(qr);
}

export async function GET() {
  const qrs = await prisma.qRCode.findMany();
  return NextResponse.json(qrs);
}
