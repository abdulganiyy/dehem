"use client";

import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";
import { qrCodeFormSchema } from "@/schema";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export default function VerifyPage() {
  const [serialNumber, setSerialNumber] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [copied, setCopied] = useState(false);
  const form = useForm<z.infer<typeof qrCodeFormSchema>>({
    resolver: zodResolver(qrCodeFormSchema),
    defaultValues: {
      serialNumber: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: { serialNumber: string }) => {
      const res = await axios.post("/api/qr", payload);

      return res.data;
    },
    onSuccess: (data) => {
      generateQRCode(data.serialNumber);
      setSerialNumber(data.serialNumber);
    },
    onError: (error) => {
      toast.error("Try again with a different serial number");
    },
  });

  const generateQRCode = async (serial: string) => {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify/${serial}`;
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: "H",
      type: "image/png",
      margin: 1,
      width: 300,
      color: {
        dark: "#1a1a1a",
        light: "#f5f5f0",
      },
    });
    setQrCode(qrDataUrl);
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${serialNumber}.png`;
    link.click();
  };

  const copySerialToClipboard = () => {
    navigator.clipboard.writeText(serialNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function onSubmit(data: z.infer<typeof qrCodeFormSchema>) {
    mutation.mutate(data);
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-tight">
            DEHEM
          </a>
          <a
            href="/"
            className="text-sm hover:text-muted-foreground transition-colors"
          >
            Back to Home
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Verify Your Shoes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate unique QR codes for product authentication. Each code
            verifies the authenticity of your DEHEM shoes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
                {/* Shoe Selection */}
                <form id="qrcode-form" onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup className="space-y-1">
                    <Controller
                      name="serialNumber"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="shoe-serialNumber">
                            Shoe Serial Number
                          </FieldLabel>
                          <Input
                            {...field}
                            id="fshoe-serialNumber"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter shoe serial number"
                            autoComplete="off"
                            className="bg-white"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    {/* Generate Button */}
                    <Button
                      disabled={mutation.isPending}
                      type="submit"
                      size="lg"
                      className="w-full text-base"
                    >
                      {mutation.isPending && <Spinner />}
                      Generate QR Code
                    </Button>
                  </FieldGroup>
                </form>

                {/* Serial Number Display */}
                {serialNumber && (
                  <div className="space-y-3 pt-6 border-t border-border">
                    <label className="block text-sm font-semibold tracking-widest text-muted-foreground">
                      SERIAL NUMBER
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary rounded-lg px-4 py-3 font-mono text-sm break-all">
                        {serialNumber}
                      </div>
                      <button
                        onClick={copySerialToClipboard}
                        className="p-3 hover:bg-secondary rounded-lg transition-colors"
                      >
                        {copied ? (
                          <Check size={20} className="text-green-600" />
                        ) : (
                          <Copy size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Download Button */}
                {qrCode && (
                  <Button
                    onClick={downloadQR}
                    variant="outline"
                    size="lg"
                    className="w-full text-base flex items-center justify-center gap-2 bg-transparent"
                  >
                    <Download size={20} />
                    Download QR Code
                  </Button>
                )}

                {/* Info Section */}
                <div className="bg-secondary rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground">
                    How it Works
                  </p>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Each QR code links to a unique verification page</li>
                    <li>• Customers scan to confirm authenticity</li>
                    <li>• Serial numbers are logged in our database</li>
                    <li>• Track ownership and warranty information</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - QR Preview */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-full max-w-sm bg-card rounded-2xl p-8 border border-border">
                {qrCode ? (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                      <img
                        src={qrCode || "/placeholder.svg"}
                        alt="QR Code"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="space-y-2 text-center">
                      <p className="text-xs text-muted-foreground font-mono">
                        {serialNumber}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="text-5xl opacity-50">📱</div>
                      <p className="text-sm text-muted-foreground">
                        QR Code Preview
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Generate a code to see it here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Info Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold">Security Features</h2>
              <p className="text-muted-foreground">
                Your DEHEM shoes come with multiple layers of authenticity
                protection
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Unique Serial Numbers",
                  description:
                    "Every pair has a unique identifier logged in our database",
                },
                {
                  title: "QR Code Authentication",
                  description:
                    "Scan to instantly verify the shoe's legitimacy and ownership history",
                },
                {
                  title: "Certificate of Authenticity",
                  description:
                    "Included with every purchase with holographic security features",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-background rounded-lg p-6 border border-border text-center space-y-3"
                >
                  <div className="text-3xl">✓</div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <p>&copy; 2026 DEHEM. Authenticity Guaranteed.</p>
            <p className="text-sm opacity-80">
              All QR codes are tracked and verified by STRIDE Shoes
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
