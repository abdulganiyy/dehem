-- CreateTable
CREATE TABLE "QRCode" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "scanCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_serialNumber_key" ON "QRCode"("serialNumber");
