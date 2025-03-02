// /app/api/generate-response/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
export const dynamic = 'force-dynamic';





export async function POST(req: NextRequest) {
  try {
    const { title, description, inputValue } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: title and description are required.' },
        { status: 400 }
      );
    }

    // Ensure API key is provided
    const apiKey = process.env.NEXT_GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API key.' }, { status: 500 });
    }

    // Instantiate the Gemini model from Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Construct a prompt that asks for a one‑time answer in simple language.
    const prompt = `${title}: ${description}${inputValue ? ` and ${inputValue}` : ''} Ensure the difficulty increases from easy to hard. Provide only the array without any other thigs give me exactly like this formate without any changes in the formate but not that questions:
    eg: for the physics 
      physics: [
    { question: 'What is the SI unit of force?', options: ['Watt', 'Joule', 'Newton', 'Pascal'], correct: 2, fact: 'The SI unit of force is the Newton, named after Sir Isaac Newton.' },
    { question: 'What is the speed of light?', options: ['3x10^8 m/s', '3x10^6 m/s', '3x10^10 m/s', '3x10^5 m/s'], correct: 0, fact: 'The speed of light in vacuum is approximately 3x10^8 meters per second.' },
  ]
  `;
    console.log('Prompt:', prompt);

    // Generate content in one shot rather than streaming.
    const result = await model.generateContent(prompt);
    const  convertAIOutputToArray = (aiOutput: string )=> {
      try {
        // Remove unwanted backticks or markdown formatting
        const cleanedOutput = aiOutput
          .replace(/```json/g, '') // Remove markdown JSON start
          .replace(/```/g, '') // Remove markdown end
          .trim(); // Trim extra spaces
    
        // Parse the cleaned JSON string into a JavaScript array
        return JSON.parse(cleanedOutput);
      } catch (error) {
        console.error("Error parsing AI output:", error);
        return [];
      }
    }
    const Fresult = convertAIOutputToArray(result.response.text())
    console.log('after resfactor',Fresult)
    // console.log(JSON.parse(result.response.text()))
    
    type QuizItem = {
      question: string;
      options: string[];
      correct: number;
      fact: string;
    };
    
    
    // Assuming the result returns the complete text in `result.text`
    return NextResponse.json({ response: Fresult, 
      status: 201,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating the response.' },
      { status: 500 }
    );
  }
}
