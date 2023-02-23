import React, { useContext } from 'react';
import { Store } from "../../App/App";
import { gql, useQuery } from '@apollo/client'
import { Skeleton, Select } from 'antd';

const LOCATION = gql`
query NewQuery {
    locations(first: 100) {
      nodes {
        name
        databaseId
      }
    }
  }
`

export default function Location() {
    const store = useContext(Store);
    const { loading, data, error } = useQuery(LOCATION)
    let options = [{ label: "Location", value: 'All' }]
    if (!loading) {
        data.locations.nodes.forEach(item => {
            let pushitem = { label: item.name, value: item.databaseId }
            options.push(pushitem)
        })
    }

    const setCategory = (value) => {
        value === "All" ? store.setLocationCategory(null) : store.setLocationCategory(value.toString())
    }
    return (
        <>
            {
                !loading ? <Select
                    defaultValue="All"
                    placeholder="Location"
                    onChange={(e) => setCategory(e)}
                    options={options}
                /> : <Skeleton.Input active={loading} size='default' />
            }
        </>
    )
}
