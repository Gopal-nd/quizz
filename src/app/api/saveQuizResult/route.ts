// app/api/saveQuizResult/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import type { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { gameType, attempted, score, percentage } = await request.json();
    
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Create a new record in the Quizes table
    const quizRecord = await db.quizes.create({
      data: {
        userId: user.id,
        gameType,
        attempted,
        score,
        percentage: parseFloat(percentage),
      },
    });
    
    return NextResponse.json(quizRecord, { status: 200, headers: {
      'Cache-Control': 'no-store, max-age=0',
    }, });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
