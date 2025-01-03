import { useEffect, useState } from 'react'
import InputBox from './assets/componants/InputBox'
import useCurrencyInfo from './customHooks/useCurrencyInfo'
import './App.css'

function App() {
  const [to, setTo] = useState("inr");
  const [from, setFrom] = useState("usd")
  const [amount, setAmount]= useState(0)
  const [swapped,setSwapped] = useState(false)
  const [convertedAmount,setConvertedAmount] = useState(0)
  const [shouldConvert, setShouldConvert] = useState(false);
  const currencyDataInfo = useCurrencyInfo(from);
  const currencyData = currencyDataInfo?.data || {};
  const options = Object.keys(currencyData);
  console.log(options);
  
  useEffect(()=>{
   if(shouldConvert && currencyData[to]){
    const coversionRate = currencyData[to];
    setConvertedAmount(amount*coversionRate);
    setShouldConvert(false)
   }
  },[shouldConvert,amount,to,currencyData]);
  const handleCovert = ()=>{
    setShouldConvert(true);
  }
const swap = ()=>{
  setSwapped(false)
  setFrom(to)
  setTo(from)
  setAmount(convertedAmount)
}
useEffect(()=>{
  if(swapped){
    if(currencyData[to]){
      const conversionRate = currencyData[to]
      setConvertedAmount(amount*conversionRate)
    }
    else{
      convertedAmount(0)
    }
    swapped(false)
  }
},[swapped, to, from, amount, currencyData])
  return (
    <>
    <div class="bg-[url('https://png.pngtree.com/background/20220727/original/pngtree-growing-chart-against-the-background-of-the-usa-america-flag-candlestick-picture-image_1843337.jpg')] bg-cover bg-center h-screen w-screen absolute flex flex-row items-center top-0 left-0">
    <div class=" w-full absolute top-0"
        >
        <h1 class="py-8 font-black text-xl md:text-4xl font-serif bg-white/50 mix-blend-lighten uppercase text-center">
           currency converter
        </h1>
    </div>    <div className='bg-black/50 p-5 rounded-lg mx-auto my-auto'>
   < InputBox
   label = "from"
   amount = {amount}
   selectCurrency = {from}
   currencyOptions = {options}
   onAmountChange = {(value)=> setAmount(Number(value))}
   onCurrencyChange = {(currency)=> setFrom(currency)}
    />
    <button className='bg-lime-600 py-1 px-2 text-lg text-white rounded-lg absolute -translate-y-1/2 -translate-x-1/2'
    onClick={swap}
    >Swap</button>
    < InputBox
   label = "to"
   amount = {convertedAmount}
   selectCurrency = {to}
   currencyOptions = {options}
   onCurrencyChange = {(currency)=> setTo(currency)}
   disableAmount
    />
  <button
        type="submit"
        className="w-auto text-lg font-extrabold text-white bg-blue-600 px-4 py-3  rounded-lg mt-4" 
        onClick={handleCovert}>{from} to {to} covert </button>
   </div>
   </div>
    </>
  )
}

export default App
