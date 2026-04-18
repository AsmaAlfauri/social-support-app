// export async function generateHelpText(prompt: string) {
//   const res = await fetch("/api/ai", {
//     method: "POST",
//     body: JSON.stringify({ prompt }),
//   });

//   if (!res.ok) {
//     throw new Error("AI request failed");
//   }

//   const data = await res.json();

//   return data.text;
// }

export async function generateHelpText(prompt: string) {
  await new Promise((res) => setTimeout(res, 1000));

  if (prompt.toLowerCase().includes("financial")) {
    return "I am currently facing financial difficulties due to unstable income and rising living costs, making it hard to cover essential needs.";
  }

  if (prompt.toLowerCase().includes("unemployed")) {
    return "I am currently unemployed and actively seeking job opportunities, but I am struggling to meet my financial obligations.";
  }

  return "I am experiencing financial hardship that has significantly impacted my ability to support my daily living expenses.";
}