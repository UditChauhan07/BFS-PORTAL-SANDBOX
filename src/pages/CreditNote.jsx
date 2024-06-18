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

    //.....State for filter Search Start...////
    const [selectedOption, setSelectedOption] = useState('Filter');
    const [showDropdown, setShowDropdown] = useState(false);
    //.....State for filter Search End...////
    const [selectedOption2, setSelectedOption2] = useState('Transaction');
    const [showDropmenu, setShowDropmenu] = useState(false);

    const [modalNoteId, setModalNoteId] = useState('')


    console.log({ isLoading })
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

    //............View Modal Function Start...........//
//     const handleShowModal = () => setShowModal(true);
//     const handleCloseModal = () => setShowModal(false);
    //............View Modal Function End...........//

    //............Calender Function Start...........//


    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Adding leading zeros if month or day is less than 10
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        const formattedDate = `${year}-${month}-${day}`;
        setCurrentDate(formattedDate);
    }, []);

    const handleDateChange = (event) => {
        setCurrentDate(event.target.value);
    };
    //............Calender Function End...........//

    ///...........Function for Filter start.....//
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowDropdown(false); // Hide the dropdown after selection (optional)
    };
    ///...........Function for Filter start.....//

    const handleMenuClick = (option) => {
        setSelectedOption2(option);
        setShowDropmenu(false)

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
                    <div className={Style.backTransaction}>
                        <div>
                            <img src='assets/images/Vector.png' alt='ww' />
                        </div>
                        <div><h1>Transactions</h1></div>
                    </div>
                    <div className={Style.filterMain}>
                        <div className={Style.filterDotedDiv}>
                            <div className={Style.filterTransaction}>
                                <div className='search-icon'>
                                    <img src='assets/images/Group235.png' alt='nn' />
                                </div>
                                <div className={Style.inputMain}>
                                    <input className={Style.searchInput}
                                        type="text"
                                        placeholder="TYPE TO SEARCH FOR A TRANSACTION"
                                    />
                                </div>
                            </div>

                            <div className={Style.filterTransaction2}>

                                <div className={Style.Calendardate}>
                                    <form action="/action_page.php">
                                        <input type="date" name="calender" value={currentDate} onChange={handleDateChange} />
                                    </form>
                                </div>
                                <div className={Style.TransactionDiv} onMouseEnter={() => setShowDropmenu(true)} onMouseLeave={() => setShowDropmenu(false)}>
                                    <div className={Style.Transactionimg}>
                                        <img src='assets/images/Vector(4).png' alt='aa' /></div>

                                    <div className={Style.TransactionDropDown}>
                                        <p >{selectedOption2}</p>
                                        {showDropmenu && (
                                            <ul className={Style.dropdownOptions2}>
                                                <li onClick={() => handleMenuClick('All')}>ALL</li>
                                                <li onClick={() => handleMenuClick('Debit')}>DEBIT</li>
                                                <li onClick={() => handleMenuClick('Credit')}>CREDIT</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={Style.productDeatils}>
                        <div className={Style.titleAndFilter}>
                            <div>
                                <h3>Product details</h3>
                            </div>
                            <div className={Style.filterDropDown} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                                <div>
                                    <img src='assets/images/FilterIcon.png' alt='bb' />
                                </div>
                                <div className={Style.customDropdown}>
                                    <span className={Style.FilterHead}>{selectedOption}</span>
                                    <ul className={`${Style.dropdownOptions} ${showDropdown ? '' : Style.dropdownHidden}`}>
                                        <li onClick={() => handleOptionClick('A-Z')}>A-Z</li>
                                        <li onClick={() => handleOptionClick('Z-A')}>Z-A</li>
                                    </ul>
                                </div>
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

//                                                     <button onClick={handleShowModal}>View </button>
//                                                 </div>
//                                             </div>
//                                             {/* /// credit Modal.....Start */}

//                                             <Modal size="lg" aria-labelledby="contained-modal-title-vcenter"
//                                                 centered show={showModal}
//                                                 onHide={handleCloseModal}>
//                                                 <Modal.Title >
//                                                     <div className={Style.PoDeatils}>
//                                                         <div className={Style.Ponumber}>PO Number <span>#310475</span> </div>
//                                                         <div className={Style.PoDate}><p> Date: <span> 10 Mar 2024</span></p></div>
//                                                     </div>


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
