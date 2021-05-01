const fastifyPlugin = require('fastify-plugin');

async function cache (fastify, options) {

  const cache = new Map();

  fastify.addHook('onRequest', async (request, reply) => {
    console.log('Request URL', request.url);
    console.log('Request Method', request.method);
    if("GET" === request.method) {
      const response = cache.get(request.url);
      console.log("Response", response);
      if(response !== undefined) {
        console.log('RETURNING FROM CACHE', response);
        reply
          .code(200)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(response);
      }
    }
  });

  fastify.addHook('onSend', (request, reply, payload, done) => {
    cache.set(request.url, payload);
    done();
  });

}

module.exports = fastifyPlugin(cache);
