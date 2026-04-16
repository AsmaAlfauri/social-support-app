export async function generateHelpText(prompt: string) {
  const res = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.text;
}