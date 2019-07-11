import React, { Component } from 'react';
import './App.css';
// local file not lib
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = { manager: '' };
	}

	async componentDidMount() {
		// Since we are using metamask there is no need to specify
		// who is calling the method
		const manager = await lottery.methods.manager().call();

		this.setState({ manager });
	}

  render () {
  	return (
		  <div>
			  <h2>Lottery Contract</h2>
			  <p>This contract is managed by {this.state.manager}</p>
		  </div>
	  );
  }
}

export default App;
