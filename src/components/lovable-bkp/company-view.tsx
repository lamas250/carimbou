"use client";

import { useState } from "react";
import { QrCode, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const RestaurantLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState("igor@itafera.com");
  const [password, setPassword] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo login - normally would call an API
    if (email && password) {
      setIsLoggedIn(true);
      setRestaurantName(email.split("@")[0] + "'s Restaurant");

      toast.success("Logged In", {
        description: "You are now logged in as a restaurant owner.",
        duration: 3000,
      });
    } else {
      toast.error("Login Failed", {
        description: "Please enter both email and password.",
        duration: 3000,
      });
    }
  };

  const handleValidateCustomer = () => {
    if (!customerCode) {
      toast.error("Validation Failed", {
        description: "Please enter a customer code.",
        duration: 3000,
      });
      return;
    }

    setIsValidating(true);

    // Simulate API call
    setTimeout(() => {
      setIsValidating(false);
      setCustomerCode("");

      toast.success("Stamp Added!", {
        description: "You've successfully added a stamp to the customer's card.",
        duration: 3000,
      });
    }, 1500);
  };

  const handleGenerateQRCode = () => {
    setIsGeneratingQR(true);

    // Simulate QR code generation
    setTimeout(() => {
      setIsGeneratingQR(false);

      toast.success("QR Code Generated", {
        description: "Your unique QR code is ready to be scanned.",
        duration: 3000,
      });
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");

    toast.success("Logged Out", {
      description: "You have been logged out.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">{restaurantName}</h1>
              <p className="text-muted-foreground">Restaurant Dashboard</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <Tabs defaultValue="validate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="validate">Validate Customer</TabsTrigger>
              <TabsTrigger value="qrcode">Generate QR Code</TabsTrigger>
            </TabsList>

            <TabsContent value="validate">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Add Stamp to Customer Card</CardTitle>
                  <CardDescription>
                    Enter the customer&apos;s validation code or scan their QR code.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="customer-code">Customer Code</Label>
                      <Input
                        id="customer-code"
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)}
                      />
                    </div>

                    <Button
                      onClick={handleValidateCustomer}
                      disabled={isValidating}
                      className="w-full gap-2"
                    >
                      {isValidating ? (
                        <>Validating...</>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          <span>Add Stamp</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Each customer receives a unique code when they visit.
                  </p>
                </CardFooter>
              </Card>

              <div className="mt-6">
                <CustomerListDemo />
              </div>
            </TabsContent>

            <TabsContent value="qrcode">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Generate Restaurant QR Code</CardTitle>
                  <CardDescription>
                    Create a unique QR code for customers to scan and add stamps.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-64 h-64 border border-border rounded-lg mb-6 flex items-center justify-center bg-white/50 dark:bg-black/20">
                    {isGeneratingQR ? (
                      <div className="animate-pulse text-muted-foreground">Generating...</div>
                    ) : (
                      <QrCode className="w-32 h-32 text-primary/80" />
                    )}
                  </div>

                  <Button
                    onClick={handleGenerateQRCode}
                    className="w-full mb-4"
                    disabled={isGeneratingQR}
                  >
                    Generate New QR Code
                  </Button>

                  <Button variant="outline" className="w-full">
                    Download QR Code
                  </Button>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground text-center w-full">
                    For security, QR codes expire after 24 hours. Generate a new one as needed.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Demo customer list component
const CustomerListDemo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          View Recent Customers
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recent Customers</DialogTitle>
          <DialogDescription>Customers who recently used your loyalty program.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {[
            { name: "Alice Smith", email: "alice@example.com", stamps: 7, lastVisit: "Yesterday" },
            { name: "Bob Johnson", email: "bob@example.com", stamps: 4, lastVisit: "3 days ago" },
            {
              name: "Carol Williams",
              email: "carol@example.com",
              stamps: 9,
              lastVisit: "Last week",
            },
            { name: "Dave Brown", email: "dave@example.com", stamps: 2, lastVisit: "2 weeks ago" },
          ].map((customer, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-3 border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-xs text-muted-foreground">{customer.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{customer.stamps}/10</p>
                <p className="text-xs text-muted-foreground">{customer.lastVisit}</p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantLogin;
