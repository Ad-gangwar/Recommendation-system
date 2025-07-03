import { NextRequest, NextResponse } from 'next/server';


const users = [
  {
    id: 'user1',
    history: ['prod1', 'prod3', 'prod5'],
  }
];

const products = [
  { id: 'prod1', name: 'Blood Glucose Monitor', category: 'diabetes' },
  { id: 'prod2', name: 'Insulin Pen', category: 'diabetes' },
  { id: 'prod3', name: 'Stethoscope', category: 'cardiology' },
  { id: 'prod4', name: 'Blood Pressure Monitor', category: 'cardiology' },
  { id: 'prod5', name: 'Orthopedic Support', category: 'orthopedics' },
  { id: 'prod6', name: 'Glucometer Strips', category: 'diabetes' },
  { id: 'prod7', name: 'ECG Machine', category: 'cardiology' },
  { id: 'prod8', name: 'Knee Brace', category: 'orthopedics' },
];

const recommendations: Record<string, string[]> = {
  prod1: ['prod2', 'prod6'],
  prod3: ['prod4', 'prod7'],
  prod5: ['prod8'],
  'category:diabetes': ['prod2', 'prod6'],
  'category:cardiology': ['prod4', 'prod7'],
  'category:orthopedics': ['prod8'],
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }
  const user = users.find(u => u.id === userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const recSet = new Set<string>();
  user.history.forEach(pid => {
    if (recommendations[pid]) {
      recommendations[pid].forEach(r => recSet.add(r));
    }

    const prod = products.find(p => p.id === pid);
    if (prod && recommendations[`category:${prod.category}`]) {
      recommendations[`category:${prod.category}`].forEach(r => recSet.add(r));
    }
  });

  const recProducts = Array.from(recSet)
    .map(rid => products.find(p => p.id === rid))
    .filter(Boolean);

  return NextResponse.json({ recommendations: recProducts });
} 