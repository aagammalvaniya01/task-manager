/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data', 'users.json'); 

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if email and password are provided
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email and password are required' }),
        { status: 400 }
      );
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const fileData = fs.readFileSync(filePath);
    const users = JSON.parse(fileData.toString());

    const existingUser = users.find((user: any) => user.email === email);
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        { status: 400 }
      );
    }
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1

    const newUser = { id, email, password };
    users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in /api/register:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
