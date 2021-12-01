import './App.css';
import React from 'react';
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  state = {
    manager: '',
    totalPlayers: [],
    balance: '',
    value: '',
    message: ''
  };

  // automatically called when app.js is called
  async componentDidMount() {
    // grabs the address at index[0]
    const manager = await lottery.methods.manager().call();

    // gets all of the adressess of players who entered
    const totalPlayers = await lottery.methods.getPlayers().call();

    // get the total amount of wei from the contract
    const balance = await web3.eth.getBalance(lottery.options.address);

    // sets the state to the address from above
    this.setState({ manager, totalPlayers, balance });
  }

  enterLottery = async event => {
    event.preventDefault();

    // get all accounts from single metamask
    const accounts = await web3.eth.getAccounts();

    // notify user that the transaction is in progress
    this.setState({ message: 'Hang tight while we process your request...' });

    // enter the lottery using the amount from the input
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether') // convert ether to wei
    });

    // notify the user that they have been entered successfully
    this.setState({ message: 'You have been entered!' });
  };

  pickWinner = async event => {
    // get all accounts from single metamask
    const accounts = await web3.eth.getAccounts();

    // notify user that the transaction is in progress
    this.setState({ message: 'Picking a winner...' });

    // send money to the winning account
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    // notify the user that a winner was seleected
    this.setState({ message: 'A winner has been chosen!' });
  };

  render() {
    return (
      <div>
        <h1>Lottery Contract</h1>
        <p>
          This contract is managed by {this.state.manager}.<br />
          There are currently {this.state.totalPlayers.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')}{' '}
          ether!
        </p>
        <hr />
        <form onSubmit={this.enterLottery}>
          <h2>Want to try your luck?</h2>
          <div>
            <label>Amount of ether to enter </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            <p>
              <small>
                <em>*must bet .011 ether or higher to enter.</em>
              </small>
            </p>
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h2>{this.state.message}</h2>
        <hr />
        {/*
          Normally, the pick winner would only be visible to the admin,
          however, for the sake of simplicity, it's exposed for everyone to 
          see/interact with.
        */}
        <h2>Ready to pick a winner?</h2>
        <button onClick={this.pickWinner}>Pick a winner!</button>
      </div>
    );
  }
}
export default App;
