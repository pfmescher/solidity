const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require("web3");
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
let defaults = {
    from: null,
    gas: 1000000
};

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    defaults.from = accounts[0];

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send(defaults)

});

describe('Inbox', () => {
   it('deploys a contract', () => {
       assert.ok(inbox.options.address);
   });

   it('has a default message', async () => {
       const message = await inbox.methods.message().call();
       assert.equal(message, 'Hi there!');
   });

   it('can change the message', async () => {
      const newMessage = 'Bye there!';
      await inbox.methods.setMessage(newMessage)
          .send(defaults);
      const changed = await inbox.methods.message().call();

      assert.equal(changed, newMessage);
   });
});