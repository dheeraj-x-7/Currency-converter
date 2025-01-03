import React, { useId } from 'react'

function InputBox(props) {
   const {
        label,
        amount,
        onCurrencyChange,
        onAmountChange,
        currencyOptions =[],
        disableAmount= false,
        disableCurrency = false,
        selectCurrency = "usd"
    }=props;
    const amountInputId= useId()
  return (
    <div className='bg-white p-3 m-4 rounded-lg text-md flex'>
        <div className='w-1/2'>
        <label htmlFor={amountInputId} className='text-black/40 inline-block'>
            {label}
        </label>
        <input type="number" id={amountInputId} className='border-none text-lg outline-none bg-transparent  w-full ' 
        value={amount}
       disabled = {disableAmount}
       onChange={(e)=> onAmountChange && onAmountChange(Number(e.target.value))}/>
    </div>
    <div className='w-1/2 flex flex-wrap justify-end text-right'>
    <select name="" className='bg-transparent m-4 outline-none rounded-lg' id="" 
    disabled = {disableCurrency}
    value={selectCurrency}
   onChange={(e)=> onCurrencyChange && onCurrencyChange(e.target.value)}
    >
        {currencyOptions.map((currency)=>(
            <option key={currency} value={currency}>
                {currency}
            </option>
        ))}
    </select>
    </div>
    </div>
  )
}

export default InputBox;