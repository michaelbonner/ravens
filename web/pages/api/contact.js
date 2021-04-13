import * as uuid from "uuid";
import dynamoDb from "../../lib/dynamo-db";
import sendSesEmail from "../../lib/send-ses-email";

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

    try {
      await sendSesEmail(
        [`jeremy@jmillsent.com`],
        `noreply@ravens.works`,
        `New Ravens contact submission from ${req.body.name}`,
        `<p>Name: ${req.body.name}</p>
        <p>Email: ${req.body.email}</p>
        <p>Phone: ${req.body.phoneNumber}</p>
        <p>Message: ${req.body.message}</p>`,
        `Name: ${req.body.name}\n
        Email: ${req.body.email}\n
        Phone: ${req.body.phoneNumber}\n
        Message: ${req.body.message}`
      );
    } catch (error) {
      console.log("error", error);
    }

    res.status(201).json(contact);
  }
}
