import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 0.9,     
        presence_penalty: 0.6, 
        frequency_penalty: 0.4,
        max_tokens: 300,
        messages: [
          {
            role: "system",
            content: "You are a professional government social welfare case writer. Always write in formal, empathetic, and clear language suitable for official government applications.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("OpenAI ERROR:", data);
      return NextResponse.json(
        { error: data.error?.message || "OpenAI request failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      text: data.choices[0].message.content.trim(),
    });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}