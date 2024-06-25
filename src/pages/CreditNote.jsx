import React, { useState, useEffect, useMemo } from 'react';
import { useManufacturer } from "../api/useManufacturer";
import { useRetailersData } from "../api/useRetailersData";
import Style from "../pages/CreditNote.module.css";
import Loading from "../components/Loading";
import AppLayout from '../components/AppLayout';
import { FilterItem } from '../components/FilterItem';
import { GetAuthData, getCreditNotesList, getManufacturarAmount } from "../lib/store";
import ModalPage from '../components/Modal UI';
import { SliderValueLabel } from '@mui/material';


const CreditNote = () => {
    let img = 'assets/default-image.png'
    // const colorClasses = [
    //     'brandLightBlue',
    //     'brandLightGreen',
    //     'brandLightPurple',
    //     'brandLightBrown',
    // ];
    let colorClasses = [Style.brandLightBlue, Style.brandLightGreen, Style.brandLightPurple, Style.brandLightBrown];
    const [userData, setUserData] = useState(null)
    const { data: manufacturers } = useManufacturer()
    const { data: retailers } = useRetailersData()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadedManufacture, setIsLoadedManufacture] = useState(false)
    const [isLoadedRetailer, setIsLoadedRetailer] = useState(false)
    const [manufacturerFilter, setManufacturerFilter] = useState()
    const [retailerFilter, setRetailerFilter] = useState()
    const [retailerLabelFilter, setRetailerLabelFilter] = useState()
    const [data, setData] = useState([])
    const [currentDate, setCurrentDate] = useState('')

    //.....State for filter Search Start...////
    const [selectedOption, setSelectedOption] = useState('Filter')
    const [showDropdown, setShowDropdown] = useState(false)
    //.....State for filter Search End...////
    const [selectedOption2, setSelectedOption2] = useState('Transaction')
    const [showDropmenu, setShowDropmenu] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [modalOpenA, setModalOpenA] = useState(false)
    const [selectedItemA, setSelectedItemA] = useState(null)
    const [manufacturarAmount, setManufacturarAmount] = useState([])
    
    // Component Modal Function start......//
    const openModal = (item) => {
        console.log({item})
        setSelectedItem(item)
        setModalOpen(true)
    }
    
    const closeModal = () => {
        setModalOpen(false)
        setSelectedItem(null)
    }

    const openModalA = (item) => {
        setSelectedItemA(item)
        setModalOpenA(true)
    }
    
    const closeModalA = () => {
        setModalOpenA(false)
        setSelectedItemA(null)
    }
    // Component Modal Function End......//

    
    function isSameDate(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    const [searchFilter, setSearchFilter] = useState('')
    const [createdDateFilter, setCreatedDateFilter] = useState('')
    const [recordStatusFilter, setRecordStatusFilter] = useState('')
    const [sortOrder, setSortOrder] = useState('Z-A')

    useEffect(() => {
        setIsLoading(true)
        GetAuthData().then((user) => {
            setUserData(user)
            const retailerFilterValue = localStorage.getItem('reatilerFilterValue')
            setRetailerFilter(retailerFilterValue)
            getCreditNotesList(user.x_access_token, retailerFilterValue, manufacturerFilter)
                .then((data) => {
                    setData(data)
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log({ err: err.message })
                    setIsLoading(false)
                })

            getManufacturarAmount(user.x_access_token, retailerFilter)
                .then((amtData) => {
                    setManufacturarAmount(amtData)
                    setIsLoading(false)
                })
                .catch((amtErr) => {
                    console.log({ amtErr: amtErr.message })
                    setIsLoading(false)
                })
        }).catch((e) => {
            console.log({ e: e.message })
            setIsLoading(false)
        })
    }, [retailerFilter, manufacturerFilter])

    const filteredData = useMemo(() => {
        const sortedData = data.filter(item => {
            const manufacturerMatch = manufacturerFilter ? item.Manufacturer__c === manufacturerFilter : true
            const retailerMatch = retailerFilter ? item.Account__c === retailerFilter : true
            const statusMatch = recordStatusFilter ? item.Status__c === recordStatusFilter : true
            const createdDateMatch = createdDateFilter
            ? isSameDate(new Date(item.CreatedDate), new Date(createdDateFilter))
            : true

            const keywords = searchFilter.split(' ').filter(Boolean)
            const keywordMatch = keywords.length > 0 
                ? keywords.some(keyword => {
                    const lowerCaseKeyword = keyword.toLowerCase();
                    return Object.values(item).some(value => {
                        if (typeof value === 'string') {
                            return value.toLowerCase().includes(lowerCaseKeyword);
                        } else if (typeof value === 'number') {
                            return value.toString().includes(lowerCaseKeyword);
                        } else if (value instanceof Date) {
                            return value.toISOString().toLowerCase().includes(lowerCaseKeyword);
                        }
                        return false;
                    });
                }) 
                : true

            return manufacturerMatch && retailerMatch && statusMatch && createdDateMatch && keywordMatch
        })

        if (sortOrder === 'A-Z') {
            sortedData.sort((a, b) => a.Manufacturer?.localeCompare(b.Manufacturer))
        } 
        // else if (sortOrder === 'Z-A') {
        //     sortedData.sort((a, b) => b.Manufacturer?.localeCompare(a.Manufacturer))
        // }
        else {
            sortedData.sort((a, b) => b.Manufacturer?.localeCompare(a.Manufacturer))
        }

        sortedData.sort((a, b) => new Date(b.CreatedDate) - new Date(a.CreatedDate))
        return sortedData
    }, [ data, manufacturerFilter, retailerFilter, recordStatusFilter, createdDateFilter, searchFilter, sortOrder ])

    const brandBtnHandler = ({ manufacturerId }) => {
        setIsLoadedManufacture(false)
        setManufacturerFilter(manufacturerId)
    }

    const retailerBtnHandler = ({ retailerId }) => {
        setIsLoadedRetailer(false)
        localStorage.setItem('reatilerFilterValue', retailerId)
        setRetailerFilter(retailerId)
    }

    useEffect(() => {
        const today = new Date()
        const year = today.getFullYear()
        let month = today.getMonth() + 1
        let day = today.getDate()

        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day

        const formattedDate = `${year}-${month}-${day}`
        setCurrentDate(formattedDate)
    }, [])

    const handleDateChange = (event) => {
        let value = event.target.value
        setCurrentDate(value)
        setCreatedDateFilter(value)
    }
    //............Calender Function End...........//

    ///...........Function for Filter start.....//
    const handleOptionClick = (option) => {
        setSelectedOption(option)
        setShowDropdown(false)
        setSortOrder(option)
    }
    ///...........Function for Filter start.....//

    const handleMenuClick = (option) => {
        setSelectedOption2(option)
        setShowDropmenu(false)
        let status = (option === 'DEBIT') ? 'Refund' : ((option === 'CREDIT') ? 'Issued' : '')
        setRecordStatusFilter(status)
    }

    const handleKeywordChange = (event) => {
        let value = event.target.value
        setSearchFilter(value)
    }

    const convertDate = (isoDate) => {
        const date = new Date(isoDate)
        const options = { day: '2-digit', month: 'short', year: 'numeric' }
        return date.toLocaleDateString('en-GB', options)
    };
    //.........DropDowwn2 Function End......///

    return (
        <>
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
                                {/* <img src='assets/images/Vector.png' alt='ww' /> */}
                            </div>
                            <div>
                                <h1>
                                    Transactions 
                                    {/* <span className={Style.seaportCSS}>Seaport Salon & Day Spa</span> */}
                                </h1>
                            </div>
                        </div>

                        <div className={Style.BrandGroup}>
                            {Array.isArray(manufacturarAmount) && manufacturarAmount.length > 0 ? (
                                manufacturarAmount.map((manufacturer, index) => (
                                    <div key={index} className={`${colorClasses[index % colorClasses.length]} ${Style.brandColorCombi}`}>
                                        <h2>{manufacturer.Name}</h2>
                                        <div className={Style.brandPrice}>
                                            <h5>${manufacturer.amount} <span>Available bal</span></h5>
                                        </div>
                                    </div>
                                ))
                            ) : '' }
                        </div>



                        <div className={Style.filterMain}>
                            <div className={Style.filterDotedDiv}>
                                <div className={Style.filterTransaction}>
                                    <div className='search-icon'>
                                        <img src='assets/images/Group235.png' alt='nn' />
                                    </div>
                                    <div className={Style.inputMain}>
                                        <input 
                                            className={Style.searchInput}
                                            type="text"
                                            placeholder="TYPE TO SEARCH FOR A TRANSACTION"
                                            onKeyUp={handleKeywordChange}
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
                                            <p>{selectedOption2}</p>
                                            {showDropmenu && (
                                                <ul className={Style.dropdownOptions2}>
                                                    <li onClick={() => handleMenuClick('All')}>ALL</li>
                                                    <li onClick={() => handleMenuClick('DEBIT')}>DEBIT</li>
                                                    <li onClick={() => handleMenuClick('CREDIT')}>CREDIT</li>
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
                                    <h3>PRODUCT DETAILS</h3>
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
                                    filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <div className={Style.productdata} key={index}>
                                                <div className={Style.productDataDeatils}>
                                                    <div className={item?.ManufacturerLogo ? Style.ProductImg : Style.DefaultProductImg}>
                                                        {/* <img src={item?.ManufacturerLogo ?? img} alt='img' /> */}
                                                    </div>
                                                    <div className={Style.productTitle}>
                                                        <h3>
                                                            {item.Manufacturer} 
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
                                                        <small>
                                                            {new Date(item.CreatedDate).toLocaleString()}
                                                        </small>
                                                    </div>


                                                    <div className={Style.CircleDotGreen}>
                                                        <div className={Style.CircleDotGreenMain}>
                                                        <div className={(item?.Used_Status__c === "Used") ? Style.DotOrange : Style.DotGreen}>
                                                        </div>
                                                        <h5 className={(item?.Used_Status__c === "Used") ? Style.FontColorOrange : Style.FontColorGreen}>{(item?.Used_Status__c === "Used") ? "Use" : "Available"}</h5>
                                                        </div>
                                                    </div>


                                                    <div className={Style.viewBtn}>
                                                        <button 
                                                            onClick={() => openModal(item)}
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                </div>

                    {/* /// credit Modal.....Start */}

                    {modalOpen && (
                        <ModalPage
                            open={modalOpen}
                            closeModal={closeModal}
                            content={
                            <div className="" style={{ width: '75vw' }}>
                                <div className="" style={{ minWidth: '75vw' }}>
                                    <div className={Style.PoDeatils}>
                                        <div className={Style.Ponumber}>PO Number <span>#{selectedItem?.opportunity?.PO_Number__c}</span> </div>
                                        <div className={Style.PoDate}><p> Date: <span> { convertDate(selectedItem?.opportunity?.CreatedDate) }</span></p></div>
                                    </div>
                                    <div className={Style.maincreditAmountDiv}>
                                        <div className={Style.CaseDeatils}>
                                            <div className={Style.CaseTitle}>
                                                <p>
                                                    {selectedItem?.Manufacturer} 
                                                    {/* | <span>Eau de Parfum</span> */}
                                                </p>
                                            </div>
                                            <div className={Style.CaseNumDeatils}>
                                                <p>Case Number
                                                    <span> #{selectedItem?.opportunity?.PO_Number__c}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={Style.creditAmountDiv}>
                                            <div className={Style.creditAmount}>
                                                <p>Credit Amount</p>
                                            </div>
                                            <div 
                                                className={(selectedItem?.Status__c === "Refund") ? (Style.creditAmountDetailDebit) : (Style.creditAmountDetail) }
                                            >
                                                <p>${selectedItem?.Wallet_Amount__c}</p>
                                                <small>
                                                    { convertDate(selectedItem?.CreatedDate) }
                                                </small>
                                            </div>
                                        </div>
                                        <div className={Style.creditAmountDiv}>
                                            <div className={Style.creditAmount}>
                                                <p>Order Price</p>
                                                </div>
                                            <div className={Style.creditAmountDetail2}>
                                                <p>${selectedItem?.opportunity?.Amount}</p>
                                                <small>
                                                    {convertDate(selectedItem?.opportunity?.CreatedDate)}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                

                                </div>

                                {/* console.log({ddd:selectedItem?.usage?.Po_Number1__c }) */}
                                
                                {(selectedItem.usage && selectedItem.usage.Id != '' )? (
                                    <div className="" style={{ minWidth: '75vw' }}>
                                        <div className={Style.PoDeatils}>
                                            <div className={Style.Ponumber}>PO Number <span>#{selectedItem?.usage?.Po_Number1__c}</span> </div>
                                            <div className={Style.PoDate}><p> Date: <span> { convertDate(selectedItem?.usage?.CreatedDate) }</span></p></div>
                                        </div>
                                        <div className={Style.maincreditAmountDiv}>
                                            <div className={Style.CaseDeatils}>
                                                <div className={Style.CaseTitle}>
                                                    <p>
                                                        {selectedItem?.Manufacturer} 
                                                        {/* | <span>Eau de Parfum</span> */}
                                                    </p>
                                                </div>
                                                <div className={Style.CaseNumDeatils}>
                                                    <p>Case Number
                                                        <span> #{selectedItem?.usage?.Po_Number1__c}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={Style.creditAmountDiv}>
                                                <div className={Style.creditAmount}>
                                                    <p>Credit Amount Adjusted </p>
                                                </div>
                                                <div 
                                                    className={(selectedItem?.Status__c === "Refund") ? (Style.creditAmountDetailDebit) : (Style.creditAmountDetail) }
                                                >
                                                    <p className={Style.AmountRed}>${selectedItem?.usage?.Wallet_Amount__c}</p>
                                                    <small>
                                                        { convertDate(selectedItem?.CreatedDate) }
                                                    </small>
                                                </div>
                                            </div>
                                            <div className={Style.creditAmountDiv}>
                                                <div className={Style.creditAmount}>
                                                    <p>Order Price</p>
                                                </div>
                                                <div className={Style.creditAmountDetail2}>
                                                    <p>${selectedItem?.Wallet_Amount__c}</p>
                                                    <small>
                                                        {convertDate(selectedItem?.CreatedDate)}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ''}

                                <div className={Style.mainbutton}>
                                    <div>
                                        <button className={Style.CancleBtn} onClick={closeModal}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                            }
                        />
                    )}
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
        </>

    );
};

export default CreditNote;
