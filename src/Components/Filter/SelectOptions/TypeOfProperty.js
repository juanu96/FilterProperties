import React, { useContext, useEffect } from 'react';
import { Store } from "../../App/App";
import { gql, useQuery } from '@apollo/client'
import { Skeleton, Select } from 'antd';

const PROPERTY = gql`
query NewQuery {
    typesOfProperties(first: 100) {
      nodes {
        name
        databaseId
      }
    }
  }
`
export default function TypeOfProperty() {
    const store = useContext(Store);
    const { loading, data, error } = useQuery(PROPERTY)
    let options = [{ label: "Type of Property", value: 'All' }]


    const setCategory = (value) => {
        value === "All" ? store.setPropertyCategory(null) : store.setPropertyCategory(value.toString())
    }

    if (!loading) {
        data.typesOfProperties.nodes.forEach(item => {
            let pushitem = { label: item.name, value: item.databaseId }
            options.push(pushitem)
            if (store.PropertySelect === item.name) {
                setCategory(item.databaseId.toString())
            }
        })
    }

    return (
        <>
            {
                !loading ? <Select
                    defaultValue={store.PropertySelect ? store.PropertySelect : "All"}
                    placeholder="Type of Property"
                    onChange={(e) => { store.setPropertySelect(null); setCategory(e) }}
                    options={options}
                /> : <Skeleton.Input active={loading} size='default' />
            }
        </>
    )
}
