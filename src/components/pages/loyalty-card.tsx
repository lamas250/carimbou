"use client";

import { useState, useEffect } from "react";
import { CalendarCheck, History, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import SuccessModal from "../success-modal";
import LoyaltyStamp from "../loyalty-stamp";
import QRScanner from "../qrcode-scanner";

// This would normally come from a database
const DEMO_USER = {
  name: "John Doe",
  email: "john@example.com",
};

const LoyaltyCard = () => {
  const [stamps, setStamps] = useState<boolean[]>([]);
  const [isCardCompleted, setIsCardCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [history, setHistory] = useState<{ date: Date; action: string }[]>([]);

  // Simulate loading data from a server
  useEffect(() => {
    const timer = setTimeout(() => {
      // Demo data - would normally come from an API
      setStamps(
        Array(10)
          .fill(false)
          .map((_, i) => i < 3)
      );
      setHistory([
        { date: new Date("2023-08-15"), action: "Added stamp #1" },
        { date: new Date("2023-08-22"), action: "Added stamp #2" },
        { date: new Date("2023-08-29"), action: "Added stamp #3" },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Check if card is completed
  useEffect(() => {
    const completed = stamps.every((stamp) => stamp);
    setIsCardCompleted(completed && stamps.length === 10);
  }, [stamps]);

  const handleAddStamp = () => {
    const updatedStamps = [...stamps];
    const nextEmptyIndex = updatedStamps.findIndex((stamp) => !stamp);

    if (nextEmptyIndex !== -1) {
      updatedStamps[nextEmptyIndex] = true;
      setStamps(updatedStamps);

      // Add to history
      const newHistoryItem = {
        date: new Date(),
        action: `Added stamp #${nextEmptyIndex + 1}`,
      };
      setHistory([newHistoryItem, ...history]);

      toast("Carimbo adicionado com sucesso!");

      // Check if card is now complete
      if (updatedStamps.every((stamp) => stamp)) {
        setTimeout(() => {
          setShowSuccessModal(true);
        }, 500);
      }
    }
  };

  const handleClaimReward = () => {
    // Reset card after claiming
    setStamps(Array(10).fill(false));

    // Add to history
    const newHistoryItem = {
      date: new Date(),
      action: "Claimed free meal reward",
    };
    setHistory([newHistoryItem, ...history]);

    toast("Recompensa reivindicada com sucesso!");
  };

  const handleResetCard = () => {
    setStamps(Array(10).fill(false));

    // Add to history
    const newHistoryItem = {
      date: new Date(),
      action: "Reset loyalty card",
    };
    setHistory([newHistoryItem, ...history]);

    toast("Cartão de fidelidade reiniciado com sucesso!");
  };

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="py-8 sm:py-12">
          <h1 className="text-3xl font-bold mb-2">My Loyalty Card</h1>
          <p className="text-muted-foreground mb-8">Collect 10 stamps to earn a free meal</p>

          {isLoading ? (
            <Card className="glass-card">
              <CardContent className="py-10">
                <div className="flex justify-center items-center h-40">
                  <RefreshCw className="animate-spin h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card
                className={`loyalty-card mb-8 ${isCardCompleted ? "animate-card-complete" : ""}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Loyalty Card</CardTitle>
                      <CardDescription>
                        {stamps.filter(Boolean).length}/10 stamps collected
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{DEMO_USER.name}</p>
                      <p className="text-xs text-muted-foreground">{DEMO_USER.email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2 sm:gap-4">
                    {stamps.map((isStamped, index) => (
                      <LoyaltyStamp key={index} isStamped={isStamped} index={index} delay={index} />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <QRScanner onSuccess={handleAddStamp} />

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleResetCard}
                    className="btn-hover"
                    title="Reset Card"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    <span>Activity History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {history.length > 0 ? (
                    <div className="space-y-4">
                      {history.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border-b pb-3 border-border last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <CalendarCheck className="h-5 w-5 text-muted-foreground" />
                            <span>{item.action}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.date.toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">No activity yet</p>
                  )}
                </CardContent>
              </Card>

              <SuccessModal
                isOpen={showSuccessModal}
                onOpenChange={setShowSuccessModal}
                onClaim={handleClaimReward}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;
