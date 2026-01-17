import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const existingQr = await prisma.qRCode.findUnique({
    where: {
      serialNumber: body.serialNumber,
    },
  });

  if (existingQr) {
    return NextResponse.json(
      { error: "Qr already exists for this serial number" },
      { status: 400 }
    );
  }

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
