import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: { serial: string };
};

export async function GET(_req: Request, { params }: Params) {
  const { serial } = await params;

  if (!serial) {
    return NextResponse.json(
      { error: "Qr serial number is required" },
      { status: 400 }
    );
  }

  const qr = await prisma.qRCode.findUnique({
    where: { serialNumber: serial },
  });

  if (!qr) {
    return NextResponse.json({ error: "Qr not found" }, { status: 404 });
  }

  return NextResponse.json(qr);
}
