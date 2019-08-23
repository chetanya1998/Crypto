import React  from 'react';
import styled , {css} from 'styled-components';
import {AppContext} from "../App/AppProvider";
import {SelectableTile} from "../Shared/Tile";
import CoinTile from "./CoinTile"
export const CoinGridStyled = styled.div`
display:grid;
grid-template-columns :repeat(5, 1fr);
grid-gap:15px;
margin-top:40px;
 `
 function getCoinsToDisplay(coinList,topSection,favourites){
   return topSection ? favourites : Object.keys(coinList).slice(0,500);//for showing number of tiles
 }
 export default function({topSection}){
   return <AppContext.Consumer>
   {({coinList,favourites})=><CoinGridStyled>
   {getCoinsToDisplay(coinList,topSection,favourites).map(coinKey =><CoinTile topSection={topSection} coinKey={coinKey}/>
   )}
   </CoinGridStyled>}
   </AppContext.Consumer>
 }
