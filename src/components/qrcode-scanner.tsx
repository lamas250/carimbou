import { useState } from "react";
import { QrCode, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type QRScannerProps = {
  onSuccess: () => void;
};

const QRScanner = ({ onSuccess }: QRScannerProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This would normally connect to a real QR code scanner
  // For this demo, we'll simulate the process
  const handleScan = () => {
    setLoading(true);
    setError(null);

    // Simulate network request to validate QR code
    setTimeout(() => {
      setLoading(false);
      // Simulate successful scan 90% of the time
      if (Math.random() > 0.1) {
        onSuccess();
        setOpen(false);
      } else {
        setError("Invalid or expired QR code. Please try again.");
      }
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="glass-card w-full gap-2 py-6">
          <QrCode className="h-5 w-5" />
          <span>Scan Restaurant QR Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md glass-card">
        <DialogHeader>
          <DialogTitle>Scan Restaurant QR Code</DialogTitle>
          <DialogDescription>
            Ask the restaurant staff to provide their unique QR code to add a stamp to your loyalty
            card.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative h-64 w-64 overflow-hidden rounded-lg border border-border mb-4">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-sm">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <QrCode className="h-16 w-16 text-muted-foreground/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-48 w-48 border-2 border-primary/50 rounded-lg"></div>
                </div>
              </div>
            )}
          </div>
          {error && <p className="text-destructive text-sm mb-4">{error}</p>}
          <Button onClick={handleScan} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              "Tap to Scan"
            )}
          </Button>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
