const getMessage = {
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                message: { type: 'string' }
            }
        }
    },
    querystring: {
        id: { type: 'integer' }
    }
};

const createMessage = {
    body: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      },
      required: ['message']
    }
};

module.exports = { getMessage, createMessage }