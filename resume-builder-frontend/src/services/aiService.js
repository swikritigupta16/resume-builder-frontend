export const rewriteResumeAI = async (payload) => {
  const res = await fetch("http://localhost:5000/api/ai/rewrite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("AI rewrite failed");
  }

  return res.json();
};

  

 //this function is a frontend api helper used to call rewrite resume ai backend