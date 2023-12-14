'use client'

import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useParamsStore } from '../hooks/useParamsStore'

export default function Search() {
    const setParams = useParamsStore(state => state.setParams);
    const setSearchValue = useParamsStore(state => state.setSearchValue);
    const searchValue = useParamsStore(state => state.searchValue);

    function onchange(event: any){
        setSearchValue(event.target.value);
    }

    function search(){
        setParams({searchTerm: searchValue});
    }

    return (
        <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
            <input
                onKeyDown={(e: any) => {
                    if(e.key === 'Enter') search();
                }}
                onChange={onchange}
                value={searchValue}
                type='text'
                placeholder='search for cars by model, make or color'
                className='flex-grow pl-5 bg-transparent focus:outline-none border-transparent
                    focus:border-transparent focus:ring-0 text-sm text-gray-600'
            />
            <button onClick={search}>
                <FaSearch 
                    size={34} 
                    className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2' 
                />
            </button>
        </div>
    )
}
