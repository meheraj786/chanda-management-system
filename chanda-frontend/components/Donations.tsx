'use client';

import { useEffect, useState } from 'react';
import { donationAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface LeaderboardEntry {
  _id: string;
  name: string;
  profession: string;
  district: string;
  amount: number;
  createdAt: string;
}

export function Donations() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await donationAPI.getAllDonations();
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  console.log(leaderboard, "donations");

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
    <Card className='max-h-[50vh] min-h-[30vh] overflow-hidden relative'>
      <CardHeader>
        <CardTitle>চাঁদা দানকারীগণ </CardTitle>
        <p className="text-xs text-muted-foreground mt-2">
          উপরওয়ালা এনাদের মঙ্গল করুক 
        </p>
      </CardHeader>
<CardContent className='overflow-auto h-full pb-32 relative'>
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>নাম</TableHead>
          <TableHead>পেশা</TableHead>
          <TableHead>জেলা</TableHead>
          <TableHead>চাঁদার পরিমাণ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard.map((entry) => (
          <TableRow key={entry._id}>
            <TableCell className="font-medium">
              {entry.name}
            </TableCell>
            <TableCell>{entry.profession || '-'}</TableCell>
            <TableCell>{entry.district || '-'}</TableCell>
            <TableCell className="font-bold text-green-600">
              ৳ {entry.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>


</CardContent>
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </Card>
  );
}
