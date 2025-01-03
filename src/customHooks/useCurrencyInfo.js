import { useEffect, useState } from 'react';
function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [err,setErr] = useState(null);
    useEffect(()=>{
        const fetchCurrencyData = async ()=>{
            try{
          const response =   await fetch( `https://2024-03-06.currency-api.pages.dev/v1/currencies/${currency}.json` );
          const result = await response.json();
          if(result && result[currency]){
            setData(result[currency]);
            console.log(result[currency]);
            
          }
          else{
            setErr(`Invalid response from server`);

          }
            }
            catch(error){
                setErr(`Check your internet conection `);
            }
        }
        fetchCurrencyData();
    },[currency]);
    return{data,err}
};
export default useCurrencyInfo;