"use client";

import { useEffect, useState } from "react";
import { donationAPI } from "@/lib/api";
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

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  totalDonated: number;
  donationCount: number;
  tier: string;
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await donationAPI.getLeaderboard();
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Donators Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>টপ ১০ 'ভালো মানুষ' প্রতিযোগিতার বিজয়ী</CardTitle>
        <p className="text-xs text-muted-foreground mt-2">
          যারা ভাবছে চাঁদা দিলে স্বর্গে সিট কনফার্ম
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Total Donated</TableHead>
                <TableHead>Donations</TableHead>
                <TableHead>Tier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((entry) => (
                <TableRow key={entry.userId}>
                  <TableCell className="font-bold">#{entry.rank}</TableCell>
                  <TableCell className="font-medium">
                    {entry.username}
                  </TableCell>
                  <TableCell>৳ {entry.totalDonated.toLocaleString()}</TableCell>
                  <TableCell>{entry.donationCount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{entry.tier}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
