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

export default function HomePage() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold"> 💰 চাঁন্দা Management</div>
          </div>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.email?.split("@")[0]}
                </span>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={logout} variant="outline" size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Register</Button>
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
        <section className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to 💰 চাঁন্দা Management
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Where donations are tracked, guilt is weaponized, and shame is a
            sport. Join thousands of people escaping (or failing to escape) the
            burden of chanda.
          </p>
          <Link href="/donate">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Donate Now & Feel the Guilt
            </Button>
          </Link>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Total Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">৳ 1,245,000</div>
              <p className="text-xs text-muted-foreground mt-1">
                Guilt multiplied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Active Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">542</div>
              <p className="text-xs text-muted-foreground mt-1">
                People in denial
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Districts Suffering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">64</div>
              <p className="text-xs text-muted-foreground mt-1">
                All of Bangladesh
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

        {/* CTA Section */}
        <section className="bg-muted py-12 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Guilt Parade</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Stop fighting your conscience. Give in. Donate. Let the guilt
            consume you.
          </p>
          <Link href="/donate">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Start Donating
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
