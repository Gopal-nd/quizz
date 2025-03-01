// app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust the path to your Prisma client if needed

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export async function GET() {
  try {
    // Group quiz records by userId and sum the score for each user.
    const leaderboardData = await db.quizes.groupBy({
      by: ['userId'],
      _sum: { score: true },
      orderBy: {
        _sum: { score: 'desc' },
      },
      take: 10, // Get top 10 users
    });

    // For each grouped result, fetch user details
    const leaderboard = await Promise.all(
      leaderboardData.map(async (entry, index) => {
        const user = await db.user.findUnique({
          where: { id: entry.userId },
          select: { name: true, image: true },
        });
        return {
          rank: index + 1,
          userId: entry.userId,
          name: user?.name || 'Anonymous',
          image: user?.image,
          totalScore: entry._sum.score,
        };
      })
    );

    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
