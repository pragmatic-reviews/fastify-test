
const fastify = require('fastify')({ logger: true });
const fastifyEnv = require('fastify-env');

fastify.register(fastifyEnv, {
  dotenv: true,
  schema: {
    type: 'object',
    required: [ 'MONGODB' ],
    properties: {
      MONGODB: {
        type: 'string',
        default: ''
      }
    }
  }
});

fastify.after(err => err?console.log(err):console.log('Env Plugin is ready.'))

fastify.register(require('./plugins/mongo-db'));

fastify.after(err => err?console.log(err):console.log('MongoDB Plugin is reqdy.'))

fastify.register(require('./routes/messages'), {
  prefix: "/api/v1"
});

fastify.after(err => err?console.log(err):console.log('Message API routes are ready.'))

fastify.ready(err => err?console.log(err):console.log('All plugins are ready'))

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
