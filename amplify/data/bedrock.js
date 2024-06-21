export function request(ctx) {
  const { category = "" } = ctx.args;

  const prompt = `
You are a quiz question generator.

Create exactly 10 questions, evenly distributed across the ${category} category. Ensure the questions are evenly distributed in different difficulty levels.

Requirements for each question:
- If the category is "History of QuizKnock," generate questions about the famous Japanese company and YouTube channel. Include questions about their content style, approach to education, and notable members such as 伊沢拓司, ふくらP, 鶴崎 修功, and "falcon" the engineer and the developer of their apps. Also, include questions about the company's founding, other initiatives such as their websites and other sub YouTube channels, and overall impact in the field of education and entertainment. Generate this category's questions in Japanese but whenever you write the name QuizKnock be sure to write it in English characters. When you generate questions, please keep in mind that the QuizKnock company was found in 2016 but the YouTube channel had started in 2017.
- Return the result as a JSON list containing JSON objects.
- Return the question with the JSON key 'question'.
- Include 4 different answer options, with the JSON key 'options', each a string.
- Specify 1 correct answer, with the JSON key 'correctAnswer', in string format.
- Return the category with the JSON key 'category'.
- Questions should not be repeated.
  `;

  return {
    resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `\n\nHuman:${prompt}\n\nAssistant:`,
              },
            ],
          },
        ],
      },
    },
  };
}

export function response(ctx) {
  return {
    body: ctx.result.body,
  };
}
