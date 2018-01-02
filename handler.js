'use strict';
const SNS = require('aws-sdk/clients/sns');
const Contract = require('./contract.js');

const sns = new SNS();

const httpHandler = (event, context, callback) => {

  let data = JSON.parse(event.body);

  if(data.key === process.env.IFTT_SECRET_KEY) {
    let prefix = process.env.SNS_TOPIC_ARN_PREFIX;
    let topic = `${prefix}:goalCompleted`;
    sns.publish(
      {
        Message: 'goalCompleted',
        TopicArn: topic
      },
      (err, data) => {
        if (err)  {
          console.log(err);
          callback(null, {statusCode: 500});
        } else {
          console.log(data);
          callback(null, {statusCode: 200});
        }
      }
    );
  } else {
    callback(null, {statusCode: 403});
  }

};

const snsHandler = (event) => {
  new Contract({
    walletMnemonic: process.env.WALLET_MNEMONIC,
    providerEndpoint: process.env.PROVIDER_ENDPOINT,
    contractAddress: process.env.CONTRACT_ADDRESS,
    contractABI: JSON.parse(process.env.CONTRACT_ABI)
  }).setGoalCompleted().then((tx) => {
    console.log(tx);
  }).error((e) => {
    console.log(e);
  });
};

module.exports = {
  httpHandler: httpHandler,
  snsHandler: snsHandler
};
