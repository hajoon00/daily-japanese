import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language") || "korean"; // Default to Korean

  // Construct the prompt based on the selected language
  const prompt = language === "korean"
    ? `오늘의 일본어 표현 참신한 걸로 알려줘. 답변 형식 예시를 보여줄게.
    "心機一転" (しんきいってん, shinki itten)이라는 표현을 소개할게요.

    한국어 발음은 "신키 잇텐"입니다.

    이 표현은 "마음을 새로 다지다" 또는 "새롭게 시작하다"라는 뜻으로, 어떤 상황이나 마음가짐을 완전히 바꾸거나 새로운 시작을 할 때 사용됩니다.
    
    여기 예문을 하나 한국어 발음과 함께 드릴게요.`
    : `Please provide a fresh Japanese expression. Here's an example format:
    The expression "心機一転" (しんきいってん, shinki itten) means "to start anew" or "to refresh one's mindset."

    The pronunciation in English is "shinki itten."

    This expression is used when someone completely changes their mindset or starts something new, such as a New Year's resolution or a new project.
    
    Here's an example with the English pronunciation.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 300,
  });

  const expression = completion.choices[0].message.content?.trim() || "No expression found.";

  return NextResponse.json({ expression });
}