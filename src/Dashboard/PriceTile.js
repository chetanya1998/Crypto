import React from 'react';
import styled ,{css} from 'styled-components';
import {SelectableTile} from "../Shared/Tile";
import {fontSize3,fontSizeBig,greenBoxShadow} from "../Shared/Styles";
import {CoinHeaderGridStyled} from "../Settings/CoinHeaderGrid";
import {AppContext} from "../App/AppProvider";

const JustifyLeft = styled.div`
justify-self:left;
`
const JustifyRight =styled.div`
justif-self:right;
`
const TickerPrice =styled.div`
${fontSizeBig};
`
const ChangePct = styled.div`
color:green;
${props =>props.red && css`
  color:red;
`}
`
const PriceTileStyled = styled (SelectableTile)`
${props => props.compact && css`

  display:grid;
  ${fontSize3}
  grid-gap:5px;
grid-template-columns: repeat (3, 1fr);
justify-items:right;
  `}
  ${props => props.currentFavourite && css`
    ${greenBoxShadow}
    pointer-events: none;
`}
`
function  ChangePercent({data}){
  return(<JustifyRight>
  <ChangePct red={data.CHANGEPCT24HOUR < 0}>
  {numberFormat(data.CHANGEPCT24HOUR)}%
  </ChangePct>
  </JustifyRight>);

}
function PriceTile({sym,data,currentFavourite,setCurrentFavourite}){
  return(
    <PriceTileStyled onClick={setCurrentFavourite} currentFavourite={currentFavourite}>
      <CoinHeaderGridStyled>
       <div>{sym}</div>
      <ChangePercent data={data}/>
     </CoinHeaderGridStyled>
    <TickerPrice>
      ${numberFormat(data.PRICE)}
    </TickerPrice>
    </PriceTileStyled>
  );

}

function PriceTileCompact({sym,data,currentFavourite,setCurrentFavourite}){
  return(<PriceTileStyled onClick={setCurrentFavourite} compact currentFavourite={currentFavourite}>
    <CoinHeaderGridStyled>
    <JustifyLeft>{sym}</JustifyLeft>
    <div>{sym}</div>
    <ChangePercent data={data}/>
  </CoinHeaderGridStyled>
  <TickerPrice>
  ${numberFormat(data.PRICE)}
  </TickerPrice>
  </PriceTileStyled>
);
}
const numberFormat =number =>{
  return +(number + '').slice(0,7);
}


export default function({price, index}){
  let sym = Object.keys(price)[0];
  let data = price[sym]['USD'];
  let TileClass = index<5 ? PriceTile : PriceTileCompact;

  return(<AppContext.Consumer>
    {({currentFavourite,setCurrentFavourite}) =>

     <TileClass
     sym ={sym}data={data}currentFavourite={currentFavourite === sym}
     setCurrentFavourite={()=>setCurrentFavourite(sym)}>
     //{sym} {data.PRICE}
     </TileClass>
   }
   </AppContext.Consumer>
 )
}
