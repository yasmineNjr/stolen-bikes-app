import React, { useState } from 'react';
import Theft from '../models/Theft';
import axios from 'axios';

type TheftContextObj = {
  pageNumber: number;
  items: Theft[]; 
  goNext: () => void;
  goPrevious: () => void;
  goFirst: () => void;
  goLast: () => void;
  getData: (word: string, start: string, end: string, page: number) => void;
  isLoading: boolean;
  searchWord: string;
  getSearchWord: (word: string, start: string, end: string) => void;
  startDate: string;
  endDate: string;
};

export const TheftContext = React.createContext<TheftContextObj>({
    pageNumber: 1,
    items: [],
    goNext: () => {},
    goPrevious: () => {},
    goFirst: () => {},
    goLast: () => {},
    getData: (word: string, start: string, end: string, page: number) => {},
    isLoading: false,
    searchWord: '',
    getSearchWord: (word: string, start: string, end: string) => {},
    startDate: '',
    endDate: '',
});

type Props = {
    children: React.ReactNode
 }

const TheftContextProvider: React.FC<Props> = ({ children }) => {
   const [page, setPage] = useState(1);
   const [thefts, setThefts] = useState<Theft[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [searchWord, setSearchWord] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   
  const getDataHandler = (word: string, start: string, end: string, p: number) => {

    setIsLoading(true);
    axios.get(`https://bikeindex.org/api/v3/search?page=${p}&per_page=10&location=IP&distance=10&stolenness=stolen`)
    .then((response) => {  
       var result=response.data.bikes.map((bike: any) => new Theft(bike.id,
                                                                    bike.title,
                                                                    bike.description,
                                                                    bike.date_stolen,
                                                                    bike.year,
                                                                    bike.stolen_location,
                                                                    bike.large_img           
                                                                     )) as Theft[];
      
        var lst = result.filter(theft => theft.title.toLowerCase().includes(word.toLowerCase()));
        let sStr: string = start;
        let sRes: Date = new Date(sStr);
        let eStr: string = end;
        let eRes: Date = new Date(eStr);
        // console.log(sRes.toISOString());
        // lst.map(item => {console.log((new Date(item.date * 1000)).setHours(0,0,0,0)); console.log(sRes); })
        var finalLst= sStr !== '' ? lst.filter(item => new Date(item.date * 1000) >= sRes) : lst;
        finalLst= eStr !== '' ? finalLst.filter(item => new Date(item.date * 1000) <= eRes) : finalLst;
        
        setThefts(finalLst);
       
     }).then(()=> {setIsLoading(false);});
  }
   const goNextHandler = () => {
    setPage((prevPage) => {
      return prevPage= prevPage+1;
    });
    getDataHandler(searchWord, startDate, endDate, page+1);
  };
  const goPreviousHandler = () => {
    setPage((prevPage) => {
      if(prevPage > 1) prevPage= prevPage-1;
      return prevPage;
    });
    getDataHandler(searchWord, startDate, endDate, page !== 1 ? page-1 : 1);
  };
  const goFirstHandler = () => {
    setPage(1);
    getDataHandler(searchWord, startDate, endDate, 1);
  };
  const goLastHandler = () => {
    let num : number = 1;
    axios.get(`https://bikeindex.org:443/api/v3/search/count?location=IP&distance=10&stolenness=stolen`)
    .then((response) => {  
        num = Math.ceil(response.data.stolen / 10);
       setPage(num);
       getDataHandler(searchWord, startDate, endDate, num);
     });
  };
  const getSearchWordHandler = (word: string, start: string, end: string) => {
    setSearchWord(word);
    setStartDate(start);
    setEndDate(end);
    getDataHandler(word, start, end, page);
  }

  const contextValue: TheftContextObj = {
    pageNumber: page,
    items: thefts,
    goNext: goNextHandler,
    goPrevious: goPreviousHandler,
    goFirst: goFirstHandler,
    goLast: goLastHandler,
    getData: getDataHandler,
    isLoading: isLoading,
    searchWord: searchWord,
    getSearchWord: getSearchWordHandler,
    startDate:startDate,
    endDate: endDate,
  };

  return (
    <TheftContext.Provider value={contextValue}>
      {children}
    </TheftContext.Provider>
  );
};

export default TheftContextProvider;