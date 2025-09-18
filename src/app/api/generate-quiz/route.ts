import { NextRequest, NextResponse } from "next/server";
import { quizBank } from "@/data/quizBank";

// Helper to get a random question not previously seen
function getRandomQuestion(excludeIndices: number[]) {
  const availableIndices = quizBank
    .map((_, idx) => idx)
    .filter(idx => !excludeIndices.includes(idx));
  if (availableIndices.length === 0) return null;
  const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return { ...quizBank[randomIdx], index: randomIdx };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Expect client to send { seen: number[] }
    const seen: number[] = Array.isArray(body.seen) ? body.seen : [];
    const question = getRandomQuestion(seen);
    if (!question) {
      return NextResponse.json({ error: "No more questions available." }, { status: 404 });
    }
    // Do NOT return the answerIndex in production if you want to hide it from the client!
    return NextResponse.json({ quiz: question });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}