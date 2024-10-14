import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId } = req.body;
  const apiKey = process.env.DIFY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    const response = await axios.post(
      'https://api.dify.ai/v1/chat-messages',
      {
        inputs: {},
        query: userId,
        response_mode: 'blocking',
        conversation_id: '',
        user: 'abc-123'
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ result: response.data.answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error occurred while checking trust' });
  }
}