import React from 'react';
import styled from 'styled-components';
import {backgroundColor2,fontSize2} from "../Shared/Styles";
import {AppContext} from "../App/AppProvider";
import _ from 'lodash';
import fuzzy from 'fuzzy';
const SearchGrid = styled.div`
display:grid;
grid-template-columns: 200px 1fr;
`
const SearchInput = styled.input`
${backgroundColor2}
${fontSize2}
height:25px;
border: 1px solid;
color:#1163c9;
place-self:center left;
align-self:center;
justify-self:left;
`
const handleFilter = _.debounce((inputValue,coinList,setFilterCoins)=>{
  //get All the coin symbols
  let coinSymbols = Object.keys(coinList);
  //get all the coin names,map symbol to names
  let coinNames = coinSymbols.map(sym =>coinList[sym].CoinName)
  let allStringsToSearch =  coinSymbols.concat(coinNames);
  let fuzzyResults = fuzzy
   .filter(inputValue,allStringsToSearch,{})
   .map(result =>result.string);
let filteredCoins =_.pickBy(coinList,(result,symKey)=>{
  let coinName =result.CoinName;
return  (_.includes(fuzzyResults,symKey) || _.includes(fuzzyResults,coinName));
});
console.log(filteredCoins);
setFilterCoins(filteredCoins);
},500);
function filterCoins(e,setFilteredCoins,coinList){
  let inputValue = e.target.value;
 // if(!inputValue){
 //    setFilteredCoins(null);
 //  }
  handleFilter (inputValue ,coinList,setFilteredCoins);


}


 export default function(){
   return (
     <AppContext.Consumer>
     {({setFilteredCoins,coinList})=>
     <SearchGrid>
     <h2>Search All Coins</h2>
     <SearchInput onKeyUp={(e)=>filterCoins(e,setFilteredCoins,coinList)}/>
     </SearchGrid>
   }
   </AppContext.Consumer>
 );
 }
