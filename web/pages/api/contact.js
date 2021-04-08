import * as uuid from "uuid";
import dynamoDb from "../../lib/dynamo-db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const contact = {
      id: uuid.v4(),
      createdAt: Date.now(),
      ...req.body,
    };

    await dynamoDb.put({
      Item: contact,
    });

    res.status(201).json(contact);
  }
}
