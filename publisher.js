import { Steps } from "./index.js"

import amqp from 'amqplib/callback_api.js';

async function main() {
  amqp.connect('amqp://localhost', async function (error0, connection) {
    if (error0) {
      console.log(error0);
    }
    connection.createChannel(async function (error1, channel) {

      if (error1) {
        console.log(error1);
      }

      let queue = "get_channels"
      let verify = await Steps();

      channel.assertQueue(queue, {
        durable: false
      });

      console.log(verify);
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(verify)));
      console.log(" [x] Sent %s", verify);

      setTimeout(() => {
        connection.close();
        process.exit(0);
      }, 500);
    });

  });

};


main();