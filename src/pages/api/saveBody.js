import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(request, response) {
  const query = new URLSearchParams(request.url.split("?")[1]);
  if (query.has("validationToken")) {
    const token = query.get("validationToken");
    response.setHeader("Content-Type", "text/plain");
    response.send(token);
    return;
  }

  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

  if (request.method === "GET") {
    const results = await collection.find({}).toArray();
    response.status(200).json(results);
  } else if (request.method === "POST") {
    const result = await collection.insertOne({
      body: JSON.stringify(request.body),
    });
    response.status(201).json(result);
  } else {
    response.status(400).json();
  }
}
