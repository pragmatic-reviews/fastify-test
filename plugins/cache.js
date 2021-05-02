const fastifyPlugin = require('fastify-plugin');
const NodeCache = require( "node-cache" );
const CACHE_TTL = 15; // 15 seconds to expire

async function cache (fastify, options) {

  const cache = new NodeCache();

  cache.on( "expired", function( key, value ){
    console.log('CACHE KEY EXPIRED = ', key);
  });

  fastify.addHook('onRequest', async (request, reply) => {
    console.log('Request URL', request.url);
    console.log('Request Method', request.method);
    if("GET" === request.method) {
      const response = cache.get(request.url);
      console.log("Response", response);
      if(response != undefined) {
        console.log('RETURNING FROM CACHE FOR KEY =', request.url, ' VALUE =', response);
        reply
          .code(200)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(response);
      }
    }
  });

  fastify.addHook('onSend', (request, reply, payload, done) => {
    if("GET" === request.method) {
      const response = cache.get(request.url);
      if(response == undefined) {
        console.log('CACHING RESPONSE FOR KEY =', request.url, ' AND VALUE =', payload);
        cache.set(request.url, payload, CACHE_TTL);
      }
    }
    done();
  });

}

module.exports = fastifyPlugin(cache);
