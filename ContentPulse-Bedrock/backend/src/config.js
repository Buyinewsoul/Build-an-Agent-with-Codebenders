import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
});

export const CLAUDE_MODEL_ID = "arn:aws:bedrock:us-east-1:911167923180:inference-profile/us.anthropic.claude-sonnet-4-5-20250929-v1:0";
export const LLAMA_MODEL_ID = "arn:aws:bedrock:us-east-1:911167923180:inference-profile/us.meta.llama3-1-8b-instruct-v1:0";

/**
 * Invoke Claude 4.5 Sonnet for detailed analysis and insights
 */
export async function invokeClaudeModel(userMessage, systemPrompt = "") {
  try {
    const command = new ConverseCommand({
      modelId: CLAUDE_MODEL_ID,
      system: [
        {
          text: systemPrompt || "You are an expert content analytics assistant.",
        },
      ],
      messages: [
        {
          role: "user",
          content: [{ text: userMessage }],
        },
      ],
      inferenceConfig: {
        maxTokens: 2048,
        temperature: 0.7,
      },
    });

    const response = await client.send(command);
    return response.output.message.content[0].text;
  } catch (error) {
    console.error("Claude invocation error:", error);
    throw error;
  }
}

/**
 * Invoke Llama 3.1 8B for conversational chat
 */
export async function invokeLlamaModel(userMessage) {
  try {
    const command = new ConverseCommand({
      modelId: LLAMA_MODEL_ID,
      messages: [
        {
          role: "user",
          content: [{ text: userMessage }],
        },
      ],
      inferenceConfig: {
        maxTokens: 512,
        temperature: 0.7,
      },
    });

    const response = await client.send(command);
    return response.output.message.content[0].text;
  } catch (error) {
    console.error("Llama invocation error:", error);
    throw error;
  }
}

export default client;
