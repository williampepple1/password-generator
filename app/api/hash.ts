// app/api/hash.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { password } = req.body;
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      res.status(200).json({ hashedPassword });
    } catch (error) {
      res.status(500).json({ error: 'Server error while hashing the password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
