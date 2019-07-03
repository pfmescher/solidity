const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const mnemonic = process.env.MNEMONIC;

const provider = new HDWalletProvider(
   mnemonic,
   'https://rinkeby.infura.io/v3/d18d0447b35949089cdac96f1ba3d43c'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    //0xD75B94B605e773BC6106eC7F6324A8469a2A9853
    const account = accounts[0];

    console.log('Attempting to deploy from account', account);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({ gas: '1000000', from: account });

    console.log('Contract deployed to', result.options.address);
};

deploy();