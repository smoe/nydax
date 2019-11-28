import amqp from 'amqplib/callback_api';
// const amqp = require('amqplib/callback_api');
const rabbitMq = {};

const rabbitMqServer = 'amqp://guest:guest@localhost:5672';

rabbitMq.newOrderQueue = 'order';
const queues = ['order', 'ETH/BTC', 'INVO/BTC', 'TRZ/BTC'];
const durableQueues = ['order'];
const hasTtlQueues = ['ETH/BTC', 'INVO/BTC', 'TRZ/BTC'];
const messageTtl = 5000;

const produce = (queue, msg, cb) => {
  if (rabbitMq.Channel)
    return rabbitMq.Channel.sendToQueue(
      queue,
      Buffer.from(msg),
      {
        mandatory: true,
        deliveryMode: 2,
      },
      cb,
    );
  return false;
};

const consume = queue => {
  if (rabbitMq.Channel)
    rabbitMq.Channel.consume(
      queue,
      msg => {
        if (JSON.parse(msg.content).type === 'orderbook')
          global.io.emit(`${queue}_orderbook`, msg.content.toString());
        else if (JSON.parse(msg.content).type === 'price')
          global.io.emit(`${queue}_price`, msg.content.toString());
        // console.log(' [x] Received %s', msg.content.toString());
      },
      { noAck: true }, // price and orderbook are not critical messages
    );
};

const connect = () => {
  amqp.connect(
    rabbitMqServer,
    (err, conn) => {
      if (err) {
        // console.log('rabbitMq error', err);
        return;
      }
      rabbitMq.Client = conn;
      conn.createConfirmChannel((chanelErr, chn) => {
        if (err) {
          // console.log('error in creating rabbitMq channel', chanelErr);
          return;
        }
        rabbitMq.Channel = chn;
        for (let i = 0; i < queues.length; i += 1) {
          chn.assertQueue(queues[i], {
            durable: durableQueues.includes(queues[i]),
            messageTtl: hasTtlQueues.includes(queues[i])
              ? messageTtl
              : undefined,
          });
        }
        for (let i = 1; i < queues.length; i += 1) {
          // all pair related channels
          consume(queues[i]);
        }
      });
    },
  );
};

const close = () => {
  if (rabbitMq.Client) rabbitMq.Client.close();
};

rabbitMq.connect = connect;
rabbitMq.produce = produce;
// rabbitMq.consume = consume;
rabbitMq.close = close;

export default rabbitMq;
