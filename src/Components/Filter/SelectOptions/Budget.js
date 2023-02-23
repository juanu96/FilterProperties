import React, { useContext } from 'react';
import { Store } from "../../App/App";
import { gql, useQuery } from '@apollo/client'
import { Skeleton, Select } from 'antd';

const BUDGET = gql`
query NewQuery {
    budgets(first: 100) {
      nodes {
        name
        databaseId
      }
    }
  }
`

export default function Budget() {
    const store = useContext(Store);
    const { loading, data, error } = useQuery(BUDGET)
    let options = [{ label: "Budget", value: 'All' }]
    if (!loading) {
        data.budgets.nodes.forEach(item => {
            let pushitem = { label: item.name, value: item.databaseId }
            options.push(pushitem)
        })
    }

    const setCategory = (value) => {
        value === "All" ? store.setBudgetCategory(null) : store.setBudgetCategory(value.toString())
    }
    return (
        <>
            {
                !loading ? <Select
                    defaultValue="All"
                    placeholder="Budget"
                    onChange={(e) => setCategory(e)}
                    options={options}
                /> : <Skeleton.Input active={loading} size='default' />
            }
        </>
    )
}
