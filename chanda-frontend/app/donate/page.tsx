"use client";

import React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { donationAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const PROFESSIONS = [
  { value: "Doctor", minAmount: 5000 },
  { value: "Engineer", minAmount: 4000 },
  { value: "Teacher", minAmount: 1000 },
  { value: "Student", minAmount: 10 },
  { value: "Businessman", minAmount: 10000 },
  { value: "Unemployed", minAmount: 1 },
  { value: "Others", minAmount: 100 },
];

const DISTRICTS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Rangpur",
  "Mymensingh",
  "Comilla",
  "Narayanganj",
  "Pabna",
  "Jashore",
  "Jhenaidah",
  "Bogra",
  "Dinajpur",
  "Kurigram",
  "Gazipur",
  "Shariatpur",
  "Madaripur",
  "Faridpur",
  "Tangail",
  "Munshiganj",
  "Pirojpur",
  "Jhalokati",
  "Patuakhali",
  "Bhola",
  "Sunamganj",
  "Habiganj",
  "Maulvibazar",
  "Lalmonirhat",
  "Nilphamari",
  "Thakurgaon",
  "Panchagarh",
  "Netrokona",
  "Kishoreganj",
  "Jamalpur",
  "Sherpur",
  "Barguna",
  "Satkhira",
  "Bagerhat",
  "Piridpur",
  "Chunarughat",
  "Feni",
  "Noakhali",
  "Chandpur",
  "Cox's Bazar",
  "Bandarban",
  "Khagrachari",
  "Rajbari",
  "Narail",
  "Manikganj",
  "Gopalganj",
  "Narsingdi",
  "Habiganj",
  "Netrokona",
  "Sunamganj",
  "Brahmanbaria",
  "Habiganj",
  "Moulvibazar",
  "Sylhet",
  "Sunamganj",
  "Barisal",
  "Bhola",
  "Jhalokati",
  "Patuakhali",
  "Pirojpur",
];

export default function DonatePage() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [district, setDistrict] = useState("");
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const selectedProfession = PROFESSIONS.find((p) => p.value === profession);
  const minAmount = selectedProfession?.minAmount || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !profession || !district || !amount) {
      setError("All fields are required");
      return;
    }

    if (amount < minAmount) {
      setError(`${profession}s should donate at least BDT ${minAmount}`);
      return;
    }

    setLoading(true);

    try {
      await donationAPI.createDonation({
        name,
        profession,
        district,
        amount,
      });

      setSuccess(true);
      toast({
        title: "Donation Successful!",
        description: "Thanks! Your chanda will fund more guilt popups. 😈",
        duration: 5000,
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Donation failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">
              Thank You for Your Guilt!
            </h2>
            <p className="text-muted-foreground mb-4">
              Your donation has been recorded. The guilt gods are pleased.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting you back home...
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-80">
            💰 চাঁন্দা Management
          </Link>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" size="sm">
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Guilt Transfer Portal</CardTitle>
            <p className="text-muted-foreground mt-2">
              Convert your guilt into cold hard donations. No card needed. All
              fake.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name *
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="profession" className="text-sm font-medium">
                    Profession *
                  </label>
                  <Select value={profession} onValueChange={setProfession}>
                    <SelectTrigger id="profession">
                      <SelectValue placeholder="Select profession" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFESSIONS.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.value} (Min: BDT {p.minAmount})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="district" className="text-sm font-medium">
                    District *
                  </label>
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger id="district">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {DISTRICTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Donation Amount: BDT {amount}
                  </label>
                  <Slider
                    id="amount"
                    min={minAmount}
                    max={100000}
                    step={100}
                    value={[amount]}
                    onValueChange={(value) => setAmount(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Min: BDT {minAmount}</span>
                    <span>Max: BDT 100,000</span>
                  </div>
                </div>
              </div>

              {isAuthenticated && (
                <Alert>
                  <AlertDescription>
                    Logged in as: {user?.email} - This donation will be linked
                    to your account.
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Suggested Donations by Profession:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {PROFESSIONS.map((p) => (
                    <li key={p.value}>
                      {p.value}: BDT {p.minAmount} to BDT {p.minAmount * 10}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={loading}
              >
                {loading ? "Processing Guilt..." : "Donate & Embrace Guilt"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
