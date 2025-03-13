import React, { useState, useEffect } from 'react'

const BaseConverter = () => {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [base1, setBase1] = useState('Binary');
    const [base2, setBase2] = useState('Decimal');
    const [convertedValue, setConvertedValue] = useState('');
    const [incrementValue, setIncrementValue] = useState(1);
    const [decrementValue, setDecrementValue] = useState(1);
    const [allowChars, setAllowChars] = useState(false);
    
    // Available bases
    const baseOptions = [
        { name: 'Binary', value: 2 },
        { name: 'Base 3', value: 3},
        { name: 'Base 4', value: 4},
        { name: 'Base 5', value: 5},
        { name: 'Base 6', value: 6},
        { name: 'Base 7', value: 7},
        { name: 'Octal', value: 8 },
        { name: 'Base 9', value: 9},
        { name: 'Decimal', value: 10 },
        { name: 'Hexadecimal', value: 16 },
    ];
    
    const incrementOptions = [
        { name: '1', value: 1 },
        { name: '5', value: 5 },
        { name: '10', value: 10 },
        { name: '25', value: 25 },
        { name: '50', value: 50 },
        { name: '100', value: 100 },
    ]
    
    // Update conversion when count or bases change
    useEffect(() => {
        updateConversion();
    }, [count, base1, base2]);
    
    // Handle base1 change
    const handleBase1Change = (e) => {
        const newBase = e.target.value;
        setBase1(newBase);
        
        // Check if the selected base value is > 10
        const baseValue = baseOptions.find(b => b.name === newBase)?.value || 10;
        setAllowChars(baseValue > 10);
    };
    
    // Handle base2 change
    const handleBase2Change = (e) => {
        setBase2(e.target.value);
    };
    
    // Update conversion based on current bases
    const updateConversion = () => {
        const base1Value = baseOptions.find(b => b.name === base1)?.value || 10;
        const base2Value = baseOptions.find(b => b.name === base2)?.value || 10;
        
        try {
            // Convert number to string representation in target base
            let result;
            if (base1 === 'Binary' && count < 0) {
                // Special case for signed binary
                result = "1" + (Math.abs(count) >>> 0).toString(2);
            } else {
                result = count.toString(base2Value);
                if (base2 === 'Hexadecimal') result = '0x' + result.toUpperCase();
                if (base2 === 'Octal') result = '0o' + result;
                if (base2 === 'Binary' && count >= 0) result = '0' + result;
            }
            setConvertedValue(result);
        } catch (error) {
            setConvertedValue('Error');
        }
    };

    const handleIncrementChange = (e) => {
        const value = parseInt(e.target.value);
        setIncrementValue(value);
        setDecrementValue(value);
    };

    const increment = () => {
        setCount(count + incrementValue);
    };

    const decrement = () => {
        setCount(count - decrementValue);
    };

    const reset = () => {
        setCount(0);
        setInputValue('');
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        const baseValue = baseOptions.find(b => b.name === base1)?.value || 10;
        
        // Create regex pattern based on the current base
        let validPattern;
        if (baseValue <= 10) {
            // For bases up to 10, only allow digits 0 to (base-1)
            validPattern = new RegExp(`^[0-${baseValue-1}]*$`);
        } else if (baseValue === 16) {
            // For hex, allow 0-9 and A-F
            validPattern = /^[0-9A-Fa-f]*$/;
        } else {
            // For other higher bases
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const allowedLetters = letters.substring(0, baseValue - 10);
            validPattern = new RegExp(`^[0-9${allowedLetters}]*$`, 'i');
        }
        
        // Only update state if input matches pattern or is empty
        if (validPattern.test(value) || value === '') {
            setInputValue(value.toUpperCase()); // Convert to uppercase for clarity
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue === '') return;
        
        const baseValue = baseOptions.find(b => b.name === base1)?.value || 10;
        // Use the correct base when parsing
        const value = parseInt(inputValue, baseValue);
        
        if (!isNaN(value)) {
            setCount(value);
        }
        setInputValue('');
    };

    // Display value in base1 format
    function getDisplayValue(num) {
        const base1Value = baseOptions.find(b => b.name === base1)?.value || 10;
        if (base1 === 'Binary' && num < 0) {
            return "1" + (Math.abs(num) >>> 0).toString(2);
        } else {
            let result = num.toString(base1Value);
            if (base1 === 'Hexadecimal') result = '0x' + result.toUpperCase();
            if (base1 === 'Octal') result = '0o' + result;
            if (base1 === 'Binary' && num >= 0) result = '0' + result;
            return result;
        }
    }

    return (
        <div className="text-center p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <div>
                <h1 className="text-2xl font-bold mb-4">Base Converter</h1>
                
                {/* Base Selection UI */}
                <div className="flex justify-center items-center space-x-4 mb-6">
                    <div className="relative">
                        <select 
                            value={base1}
                            onChange={handleBase1Change}
                            className="appearance-none px-4 py-2 bg-gray-200 rounded-lg shadow text-xl cursor-pointer pr-8"
                        >
                            {baseOptions.map(option => (
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                    
                    <span className="text-xl font-bold">→</span>
                    
                    <div className="relative">
                        <select 
                            value={base2}
                            onChange={handleBase2Change}
                            className="appearance-none px-4 py-2 bg-blue-100 rounded-lg shadow text-xl cursor-pointer pr-8"
                        >
                            {baseOptions.map(option => (
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div className="text-center">
                    <p className="text-4xl font-bold mb-4 break-all">
                        {getDisplayValue(count)} → {convertedValue}
                    </p>
                    
                    {/* Direct input form */}
                    <form onSubmit={handleSubmit} className="mb-4">
                        <input
                            type={allowChars ? "text" : "number"}
                            value={inputValue}
                            onChange={handleInputChange}
                            className="p-2 border rounded mr-2"
                            placeholder={
                                base1 === 'Binary' ? 'Enter 0s and 1s only' : 
                                base1 === 'Hexadecimal' ? 'Enter hex digits (0-9, A-F)' : 
                                `Enter a ${base1} number`
                            }
                        />
                        <button 
                            type="submit"
                            className="p-2 border rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                        >
                            Update
                        </button>
                    </form>
                    
                    <div>
                        <button className="m-2 p-2 border rounded hover:bg-red-600 transition cursor-pointer bg-red-500 text-white" onClick={decrement}>-{decrementValue}</button>
                        <button className="m-2 p-2 border rounded hover:bg-gray-400 transition cursor-pointer bg-gray-300" onClick={reset}>Reset</button>
                        <button className="m-2 p-2 border rounded hover:bg-green-600 transition cursor-pointer bg-green-500 text-white" onClick={increment}>+{incrementValue}</button>
                    </div>
                    <div className="relative inline-block w-32"> 
                        <select 
                            value={incrementValue}
                            onChange={handleIncrementChange}
                            className="appearance-none w-full px-4 py-2 bg-blue-100 rounded-lg shadow text-xl cursor-pointer pr-10"
                        >
                            {incrementOptions.map(option => (
                                <option key={option.name} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BaseConverter