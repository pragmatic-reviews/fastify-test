const schemas = require('./schema');
const fastify = require('fastify')({ logger: true });

fastify.get('/message', async (request, reply) => {
  return { 
        message: 'Hello world!'
    }
});

fastify.get('/message/:id', { schema: schemas.getMessage }, async (request, reply) => {
    return {
          id: request.params.id, 
          message: 'Hello world!'
      }
});

fastify.post('/message', { schema: schemas.createMessage } , async (request, reply) => {
    //if (request.validationError) {
    //    reply.code(400).send(request.validationError)
    //}
    return {
        message: request.body.message
    }
});

fastify.setErrorHandler(function (error, request, reply) {
    if (error.validation) {
       reply.status(422).send(new Error('validation failed'))
    }
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
