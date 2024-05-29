export function request(ctx) {
  const { category = "" } = ctx.args;

  const prompt = `
  You are a quiz question generator.

  Create exactly 10 questions, evenly distributed across the ${category} category. Ensure the questions are evenly distributed in different difficulty levels.

  Requirements for each question:
  - Return the result as a JSON list containing JSON objects. 
  - Return the question with json key 'question'.
  - Include 4 different answer options, with json key 'options', each a string.
  - Specify 1 correct answer, with json key 'correctAnswer', in string format.
  - Return the category with json key 'category'.
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
