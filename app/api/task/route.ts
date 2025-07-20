/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data', 'tasks.json'); 

export async function POST(req: Request) {
  try {
      
      const { title, description, status, due_date, user_id } = await req.json();
      console.log("console_calling", title, description, status, due_date, user_id )

    // Check if email and password are provided
    if (!title || !description || !status || !due_date || !user_id) {
      return new Response(
        JSON.stringify({ message: 'Please complete the required fields' }),
        { status: 400 }
      );
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const fileData = fs.readFileSync(filePath);
    const tasks = JSON.parse(fileData.toString());

   
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1
    const newTasks = { id, title, description, status, due_date, user_id };
    tasks.push(newTasks);
    console.log("tasks", tasks)
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    return new Response(
      JSON.stringify({ message: 'Task Created successfully' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in /api/task:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
