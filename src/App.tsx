import { Fragment } from 'react';
import Search from './components/Search';
import Thefts from './components/Thefts';
import Header from './components/Header';
import Pagination from './components/Pagination';
import TheftContextProvider from './store/theft-context';
import classes from './App.module.css';

function App() {


  return (
    <TheftContextProvider>
        <Fragment>
          <Header/>
          <div className={classes.container}>
              <Search />
              <Thefts/>
              <Pagination/>
          </div>
        </Fragment>
    </TheftContextProvider>
    
    
  );
}

export default App;
