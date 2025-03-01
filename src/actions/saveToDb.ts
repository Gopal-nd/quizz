// // app/actions/saveToDB.ts
// 'use server';

// import { NextResponse } from 'next/server';
// import { db } from '@/lib/db';
// import { getAuthSession } from '@/lib/auth';

// export async function saveToDB(quizResult: { gameType: string; attempted: number; score: number; percentage: string; }) {
//   try {
//     // Retrieve the session to ensure the user is authenticated
//     const session = await getAuthSession();
//     if (!session?.user?.email) {
//       return { stats: 401, error: 'Unauthorized' };
//     }

//     const { gameType, attempted, score, percentage } = quizResult;

//     // Find the user in the database by email
//     const user = await db.user.findUnique({
//       where: { email: session.user.email },
//     });

//     if (!user) {
//       return { stats: 404, error: 'User not found' };
//     }

//     console.log(gameType, attempted, score, percentage);
//     console.log(user);

//     // Create a new record in the Quizes table
//     // Uncomment the following code to enable actual DB saving:
//     // const quizRecord = await db.quizes.create({
//     //   data: {
//     //     userId: user.id,
//     //     gameType,
//     //     attempted,
//     //     score,
//     //     percentage: parseFloat(percentage),
//     //   },
//     // });

//     return { stats: 200 };
//   } catch (error) {
//     console.error('Error saving quiz result:', error);
//     return { stats: 500, error: 'Internal server error' };
//   }
// }
