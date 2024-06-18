import React, { useState, useEffect } from 'react';
// import TopNav from "../components/All Headers/topNav/TopNav";
// import LogoHeader from "../components/All Headers/logoHeader/LogoHeader";
// import Header from "../components/All Headers/header/Header";
// import MobileHeader from "../components/All Headers/mobileHeader/MobileHeader";

import { useManufacturer } from "../api/useManufacturer";
import { useRetailersData } from "../api/useRetailersData";

import Style from "../pages/CreditNote.module.css";
import Loading from "../components/Loading";
import AppLayout from '../components/AppLayout';
import { FilterItem } from '../components/FilterItem';
import { GetAuthData, getCreditNotesList } from "../lib/store";
import { Modal } from 'react-bootstrap';

const CreditNote = () => {
    let img = 'assets/default-image.png'
    const [userData, setUserData] = useState(null)
    const { data: manufacturers } = useManufacturer()
    const { data: retailers } = useRetailersData()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadedManufacture, setIsLoadedManufacture] = useState(false)
    const [isLoadedRetailer, setIsLoadedRetailer] = useState(false)
    const [manufacturerFilter, setManufacturerFilter] = useState()
    const [retailerFilter, setRetailerFilter] = useState()
    const [data, setData] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [modalNoteId, setModalNoteId] = useState('')

    console.log({isLoading})
    useEffect(() => {
        setIsLoading(true)
        GetAuthData().then((user) => {
            setUserData(user)
            console.log({ user: user.x_access_token, retailerFilter, manufacturerFilter });
            getCreditNotesList(user.x_access_token, retailerFilter, manufacturerFilter).then((data) => {
                setData(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log({ err: err.message })
                setIsLoading(false)
            })
        }).catch((e) => {
            console.log({ e: e.message })
            setIsLoading(false)
        })
    }, [retailerFilter, manufacturerFilter])

    const brandBtnHandler = ({ manufacturerId }) => {
        setIsLoadedManufacture(false)
        setManufacturerFilter(manufacturerId)
    };

    const retailerBtnHandler = ({ retailerId }) => {
        setIsLoadedRetailer(false)
        setRetailerFilter(retailerId)
    };
    //............View Modal Function...........//
    const handleShowModal = (note) => {
        console.log({note})
        setShowModal(true, note)
        setModalNoteId(note)
    }
    const handleCloseModal = () => {
        setShowModal(false, {})
        setModalNoteId('')
    }

    return (
        <AppLayout
            filterNodes={
                <>
                    <FilterItem
                        minWidth="220px"
                        label="All Manufacturer"
                        name="Manufacturer"
                        value={manufacturerFilter}
                        options={manufacturers?.data?.map((manufacturer) => ({
                            label: manufacturer.Name,
                            value: manufacturer.Id,
                        }))}
                        onChange={(value) => brandBtnHandler({ manufacturerId: value })}
                    />

                    <FilterItem
                        minWidth="220px"
                        label="All Account"
                        name="Retailer"
                        value={retailerFilter}
                        options={retailers?.data?.map((retailer) => ({
                            label: retailer.Name,
                            value: retailer.Id,
                        }))}
                        onChange={(value) => retailerBtnHandler({ retailerId: value })}
                    />
                </>
            }
        >
            <div className="container p-0 ">
                <div className="row p-0 m-0 d-flex flex-column justify-content-around align-items-center col-12">
                    <hr className="hrBgColor"></hr>
                    <div className={Style.productDeatils}>
                        <div className={Style.titleAndFilter}>
                            <div>
                                <h1>Transactions</h1>
                            </div>
                        </div>
                        
                        {
                            !isLoading ? (
                                data.length > 0 ? (
                                    data.map((item) => (
                                        <div className={Style.productdata} key={item.id}>
                                            <div className={Style.productDataDeatils}>
                                                <div className={item?.ManufacturerLogo ? Style.ProductImg : Style.DefaultProductImg}>
                                                    <img src={item?.ManufacturerLogo ?? img} alt='img' />
                                                </div>
                                                <div className={Style.productTitle}>
                                                    <h3>
                                                        {item.Manufacturer}
                                                        {/* | <span>{item.productDescription}</span> */}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className={Style.pricDeatils}>
                                                <div className={Style.priceAndDate}>
                                                    {item.Status__c === 'Issued' ? (
                                                        <p className={Style.plusPrice}>
                                                            +${item.Wallet_Amount__c}
                                                        </p>
                                                    ) : (
                                                        <p className={Style.minusPrice}>
                                                            -${item.Wallet_Amount__c}
                                                        </p>
                                                    )}
                                                    <small>{new Date(item.CreatedDate).toLocaleString()}</small>
                                                </div>
                                                <div className={Style.viewBtn}>
                                                     <button 
                                                        value = {item.Id}
                                                        onClick={ () => handleShowModal(item) }
                                                     >
                                                        View 
                                                    </button> 
                                                </div>
                                            </div>

                                            {/* /// credit Modal.....Start */}

                                            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter"
                                                centered show={showModal}
                                                onHide={handleCloseModal}>
                                                <Modal.Title >
                                                    <div className={Style.PoDeatils}>
                                                        <div className={Style.Ponumber}>PO Number <span>#{item?.opportunity?.PO_Number__c}</span> </div>
                                                        <div className={Style.PoDate}><p> Date: <span> 10 Mar 2024</span></p></div>
                                                    </div>

                                                </Modal.Title>

                                                <div className={Style.maincreditAmountDiv}>
                                                    <Modal.Body>
                                                        <div className={Style.CaseDeatils}>
                                                            <div className={Style.CaseTitle}><p>Diptyque | <span>Eau de Parfum</span></p></div>
                                                            <div className={Style.CaseNumDeatils}><p>Case Number <span>#310475</span></p></div>
                                                        </div>
                                                        <div className={Style.creditAmountDiv}>
                                                            <div className={Style.creditAmount}><p>Credit Not Amount</p></div>
                                                            <div className={Style.creditAmountDetail}>
                                                                <p>$2000</p>
                                                                <small>25 Jun 2024</small>
                                                            </div>
                                                        </div>
                                                        <div className={Style.creditAmountDiv}>
                                                            <div className={Style.creditAmount}><p>Order Price</p></div>
                                                            <div className={Style.creditAmountDetail2}>
                                                                <p >$2000</p>
                                                                <small>25 Jun 2024</small>
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                </div>
                                                <div className={Style.mainbutton}>
                                                    <div>
                                                        <button className={Style.CancleBtn} onClick={handleCloseModal}>Cancel</button>
                                                    </div>

                                                </div>
                                            </Modal>

                                            {/* /// credit Modal.... End */}
                                        </div>
                                    ))
                                ) : (
                                    <div className={Style.noDataFound}>
                                        <h5>No Data Found</h5>
                                    </div>
                                )
                            ) : (
                                <Loading height={"70vh"} />
                            )
                        }

                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CreditNote;
