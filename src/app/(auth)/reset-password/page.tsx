"use client";

import Loading from "@/app/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/auth-client";
import { AlertCircle, CircleIcon, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const res = await resetPassword({
      newPassword: password,
      token,
    });
    if (res.error) {
      toast.error(res.error.message);
    }
    setIsSubmitting(false);
    router.push("/sign-in");
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <CircleIcon className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
        </div>
        <Card className="border-none bg-transparent rounded-none shadow-none sm:mx-auto sm:w-full sm:max-w-md mt-4">
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">New password</Label>
                  <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="password"
                    placeholder="Password"
                    className="rounded-full"
                    type="password"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Confirm password</Label>
                  <Input
                    id="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="password"
                    placeholder="Password"
                    className="rounded-full"
                    type="password"
                  />
                </div>
              </div>
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button className="w-full mt-4 rounded-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Resetting..." : "Reset password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
