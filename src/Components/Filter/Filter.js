import React, { useContext, useState } from 'react';
import TypeOfProperty from './SelectOptions/TypeOfProperty';
import Budget from './SelectOptions/Budget';
import Location from './SelectOptions/Location';
import HubspotForm from 'react-hubspot-form'
import Rooms from './SelectOptions/Rooms';
import SortBy from './SelectOptions/SortBy';
import { Tabs, Modal, Divider } from 'antd';
import './Filter.scss'
import { Store } from "../App/App";

export default function Filter() {
    const store = useContext(Store);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [CurrentTab, setCurrentTab] = useState(1)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChange = (key) => {
        if (key === 1) {
            store.setGoals(null)
            setCurrentTab(1)
        } else if (key === 2) {
            store.setGoals("50")
            setCurrentTab(2)
        } else if (key === 3) {
            showModal()
            setCurrentTab(CurrentTab)
        } else if (key === 4) {
            store.setGoals("51")
            setCurrentTab(4)
        }
    };

    const itemsTabs = [
        {
            id: 1,
            label: 'All',
            children: <div className='listSelect'><TypeOfProperty /><Budget /><Location /><Rooms /></div>
        },
        {
            id: 2,
            label: 'Buy',
            children: <div className='listSelect'><TypeOfProperty /><Budget /><Location /><Rooms /></div>
        },
        {
            id: 3,
            label: 'Sell',
            children: ''
        },
        {
            id: 4,
            label: 'Featured Communities',
            children: <div className='listSelect'><TypeOfProperty /><Budget /><Location /><Rooms /></div>
        }
    ]

    return (
        <div>
            <div className='tabsFilter'>
                <Tabs
                    activeKey={CurrentTab}
                    onChange={onChange}
                    type="card"
                    items={itemsTabs.map((item, i) => {
                        return {
                            label: item.label,
                            key: item.id,
                            children: item.children,
                        };
                    })}
                />
                <Modal open={isModalOpen} footer={null} onCancel={handleCancel} width={650}>

                    <img className='imgmodal' src="/wp-content/uploads/2022/11/HL.svg" alt="Logo" />
                    <h3>Our Team will contact you to
                        schedule a call</h3>
                    <p>Please fill out the following information</p>
                    <HubspotForm
                        className="hubspotForm"
                        region='na1'
                        portalId='19989685'
                        formId='3d17797e-ced9-446b-8101-830c91137744'
                        onSubmit={() => console.log('Submit!')}
                        onReady={(form) => form.contentDocument.querySelectorAll('head')[0].insertAdjacentHTML("beforeend", `<style>
                    .hs-button.primary{
                        width: 100%;
                    }
                    label span{
                        font-weight: bold;
                    }
                    .hs_submit .actions{
                        padding: 0px !important;
                    }
                    </style>`)}
                        loading={<div>Loading...</div>}
                    />
                </Modal>
            </div>
            <div className="sortby">
                <SortBy />
            </div>
            <Divider />
        </div>
    )
}

