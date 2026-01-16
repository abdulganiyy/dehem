import { z } from "zod";

export const qrCodeFormSchema = z.object({
  serialNumber: z
    .string({ message: "Invalid email address" })
    .min(8, { message: "Serial number must be up to 8 characters" }),
});

export type QRFormCodeFormValues = z.infer<typeof qrCodeFormSchema>;
