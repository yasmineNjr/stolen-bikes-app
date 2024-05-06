import React , { Fragment, useContext, useEffect } from 'react';
import TheftItem from "./TheftItem";
import classes from './Thefts.module.css';
import { TheftContext } from '../store/theft-context';
import { TailSpin } from 'react-loader-spinner';

const Thefts: React.FC = () => {

    const theftCtx = useContext(TheftContext);
    
    useEffect(() => {
        theftCtx.getData(theftCtx.searchWord, theftCtx.startDate, theftCtx.endDate, theftCtx.pageNumber);
      },[]);

    return (
        !theftCtx.isLoading ?
            theftCtx.items.length > 0 ?
                <Fragment>
                    <div style={{color: '#494844'}}><strong>{theftCtx.items.length} item/s found</strong></div>
                    <ul className={classes.thefts}>
                        {theftCtx.items.map((item) => (
                            <TheftItem 
                                key={item.id} 
                                title={item.title} 
                                description={item.description}
                                picture={item.picture}
                                date={item.date}
                                reportedDate={item.reportedDate}
                                location={item.location}
                            />
                        ))}
                    </ul>
                </Fragment>
                :
                <div className={classes.noItems}><strong>Not found elements</strong></div>
            :
            <div className={classes.spinnercontainer}>
                <TailSpin
                    height="50"
                    width="50"
                    radius="9"
                    color="#ebb002"
                    ariaLabel="loading"
                    />
            </div>
    )
}

export default Thefts;