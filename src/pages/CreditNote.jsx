import React, { useState, useEffect } from 'react'
import Style from "../pages/CreditNote.module.css"
import AppLayout from '../components/AppLayout';
import { FilterItem } from '../components/FilterItem';
import { Modal } from 'react-bootstrap';

const CreditNote = () => {

    const [selectedOption, setSelectedOption] = useState('Filter');
    const [showDropdown, setShowDropdown] = useState(false);

    const [selectedOption2, setSelectedOption2] = useState('Transaction');
    const [showDropmenu, setShowDropmenu] = useState(false);
    
    const [showModal, setShowModal] = useState(false);
    const [currentDate, setCurrentDate] = useState('');

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

    //.........DropDowwn1 Function Start......///
    const handleMenuClick = (option) => {
        setSelectedOption2(option);
        setShowDropmenu(false)
    }
    const toggleDropdown2 = () => {
        setShowDropmenu(!showDropdown);
    };

    //.........DropDowwn1 Function End......///


    //.........DropDowwn2 Function Start......///

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowDropdown(false);
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    //.........DropDowwn2 Function End......///

    //............View Modal Function...........//
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);




    return (
        <AppLayout
            filterNodes={
                <>
                    <FilterItem
                        minWidth="220px"
                        label="Manufacturer"
                        value=""
                        options={[]}
                        onChange={(value) => {

                        }}
                        name={"dashboard-manu"}
                    />
                    <FilterItem
                        minWidth="220px"
                        label="All Account"
                        value=""
                        options={[]}
                        onChange={(value) => {

                        }}
                        name={"dashboard-all-accounts"}
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
                            <div className={Style.TransactionDiv}>
                                <div className={Style.Transactionimg}>
                                    <img src='assets/images/Transactions.png' alt='aa' /></div>

                                <div className={Style.TransactionDropDown}>
                                    <p onClick={toggleDropdown2}>{selectedOption2}</p>
                                    {showDropmenu && (
                                        <ul className={Style.dropdownOptions2}>
                                            <li className={selectedOption2 === 'All' ? Style.active : ''} onClick={() => handleMenuClick('All')}>ALL</li>
                                            <li className={selectedOption2 === 'Debit' ? Style.active : ''} onClick={() => handleMenuClick('Debit')}>DEBIT</li>
                                            <li className={selectedOption2 === 'Credit' ? Style.active : ''} onClick={() => handleMenuClick('Credit')}>CREDIT</li>

                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={Style.productDeatils}>
                        <div className={Style.titleAndFilter}>
                            <div>
                                <h3>Product Deatils</h3>
                            </div>
                            <div className={Style.filterDropDown}>
                                <div>
                                    <img src='assets/images/FilterIcon.png' alt='bb' />
                                </div>
                                <div className={Style.customDropdown}>
                                    <span className={Style.FilterHead} onClick={toggleDropdown}>{selectedOption}</span>
                                    {showDropdown && (
                                        <ul className={Style.dropdownOptions}>
                                            <li className={selectedOption === 'A-Z' ? Style.active : ''} onClick={() => handleOptionClick('A-Z')}>A-Z</li>
                                            <li className={selectedOption === 'Z-A' ? Style.active : ''} onClick={() => handleOptionClick('Z-A')}>Z-A</li>

                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={Style.productdata}>
                            <div className={Style.productDataDeatils}>
                                <div className={Style.ProductImg}>
                                    <img src='assets/images/image 48.png' alt='img' />
                                </div>
                                <div className={Style.productTitle}><h3>Diptyque | <span>Eau de Parfum</span></h3> </div>
                            </div>
                            <div className={Style.pricDeatils}>
                                <div className={Style.priceAndDate}>
                                    <p className={Style.plusPrice}>+$2000</p>
                                    <small>01 Jan 1:00PM</small>
                                </div>
                                <div className={Style.viewBtn}>
                                    <button onClick={handleShowModal}>View</button>
                                </div>
                            </div>
                            {/* /// credit Modal.....Start */}

                            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter"
                                centered show={showModal}
                                onHide={handleCloseModal}>
                                <Modal.Title >
                                    <div className={Style.PoDeatils}>
                                        <div className={Style.Ponumber}>PO Number <span>#310475</span> </div>
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



                            <hr className="hrBgColor"></hr>
                        </div>
                        <div className={Style.productdata}>
                            <div className={Style.productDataDeatils}>
                                <div className={Style.ProductImg}>
                                    <img src='assets/images/image 49.png' alt='img' />
                                </div>
                                <div className={Style.productTitle}><h3>Maison margiela  | <span>Tip Tac Toe Nail Lacquer C...</span></h3> </div>
                            </div>
                            <div className={Style.pricDeatils}>
                                <div className={Style.priceAndDate}>
                                    <p className={Style.minusPrice}>-$540</p>
                                    <small>01 Jan 1:00PM</small>
                                </div>
                                <div className={Style.viewBtn}>
                                    <button >View</button>
                                </div>
                            </div>

                            <hr className="hrBgColor"></hr>
                        </div>
                        <div className={Style.productdata}>
                            <div className={Style.productDataDeatils}>
                                <div className={Style.ProductImg}>
                                    <img src='assets/images/image 49 (1).png' alt='img' />
                                </div>
                                <div className={Style.productTitle}><h3>Estee Lauder | <span> Seaport Salon & Day Spa</span></h3> </div>
                            </div>
                            <div className={Style.pricDeatils}>
                                <div className={Style.priceAndDate}>
                                    <p className={Style.minusPrice}>-$7500</p>
                                    <small>01 Jan 1:00PM</small>
                                </div>
                                <div className={Style.viewBtn}>
                                    <button >View</button>
                                </div>
                            </div>
                            <hr className="hrBgColor"></hr>
                        </div>
                        <div className={Style.productdata}>
                            <div className={Style.productDataDeatils}>
                                <div className={Style.ProductImg}>
                                    <img src='assets/images/image 48.png' alt='img' />
                                </div>
                                <div className={Style.productTitle}><h3>Bobbi brown | <span>Eau de Parfum</span></h3> </div>
                            </div>
                            <div className={Style.pricDeatils}>
                                <div className={Style.priceAndDate}>
                                    <p className={Style.plusPrice}>+$400.70</p>
                                    <small>01 Jan 1:00PM</small>
                                </div>
                                <div className={Style.viewBtn}>
                                    <button >View</button>
                                </div>
                            </div>
                            <hr className="hrBgColor"></hr>
                        </div>
                        <div className={Style.productdata}>
                            <div className={Style.productDataDeatils}>
                                <div className={Style.ProductImg}>
                                    <img src='assets/images/image 49.png' alt='img' />
                                </div>
                                <div className={Style.productTitle}><h3>Bumble and bumble | <span>Tip Tac Toe Nail Lacquer C...</span></h3> </div>
                            </div>
                            <div className={Style.pricDeatils}>
                                <div className={Style.priceAndDate}>
                                    <p className={Style.minusPrice}>-$4.20</p>
                                    <small>01 Jan 1:00PM</small>
                                </div>
                                <div className={Style.viewBtn}>
                                    <button >View</button>
                                </div>
                            </div>
                            <hr className="hrBgColor"></hr>
                        </div>
                    </div>



                </div>

            </div>
        </AppLayout>
    )
}

export default CreditNote

