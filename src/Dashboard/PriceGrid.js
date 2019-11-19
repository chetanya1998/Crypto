import React from 'react'
import styled from 'styled-components';
import {AppContext} from "../App/AppProvider";
import PriceTile from './PriceTile';
const PriceGrid = styled.div`
display:grid;
grid-template-columns:repeat(5,1fr);
grid-gap:14px;

`
export default function(){
  return(
    <AppContext.Consumer>{({prices}) =>(
      <PriceGrid>
    {prices.map((prices,index) => [
      <PriceTile key={`priceTile-${index}`} index={index} price={prices}/>])}
      </PriceGrid>
    )}
    </AppContext.Consumer>
  );
}
