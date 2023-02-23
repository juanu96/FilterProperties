import React, { useContext } from 'react';
import { Store } from "../../App/App";
import { gql, useQuery } from '@apollo/client'
import { Skeleton, Select } from 'antd';

const ROOMS = gql`
query NewQuery {
    rooms(first: 100) {
      nodes {
        name
        databaseId
      }
    }
  }
`

export default function Rooms() {
    const store = useContext(Store);
    const { loading, data, error } = useQuery(ROOMS)
    let options = [{ label: "Rooms", value: 'All' }]
    if (!loading) {
        data.rooms.nodes.forEach(item => {
            let pushitem = { label: item.name, value: item.databaseId }
            options.push(pushitem)
        })
    }

    const setCategory = (value) => {
        value === "All" ? store.setRoomsCategory(null) : store.setRoomsCategory(value.toString())
    }
    return (
        <>
            {
                !loading ? <Select
                    defaultValue="All"
                    placeholder="Rooms"
                    onChange={(e) => setCategory(e)}
                    options={options}
                /> : <Skeleton.Input active={loading} size='default' />
            }
        </>
    )
}
