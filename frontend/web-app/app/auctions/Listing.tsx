'use client'

import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard';
import { Auction, PagedResult } from '@/types';
import AppPagination from '../Components/AppPagination';
import { getData } from '../actions/AuctionActions';
import Filters from './Filters';
import { useParamsStore } from '../hooks/useParamsStore';
import { shallow } from 'zustand/shallow';
import qs from 'query-string';
import EmptyFilter from '../Components/EmptyFilter';

export default function Listing() {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy
  }), shallow);
  const setparams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({url: '', query: params});

function setPageNumber(pageNumber: number){
  setparams({pageNumber})
}

  useEffect(() => {
    getData(url).then(data => {
      setData(data);
    })
  }, [url])

  if(!data) return <h3>Loading...</h3>

  return (
    <>
      <Filters />

      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className='grid grid-cols-4 gap-6'>
            {data.results.map(auction => (
              <AuctionCard auction={auction} key={auction.id} />
            ))}
          </div>
          <div className='flex justify-center mt-4'>
            <AppPagination currentPage={params.pageNumber}
              pageCount={data.pageCount} pageChanged={setPageNumber} />
          </div>
        </>
      )}
    </>
  )
}
