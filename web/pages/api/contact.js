import * as uuid from 'uuid';
import dynamoDb from '../../lib/dynamo-db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const contact = {
          id: uuid.v4(),
          name: req.body.name,
          emailAddress: req.body.emailAddress,
          phoneNumber: req.body.phoneNumber,
          message: req.body.message,
          createdAt: Date.now()
        };
    
        await dynamoDb.put({
          contact: contact
        });
    
        res.status(201).json(contact);
    }

    // res.status(200).json({ name: 'John Doe' })
}