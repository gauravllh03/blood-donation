import React from 'react';
import FactsList from '../../assets/api/FactsList';
import Facts from '../Facts/Facts'
import classes from './FactsPage.css'
const factsPage = props =>{
    var factsli=[];
    for(let i=0;i<5;i++)
      factsli.push(<Facts myth={FactsList[i].Myth} fact={FactsList[i].Fact} key={i}/>);
    return (
        <div style={{width:"70%", margin:"auto"}}>
            <h1 className={classes.heading}>Myths Vs Facts</h1>
            {factsli}
        </div>
    );
}

export default factsPage;