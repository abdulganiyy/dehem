"use client";

import { useParams } from "next/navigation";
import { CheckCircle, AlertCircle, Package, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function VerificationResultPage() {
  const params = useParams();
  const serial = params.serial as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["qrcode"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/qr/${serial}`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        return res.json();
      } catch (error) {
        console.log(error);
      }
    },
  });

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

      {/* Main Content */}
      <section className="py-12 px-4 min-h-screen">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Verification Status */}
          <div
            className={`rounded-2xl p-8 border-2 ${
              data ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start gap-4">
              {data ? (
                <CheckCircle className="text-green-600 shrink-0" size={40} />
              ) : (
                <AlertCircle className="text-red-600 shrink-0" size={40} />
              )}
              <div className="space-y-2">
                <h1
                  className={`text-3xl font-bold ${
                    data ? "text-green-900" : "text-red-900"
                  }`}
                >
                  {data ? "✓ VERIFIED AUTHENTIC" : "⚠ UNVERIFIED"}
                </h1>
                <p
                  className={`text-lg ${
                    data ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {data
                    ? "This is a genuine DEHEM shoe. Thank you for choosing authenticity."
                    : "We could not verify this shoe. Please check the serial number."}
                </p>
              </div>
            </div>
          </div>

          {/* Failed Verification Info */}
          {error && !isLoading && (
            <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Serial Number Not Found</h3>
                <p className="text-muted-foreground">
                  Serial:{" "}
                  <span className="font-mono font-semibold">{serial}</span>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We couldn't find this serial number in our database. This
                  could mean:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• The QR code may be from an unauthorized seller</li>
                  <li>• The serial number may have been entered incorrectly</li>
                  <li>• The shoe may not be an authentic STRIDE product</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                  <strong>Caution:</strong> We recommend not purchasing shoes
                  with unverifiable serial numbers. If you believe you have
                  received a counterfeit product, please contact our support
                  team immediately.
                </p>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  Report Counterfeit
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          )}

          {/* QR Code Info */}
          <div className="bg-background rounded-2xl border border-border p-6 space-y-4">
            <div className="flex items-center gap-2">
              <QrCode size={20} className="text-primary" />
              <p className="font-semibold">About This Verification</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each DEHEM shoe comes with a unique QR code that links directly to
              this verification page. Every time someone scans the code, it
              confirms the shoe's authenticity in our database. We take
              counterfeit prevention seriously to protect our customers.
            </p>
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
