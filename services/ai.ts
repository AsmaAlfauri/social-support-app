export async function generateHelpText(prompt: string) {
  const res = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  const data = await res.json();

  return data.text;
}