import React, { useContext } from 'react';
import { Store } from "../../App/App";
import { Skeleton, Select } from 'antd';

export default function SortBy() {
    const store = useContext(Store);
    const setSorBy = (value) => {
        value === "All" ? store.setSorBy(null) : store.setSorBy(value.toString())
    }
    return (
        <div>
            <Select
                defaultValue="All"
                placeholder = "Sort by Default Order"
                onChange={(e) => setSorBy(e)}
                options={[
                    {
                        value: 'All',
                        label: 'Sort by Default Order',
                    },
                    {
                        value: 'DATE',
                        label: 'New Listings',
                    },
                    {
                        value: 'ASC',
                        label: 'Price Low-to-High',
                    },
                    {
                        value: 'DESC',
                        label: 'Price High-to-Low',
                    }
                ]}
            />
        </div>
    )
}
