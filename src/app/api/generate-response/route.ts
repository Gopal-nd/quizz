import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { title, description, inputValue } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Missing required field: title.' },
        { status: 400 }
      );
    }

    // Use default description if not provided.
    const finalDescription =
      description || `Generate 3 quiz questions for the category "${title}".`;

    const apiKey = process.env.NEXT_GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing API key.' },
        { status: 500 }
      );
    }

    // Instantiate the Gemini model from Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `${title}: ${finalDescription}${
      inputValue ? ` and ${inputValue}` : ''
    } Ensure the difficulty increases from easy to hard. Provide only the array without any other things give me exactly like this format without any changes in the format but not that questions:
    eg: for the physics 
      physics: [
    { question: 'What is the SI unit of force?', options: ['Watt', 'Joule', 'Newton', 'Pascal'], correct: 2, fact: 'The SI unit of force is the Newton, named after Sir Isaac Newton.' },
    { question: 'What is the speed of light?', options: ['3x10^8 m/s', '3x10^6 m/s', '3x10^10 m/s', '3x10^5 m/s'], correct: 0, fact: 'The speed of light in vacuum is approximately 3x10^8 meters per second.' },
  ]
  `;
    console.log('Prompt:', prompt);

    // Generate content in one shot rather than streaming.
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    const convertAIOutputToArray = (aiOutput: string) => {
      try {
        // Remove unwanted backticks or markdown formatting.
        const cleanedOutput = aiOutput
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
        return JSON.parse(cleanedOutput);
      } catch (error) {
        console.error('Error parsing AI output:', error);
        return [];
      }
    };
    const Fresult = convertAIOutputToArray(text);
    console.log('Parsed result:', Fresult);

    return NextResponse.json(
      { response: Fresult },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating the response.' },
      { status: 500 }
    );
  }
}
