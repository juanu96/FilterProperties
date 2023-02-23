import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/client'
import { Pagination, Skeleton } from 'antd';
import { Store } from "../App/App";
import './Listings.scss'
import { LISTING, LISTINGWHITOUTWHERE } from './GraphQLClient'
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import lottie from "../src/search_empty.json"

export default function Listings() {
  const scollToRef = useRef(null);
  const store = useContext(Store);
  const [ListingData, setListingData] = useState(null)
  const [Offset, setOffset] = useState(0)
  const [Page, setPage] = useState(1)
  const size = 6

  const page = (page, totalpost) => {
    scollToRef.current.scrollIntoView()
    setPage(page)
    if (Math.min((page - 1) * (size + 1)) === totalpost) {
      setOffset(totalpost - size)
    } else {
      setOffset((page - 1) * (size))
    }
  }

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const [getListings, { loading: loadingL, data: dataL, error }] = useLazyQuery(LISTING, {
    onCompleted: (data) => {
      setListingData(data)
    }
  })

  const [getAllListings, { loading: loagingWW, data: dataWW }] = useLazyQuery(LISTINGWHITOUTWHERE, {
    onCompleted: (data) => {
      setListingData(data)
    }
  })

  useEffect(() => {
    const where = {
      "taxQuery": {
        "relation": "AND",
        "taxArray": []
      },
      "offsetPagination": {
        "offset": Offset,
        "size": size
      }
    }


    if (store.SortBy === "DATE") {
      Object.assign(where, { orderby: [{ field: "DATE", order: "ASC" }] });
    } else if (store.SortBy === "ASC") {
      Object.assign(where, { orderby: [{ field: "META_KEY", "metaKeyField": "price", order: "ASC" }] });
    } else if (store.SortBy === "DESC") {
      Object.assign(where, { orderby: [{ field: "META_KEY", "metaKeyField": "price", order: "DESC" }] });
    }

    if (store.PropertyCategory) {
      where.taxQuery.taxArray.push({
        "operator": "IN",
        "taxonomy": "TYPEOFPROPERTY",
        "terms": store.PropertyCategory
      })
    }

    if (store.BudgetCategory) {
      where.taxQuery.taxArray.push({
        "operator": "IN",
        "taxonomy": "BUDGET",
        "terms": store.BudgetCategory
      })
    }

    if (store.RoomsCategory) {
      where.taxQuery.taxArray.push({
        "operator": "IN",
        "taxonomy": "ROOM",
        "terms": store.RoomsCategory
      })
    }

    if (store.LocationCategory) {
      where.taxQuery.taxArray.push({
        "operator": "IN",
        "taxonomy": "LOCATION",
        "terms": store.LocationCategory
      })
    }

    if (store.Goals) {
      where.taxQuery.taxArray.push({
        "operator": "IN",
        "taxonomy": "GOAL",
        "terms": store.Goals
      })
    }

    if (store.PropertyCategory || store.BudgetCategory || store.RoomsCategory || store.LocationCategory || store.Goals || store.SortBy) {
      getListings({
        variables: {
          WHERE: where
        }
      })
    } else {
      getAllListings({
        variables: {
          offset: Offset,
          size: size,
        }
      })
    }
  }, [store.SortBy, store.PropertyCategory, store.BudgetCategory, store.RoomsCategory, store.LocationCategory, store.Goals, Offset, size])

  return (
    <>
      <div ref={scollToRef} className='grid-listings'>
        {
          ListingData && ListingData.listings.nodes.length > 0 ? ListingData.listings.nodes.map((item, index) => {
            return (
              <div data-aos="fade-up" data-aos-offset={index + "0"} data-aos-delay={index + "00"} key={index} className='item-listing' style={{ backgroundImage: `url(${item?.featuredImage?.node?.mediaItemUrl})` }}>
                <div className='dark-overlay'></div>
                <div className='tags'>
                  {
                    item.statusListings.nodes.map((tag, tagindex) => {
                      return (
                        <p key={tagindex}>{tag.name}</p>
                      )
                    })
                  }
                </div>
                <div className='item-details'>
                  <h4>{item.listing.overview.propertyId.content}</h4>
                  <div className='locationAndPrice'>
                    <p>{item.locations.nodes[0].name}</p>
                    <p className='price'>{USDollar.format(item.listing.price)}</p>
                  </div>
                </div>
                <div className='item-hover'>
                  <div className='tag'>
                    {
                      item.statusListings.nodes.map((tag, tagindex) => {
                        return (
                          <p key={tagindex}>{tag.name}</p>
                        )
                      })
                    }
                  </div>
                  <p className='property-ID'>{item.listing.overview.propertyId.content}</p>
                  <p className='location'>{item.locations.nodes[0].name}</p>
                  <p className='price'>{USDollar.format(item.listing.price)}</p>
                  <div className='item-icons'>
                    <p className='rooms'>
                      <img src={item.listing.overview.bedrooms.icon.mediaItemUrl} alt='rooms' />
                      {item.listing.overview.bedrooms.content} Rooms
                    </p>
                    <p className='bathrooms'>
                      <img src={item.listing.overview.bathrooms.icon.mediaItemUrl} alt='bathrooms' />
                      {item.listing.overview.bathrooms.content} Bathrooms
                    </p>
                    <p className='size'>
                      <img src={item.listing.overview.constructionArea.icon.mediaItemUrl} alt='construction area' />
                      {item.listing.overview.constructionArea.content}
                    </p>
                  </div>
                  <a className='btn-listing' href={item.link}>SEE MORE DETAILS</a>
                </div>
              </div>
            )
          }) : ListingData === null ?
            <>
              <Skeleton.Image active />
              <Skeleton.Image active />
              <Skeleton.Image active />
              <Skeleton.Image active />
              <Skeleton.Image active />
              <Skeleton.Image active />
            </>
            : null
        }
      </div>
      {
        ListingData && ListingData.listings.nodes.length === 0 ?
        <>
          <Player
            autoplay
            loop
            src={lottie}
            style={{ maxHeight: "600px", maxWidth: "600px" }}
            className="lottienotfound"
          >
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
          <h3 className="notfound">Not Found</h3>
          </>
           : null
      }
      <Pagination pageSize={size} current={Page} total={ListingData?.listings?.pageInfo?.offsetPagination?.total} onChange={(e) => page(e, ListingData?.listings?.pageInfo?.offsetPagination?.total)} />
    </>
  )
}