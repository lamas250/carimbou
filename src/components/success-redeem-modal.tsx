import { useEffect, useState } from "react";
import { PartyPopper } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
type SuccessModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClaim?: () => void;
  userPromotionId: string;
};

const SuccessRedeemModal = ({
  isOpen,
  onOpenChange,
  onClaim,
  userPromotionId,
}: SuccessModalProps) => {
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure modal is visible before animation
      const timer = setTimeout(() => {
        setAnimate(true);
        // Trigger confetti
        const canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.inset = "0";
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        canvas.style.zIndex = "999999";
        canvas.style.pointerEvents = "none";
        document.body.appendChild(canvas);

        const myConfetti = confetti.create(canvas, {
          resize: true,
          useWorker: true,
        });

        myConfetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
        });

        // Remove canvas after animation completes
        setTimeout(() => {
          document.body.removeChild(canvas);
        }, 5000);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card overflow-hidden">
        <div className="flex flex-col items-center p-6 text-center">
          <div
            className={`rounded-full bg-primary/10 p-5 mb-6 transition-all duration-1000 ${
              animate ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <PartyPopper className="h-12 w-12 text-primary" />
          </div>

          <h2
            className={`text-2xl font-bold mb-2 transition-all duration-700 ${
              animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Parabéns!
          </h2>

          <p
            className={`text-muted-foreground mb-6 transition-all duration-700 ${
              animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            Você completou seu cartão de fidelidade!
          </p>
          <p
            className={`text-muted-foreground mb-6 transition-all duration-700 text-sm ${
              animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            Comunique para a empresa que você completou o cartão e mostre a pagina do cartão.
          </p>

          <Button
            className={`w-full mb-2 transition-all duration-700 ${
              animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            Ver Cartão
          </Button>

          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className={`w-full transition-all duration-700 ${
              animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessRedeemModal;
