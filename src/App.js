import React, { Component } from 'react';
import './App.css';
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {

  state = {
    manager: " ",
    players: [],
    balance: " ",
    value: ""
  };

  async componentDidMount(){
    let accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({manager, players, balance});
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p> This contracxt is managed by {this.state.manager}.
        There are currently {this.state.players.length} people entered, 
        competing to win {web3.utils.fromWei(this.state.balance, "ether")} ether.
         </p>

         <hr />
         <form>
           <h4>Want to try your luck?</h4>
           <div>
             <lable>Amount of ether to enter</lable>
             <input
                value = {this.state.value}
                onChange = {event => this.setState({value: event.target.value}) }
             />
           </div>
           <button>
             Enter
           </button>
         </form>
      </div>
    );
  }
}

export default App;
