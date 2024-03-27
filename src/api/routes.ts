import axios from 'axios';

export async function getConversation(botId: string) {
  try {
    console.log(botId, 'oiajhdjk')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversation/`,
      { "bot_id": botId },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Destructure the data from the response
    const { id, bot_id, end_user_id } = response.data.data;

    // Store relevant data in local storage
    localStorage.setItem('conversation_id', id);
    localStorage.setItem('bot_id', bot_id);
    localStorage.setItem('end_user_id', end_user_id);

    return response.data;
  } catch (error) {
    
    throw error; // Re-throw the error for the calling code to handle
  }
}

export async function sendMessageToBot(body:any) {
  try {
console.log(body, 'hgjh')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/message/history`,
       body ,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    // return error;
    console.error('Error sending message to bot:', error);
    throw error; // Re-throw the error for the calling code to handle
  }
}
