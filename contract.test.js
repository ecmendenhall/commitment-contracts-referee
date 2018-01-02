const Contract = require('./contract.js');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const sampleABI = [{"constant":true,"inputs":[],"name":"referee","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"goalCompleted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"termExpired","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"term","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setGoalCompleted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"createdAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_referee","type":"address"},{"name":"_term","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];

test('creates a web3 provider', () => {
  let contract = new Contract({
    walletMnemonic: 'lol wut rofl',
    providerEndpoint: 'https://ropsten.infura.io/',
    contractAddress: '0x33cb5e1480c3dacb537f2a661deac9a46137f3e1',
    contractABI: sampleABI
  });
  expect(contract.provider).toBeInstanceOf(HDWalletProvider);
  expect(contract.provider.mnemonic).toBe('lol wut rofl');
});

test('configures web3 with provider', () => {
  let contract = new Contract({
    walletMnemonic: 'lol wut rofl',
    providerEndpoint: 'https://ropsten.infura.io/',
    contractAddress: '0x33cb5e1480c3dacb537f2a661deac9a46137f3e1',
    contractABI: sampleABI
  });
  expect(contract.web3).toBeInstanceOf(Web3);
  expect(contract.web3.currentProvider).toBe(contract.provider);
});

test('creates a web3 contract with address and ABI', () => {
  let contract = new Contract({
    walletMnemonic: 'lol wut rofl',
    providerEndpoint: 'https://ropsten.infura.io/',
    contractAddress: '0x33cb5e1480c3dacb537f2a661deac9a46137f3e1',
    contractABI: sampleABI
  });
  expect(contract.instance).toBeDefined();
});
