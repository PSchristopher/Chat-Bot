import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getConversation() {
  try {
    const response = await axios.get(`${process.env.SECRET_API_KEY}/conversation`);
    return response.data;
  } catch (error) {
    return 'Internal Server Error';
  }
}
