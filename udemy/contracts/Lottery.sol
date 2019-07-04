pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    // ----------- public functions -----------
    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function pickWinner() public restricted {
        uint winnerIndex = random() % players.length;
        address winnerAddress = players[winnerIndex];
        winnerAddress.transfer(this.balance);

        players = new address[](0);
    }

    // ----------- modifiers -----------
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    // ----------- private functions -----------

    function getPlayers() public view returns (address[]) {
        return players;
    }

    // Pseudorandom number generator
    function random() private view returns(uint) {
        return uint(sha3(block.difficulty, now, players));
    }
}