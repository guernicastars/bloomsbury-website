export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  image?: string; // base64 encoded image
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  image?: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  response: string;
  error?: string;
}

export async function sendMessage(
  message: string,
  history: ChatMessage[] = [],
  image?: string
): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history, image }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      response: '',
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
