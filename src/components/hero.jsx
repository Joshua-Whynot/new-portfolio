import React, { useState } from 'react'

const Hero = () => {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const reset = () => {
        setCount(0);
        setInputValue('');
    };

    // Handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = parseInt(inputValue);
        if (!isNaN(value)) {
            setCount(value);
        }
        setInputValue('');
    };

    function intToBinary(num) {
        if (num < 0){
            return "1" + (Math.abs(num) >>> 0).toString(2);
        } else {
            return "0" + (num >>> 0).toString(2);
        }
    }

    return (
        <div className="text-center">
            <div>
                <h1 className="text-2xl font-bold mb-4">Signed Binary and Integer Counter</h1>

                <div className="text-center">
                    <p className="text-4xl font-bold mb-4">
                        {intToBinary(count)} = {count}
                    </p>
                    
                    {/* Direct input form */}
                    <form onSubmit={handleSubmit} className="mb-4">
                        <input
                            type="number"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="p-2 border rounded mr-2"
                            placeholder="Enter a number"
                        />
                        <button 
                            type="submit"
                            className="p-2 border rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                        >
                            Update
                        </button>
                    </form>
                    
                    <div>
                        <button className="m-2 p-2 border rounded hover:bg-red-600 transition cursor-pointer bg-red-500 text-white" onClick={decrement}>Decrement</button>
                        <button className="m-2 p-2 border rounded hover:bg-gray-400 transition cursor-pointer bg-gray-300" onClick={reset}>Reset</button>
                        <button className="m-2 p-2 border rounded hover:bg-green-600 transition cursor-pointer bg-green-500 text-white" onClick={increment}>Increment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
