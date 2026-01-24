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
  { name: 'Microphone Setup', value: 40, color: '#ff7c7c' },
  { name: 'Food & Drinks', value: 30, color: '#8dd1e1' },
  { name: 'Sound System', value: 15, color: '#82ca9d' },
  { name: 'Decorations', value: 10, color: '#ffc658' },
  { name: 'Admin Fees', value: 5, color: '#d084d0' },
];

export function ExpenseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mock Expense Breakdown</CardTitle>
        <p className="text-xs text-muted-foreground mt-2">
          Where your guilt money goes... or should go 🤥
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
