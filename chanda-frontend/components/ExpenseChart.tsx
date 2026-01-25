'use client';

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const expenseData = [
  { name: 'অফিস মেইনটেইন', value: 40, color: '#ff7c7c' },
  { name: 'প্রোগ্রাম, মিটিং, র‍্যালি', value: 30, color: '#8dd1e1' },
  { name: 'বড় নেতা', value: 15, color: '#82ca9d' },
  { name: 'পাতি নেতা', value: 10, color: '#ffc658' },
  { name: 'অন্যান্য', value: 5, color: '#d084d0' },
];

export function ExpenseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle> চাঁন্দা খরচের খাত </CardTitle>
        <p className="text-xs text-muted-foreground mt-2">
          আপনার দেয়া চাঁন্দা আমরা সম্মান, ভালবাসা ও বিশ্বস্ততা  সঙ্গে ব্যয় করি 
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
