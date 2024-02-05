import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(request, response) {
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

  if (request.method === "GET") {
    const results = await collection.find({}).toArray();
    response.status(200).json(results);
  } else if (request.method === "POST") {
    console.log(JSON.stringify(request.body, null, 4));
    const result = await collection.insertOne({
      body: JSON.stringify(request.body),
    });
    response.status(201).json(result);
  } else {
    response.status(400).json();
  }
}
