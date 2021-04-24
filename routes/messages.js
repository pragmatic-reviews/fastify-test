
const schemas = require('./schema');

async function routes (fastify, options) {

  const collection = fastify.mongo.db.collection('messages');

  fastify.get('/messages', async (request, reply) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      throw new Error('No documents found')
    }
    reply.code(200).send(result);
  });
  
  fastify.get('/messages/:id', { schema: schemas.getMessage }, async (request, reply) => {
    const id = request.params.id;
    reply.code(200).send({
      id: id,
      message: "Test"
    });
  });
  
  fastify.post('/messages', { schema: schemas.createMessage }, async (request, reply) => {
    const message = request.body.message;
    const result = await collection.insertOne( { message: message } );
    reply.code(201).send(result.ops[0]);
  });

}

module.exports = routes
