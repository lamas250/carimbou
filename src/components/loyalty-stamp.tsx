import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type LoyaltyStampProps = {
  isStamped: boolean;
  index: number;
  addStamp?: () => void;
  isEditable?: boolean;
  delay?: number;
};

const LoyaltyStamp = ({
  isStamped,
  index,
  addStamp,
  isEditable = false,
  delay = 0,
}: LoyaltyStampProps) => {
  const [visible, setVisible] = useState(false);
  const [stamped, setStamped] = useState(false);

  // Handle entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100 + delay * 100);

    return () => clearTimeout(timer);
  }, [delay]);

  // Handle stamp animation
  useEffect(() => {
    if (isStamped && !stamped) {
      setStamped(true);
    }
  }, [isStamped, stamped]);

  return (
    <div
      className={cn(
        "flex aspect-square items-center justify-center rounded-full transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        stamped ? "scale-100" : "scale-95"
      )}
      style={{ transitionDelay: `${delay * 50}ms` }}
    >
      <button
        onClick={isEditable && addStamp ? addStamp : undefined}
        disabled={!isEditable || isStamped}
        className={cn(
          "relative aspect-square w-full max-w-[70px] rounded-full border transition-all duration-300",
          isEditable && !isStamped
            ? "cursor-pointer hover:shadow-md active:scale-95"
            : "cursor-default",
          isStamped
            ? "bg-primary/10 border-primary shadow-inner"
            : "bg-white/80 dark:bg-white/5 border-border shadow-sm"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-primary rounded-full transition-all duration-500",
            isStamped ? "opacity-100 animate-stamp" : "opacity-0"
          )}
        >
          <Check className="w-8 h-8" strokeWidth={3} />
        </div>
        {!isStamped && (
          <span className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm font-medium">
            {index + 1}
          </span>
        )}
      </button>
    </div>
  );
};

export default LoyaltyStamp;
