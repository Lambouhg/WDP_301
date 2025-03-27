export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end("Method not allowed");

    const { jobDescription, responsibilities, whoYouAre, niceToHaves } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    const prompt = `
    From the following content, list the skills, experience, qualifications, soft skills... required for the job.
    Return the result in JSON format with each category as a array. For example:
    {
      "Skills": [...],
      "Experience": [...],
      ...
    }
    Note: Stick to the content that was sent.
    Content:
    ${jobDescription}
    ${responsibilities}
    ${whoYouAre}
    ${niceToHaves}
    `;


    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
                "HTTP-Referer": "https://jobfinder-psi.vercel.app",
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await response.json();
        console.log("OpenRouter Response:", data);

        if (response.ok && data.choices && data.choices.length > 0) {
            res.status(200).json({ result: data.choices[0].message.content });
        } else {
            console.error("Lỗi GPT:", {
                status: response.status,
                statusText: response.statusText,
                data,
            });
            res.status(500).json({ error: "GPT-4 trả về lỗi hoặc dữ liệu không hợp lệ" });
        }

    } catch (error) {
        console.error("Lỗi gọi GPT-4:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
}
