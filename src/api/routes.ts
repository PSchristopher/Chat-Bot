import axios from 'axios';

export default async function getConversation(botId) {
  try {
    console.log(botId, 'checkkkk');
    const response = await axios.post(`https://4a66-49-205-134-245.ngrok-free.app/conversation`, {
      bot_id: botId,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    

    console.log(response, 'lkjhgfghj')
    return response;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error; // Re-throw the error for the calling code to handle
  }
}
