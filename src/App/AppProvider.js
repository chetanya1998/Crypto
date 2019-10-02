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
import moment from 'moment';
const cc = require ('cryptocompare');
export const AppContext = React.createContext();
const MAX_FAVOURITES = 10;

const TIME_UNITS = 10;
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
      setCurrentFavourite:this.setCurrentFavourite,
      setFilteredCoins:this.setFilteredCoins
    }
  }
  componentDidMount = ()=>{
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
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
  fetchHistorical = async () =>{
    if(this.state.firstVisit) return;
    let results = await this.historical();
   let historical = [
     {
       name:this.state.currentFavourite,
       data: results.map((ticker,index)=>[
         moment().subtract({months:TIME_UNITS - index}).valueOf(),
         ticker.USD
       ])
     }
   ]
    this.setState({historical});
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
  historical = () =>{
    let promises =[];
    for (let units = TIME_UNITS; units > 0; units--){
      promises.push(
        cc.priceHistorical(
          this.state.currentFavourite,
          ['USD'],
          moment()
           .subtract({months: units})
           .toDate()
        )
      )
    }
    return Promise.all(promises);

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
    let currentFavourite = this.state.favourites[0];
    this.setState({
      firstVisit:false,
      page:'dashboard',
      currentFavourite,
      prices:null,
      historical: null,
    },()=>{
      this.fetchPrices();
      this.fetchHistorical();
    });
    localStorage.setItem('cryptoDash',JSON.stringify({
      favourites:this.state.favourites,
      currentFavourite
    }));
  }

  setCurrentFavourite = (sym) =>{
    this.setState({
      currentFavourite: sym,
      historical:null,
    },this.fetchHistorical);

    localStorage.setItem('cryptoDash',JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavourite: sym
    }))
  }
  savedSettings(){
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if(!cryptoDashData){
      return {page:'settings',firstVisit:true}
    }
    let{favourites,currentFavourite}=cryptoDashData;
    return{favourites,currentFavourite};
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
