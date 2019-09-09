// import React from 'react';
// export const AppContext = React.createContext();
// export class AppProvider extends React.Component{
//   constructor(props){
//
//
//   super(props);{
//   this.state={
//     page:'dashboard'
//   }
//  }
//
//  setPage = page =>this.setState({page})
//  render(){
//    return(
//      <AppContext.Provider value ={this.state}>
//      {this.props.children}
//      </AppContext.Provider>
//    )
//  }
//
// }
import React from 'react';
import _ from 'lodash';
const cc = require ('cryptocompare');
export const AppContext = React.createContext();
const MAX_FAVOURITES = 10;
export class AppProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      page: 'dashboard',
      setPage:this.setPage,
      favourites:['BTC','ETH','XMR','DOGE'],
      ...this.savedSettings(),
      setPage:this.setPage,
      addCoin:this.addCoin,
      removeCoin:this.removeCoin,
      isInfavourites:this.isInfavourites,
      confirmFavourites:this.confirmFavourites,
      setFilteredCoins:this.setFilteredCoins
    }
  }
  componentDidMount = ()=>{
    this.fetchCoins();
    this.fetchPrices();
  }
  fetchCoins = async () =>{
    let coinList = (await cc.coinList()).Data;
    this.setState({coinList});

  }

  fetchPrices = async () =>{
    if(this.state.firstVisit) return;

    let prices =await this.prices();
  prices = prices.filter(price =>Object.keys(price).length);
  this.setState({prices});

  }
  prices = async () =>{
    let returnData = [];
    for (let i=0;i<this.state.favourites.length;i++){
      try{
        let priceData = await cc.priceFull(this.state.favourites[i],'USD')
        returnData.push(priceData);
      }catch(e){
        console.warn('fetch price error:',e);
      }
    }
    return returnData;
  }
  addCoin = key =>{
    let favourites = [...this.state.favourites];
    if(favourites.length<MAX_FAVOURITES){
      favourites.push(key);
      this.setState({favourites});
    }
  }
removeCoin = key =>{
  let favourites = [...this.state.favourites];
  this.setState({favourites:_.pull(favourites,key)})
}

isInfavourites = key => _.includes(this.state.favourites,key)

  confirmFavourites = () => {
    this.setState({
      firstVisit:false,
      page:'dashboard'
    },()=>{
      this.fetchPrices();
    });
    localStorage.setItem('cryptoDash',JSON.stringify({
      favourites:this.state.favourites
    }));
  }
  savedSettings(){
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if(!cryptoDashData){
      return {page:'settings',firstVisit:true}
    }
    let{favourites}=cryptoDashData;
    return{favourites};
  }
  setPage  = page =>this.setState({page})
  setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

  render(){
    return(
      <AppContext.Provider value ={this.state}>
      {this.props.children}
      </AppContext.Provider>
    )
  }
}
