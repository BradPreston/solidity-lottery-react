import logo from './logo.svg';
import './App.css';
import React from 'react';
import web3 from './web3';

class App extends React.Component {
  render() {
    let myAccount;
    let myBalance;

    const getAccounts = async () => {
      myAccount = await web3.eth.getAccounts();
      console.log(String(myAccount[0]))

      document.getElementById('display_account').innerHTML = myAccount;
    }

    const getBalance = async () => {
      try {
        myBalance = await web3.eth.getBalance(myAccount)
        console.log(myBalance);
        document.getElementById('display_amount').innerHTML = web3.eth.getBalance(myAccount);
      } catch (err) {
        alert(err);
      }
    }

    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
          <p>Your wallet address is <span id="display_account"></span></p>
          <p>Your wallet amount is <span id="display_amount"></span></p>
          <button onClick={getAccounts}>get account</button>
          <button onClick={getBalance}>get balance</button>
        </header>
      </div>
    );
  }
}
export default App;
