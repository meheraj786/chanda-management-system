"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userAPI } from "@/lib/api";

interface Donation {
  _id: string;
  name: string;
  profession: string;
  district: string;
  amount: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { user, loading: authLoading, logout, isAuthenticated } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    const fetchDonations = async () => {
      try {
        const response = await userAPI.getUserDonations();
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchDonations();
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">Loading your guilt journey...</div>
        </div>
      </main>
    );
  }

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-80">
            💰 চাঁন্দা Management
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                হোম
              </Button>
            </Link>
            <Link href="/donate">
              <Button size="sm">চাঁন্দা</Button>
            </Link>
            <Button onClick={logout} variant="outline" size="sm">
              আউট
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Profile Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your Guilt Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-lg font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tier</p>
                  <div className="mt-1">
                    <Badge variant="secondary">Basic Guilt Participant</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-lg font-medium">
                    {user?.id ? new Date().toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Total Donated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ৳ {totalDonated.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                You've succumbed to the guilt
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Number of Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{donations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Times you couldn't say no
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Donations History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Donation History</CardTitle>
              <Link href="/donate">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Add Another Donation
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {donations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  You haven't donated yet. Time to embrace the guilt!
                </p>
                <Link href="/donate">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Make Your First Donation
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Profession</TableHead>
                      <TableHead>District</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation._id}>
                        <TableCell className="font-medium">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ৳ {donation.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{donation.profession}</Badge>
                        </TableCell>
                        <TableCell>{donation.district}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Motivational Section */}
        <Card className="mt-8 bg-muted">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold mb-2">দানের ধারা অব্যাহত রাখো!</h3>
            <p className="text-muted-foreground mb-4">
              তোমার দানের রেকর্ডই প্রমাণ – তুমি আমাদের সবচেয়ে ফেভারিট
              "স্বেচ্ছায়" দাতা। যত বেশি দান করবে, লিডারবোর্ডে তত উপরে উঠবে।
              অথবা না-ও উঠতে পারো। কে জানে? 😜
            </p>
            <div className="flex gap-4">
              <Link href="/donate">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  আরো চাঁন্দা দে
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">চাঁন্দা লিডারবোর্ড</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
