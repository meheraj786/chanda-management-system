"use client";

import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EntryGuiltModal } from "@/components/EntryGuiltModal";
import { GuiltPopup } from "@/components/GuiltPopup";
import { DistrictChart } from "@/components/DistrictChart";
import { ProfessionChart } from "@/components/ProfessionChart";
import { ExpenseChart } from "@/components/ExpenseChart";
import { Leaderboard } from "@/components/Leaderboard";
import bannerBg from "@/public/bannerImg.png";
import { useEffect, useState } from "react";
import { donationAPI } from "@/lib/api";
import { Donations } from "@/components/Donations";

export default function HomePage() {
  const { isAuthenticated, user, logout } = useAuth();
    const [data, setData] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [amountLoading, setAmountLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await donationAPI.getAllDonations();
          setData(response.data.length);
          setTotalAmount(response.data.reduce((total: number, donation: any) => total + donation.amount, 0)); 
        } catch (error) {
          console.error('Error fetching donations:', error);
        } finally {
          setAmountLoading(false);
        }
      };
  
      fetchData();
      const interval = setInterval(fetchData, 30000); 
      return () => clearInterval(interval);
    }, []);

    console.log(totalAmount);
    

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-9999">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold"> 💰 চাঁন্দা Management</div>
          </div>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  স্বাগতম, {user?.email?.split("@")[0]}
                </span>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    চাঁদার ড্যাশ
                  </Button>
                </Link>
                <Button onClick={logout} variant="outline" size="sm">
                  আউট
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    সদস্য লগইন
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">সদস্য হও</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Entry Modal */}
      <EntryGuiltModal />

      {/* Guilt Popup */}
      <GuiltPopup />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center bg-cover bg-center py-30" style={{ backgroundImage: `url(${bannerBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          <div className="bg-black/10 backdrop-blur-[1px] py-20">
          <h1 className="text-4xl text-white font-bold mb-4">
            Welcome to 💰 চাঁন্দা Management
          </h1>
          <p className="text-lg  text-gray-200 mb-6 max-w-2xl mx-auto">
            যেখানে তোমার অপরাধবোধকে ঠান্ডা টাকায় কনভার্ট করা হয়। বিবেকের চাপ
            ছাড়ো, চাঁদা দিয়ে শান্তি কিনো 😏
          </p>
          </div>

          <Link href="/donate">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              এখনই চাঁন্দা দে
            </Button>
          </Link>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm  font-medium">
                টোটাল চাঁদা কালেকশন (আমাদের স্বপ্নের ফান্ড)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">৳ {amountLoading ? '...' : totalAmount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                বিবেকের মাল্টিপ্লিকেশন
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                বিবেক জাগ্রত আত্মারা
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{amountLoading ? '...' : data}</div>
              <p className="text-xs text-muted-foreground mt-1">
                ধরা খাওয়া পাব্লিক্স
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">জেলা সংখ্যা</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">64</div>
              <p className="text-xs text-muted-foreground mt-1">
                দেশের প্রতিটি কোণা
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DistrictChart />
          <ProfessionChart />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseChart />
          <Leaderboard />
        </section>
        <section className="grid grid-cols-1">
          <Donations />
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-12 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">
            হাজার হাজার মানুষের সাথে জয়েন করো
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            বিবেকের সাথে আর লড়াই করো না। হার মানো। চাঁদা দাও।
          </p>
          <Link href="/donate">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              এখনই চাঁন্দা দে
            </Button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t mt-12 py-8 text-center text-sm text-muted-foreground">
        <p>Chanda Management © 2024 - Where Guilt Meets Reality</p>
      </footer>
    </main>
  );
}
