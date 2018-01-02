const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

class Contract {

  constructor(opts) {
    this.provider = new HDWalletProvider(
      opts.walletMnemonic,
      opts.providerEndpoint,
      1
    );
    this.web3 = new Web3(this.provider);
    this.instance = new this.web3.eth.Contract(opts.contractABI, opts.contractAddress);
  }

  setGoalCompleted() {
    return this.instance.methods.setGoalCompleted().send({
      from: this.provider.address,
      gas: 40000
    });
  }

}

module.exports = Contract;
