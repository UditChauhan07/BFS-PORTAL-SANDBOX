import React, { useState } from 'react'
import TopNav from "../components/All Headers/topNav/TopNav";
import LogoHeader from "../components/All Headers/logoHeader/LogoHeader";
import Header from "../components/All Headers/header/Header";
import MobileHeader from "../components/All Headers/mobileHeader/MobileHeader";
import Style from "../pages/CreditNote.module.css"
const CreditNote = () => {

    const [selectedOption, setSelectedOption] = useState('Filter');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowDropdown(false);
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="container p-0 ">
            <div className="row p-0 m-0 d-flex flex-column justify-content-around align-items-center col-12">
                <div className="col-12">
                    <TopNav />
                </div>
                <hr className="hrBgColor"></hr>
                <div className="col-12">
                    <LogoHeader />
                    <Header />
                    <MobileHeader />
                </div>


                {/* <div className={Style.backTransaction}>
                    <div>
                        <img src='assets/images/Vector.png' alt='ww' />
                    </div>
                    <div><h1>Transactions</h1></div>
                </div> */}
                {/* <div>
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
                </div> */}
                <div className={Style.productDeatils}>
                    <div className={Style.titleAndFilter}>
                        <div><h3>Product Deatils</h3></div>
                        {/* <div className={Style.filterDropDown}>
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
                        </div> */}
                    </div>
                    <div className={Style.productdata}>
                       <div className={Style.productDataDeatils}>
                        <div className={Style.ProductImg}>
                            <img src='assets/images/image 48.png' alt='img'/>
                        </div>
                        <div className={Style.productTitle}><h3>Diptyque | <span>Eau de Parfum</span></h3> </div>
                       </div>
                       <div className={Style.pricDeatils}>
                        <div className={Style.priceAndDate}>
                            <p className={Style.plusPrice}>+$2000</p>
                            <small>01 Jan 1:00PM</small>
                        </div>
                        <div className={Style.viewBtn}>
                            {/* <button >View Now</button> */}
                        </div>
                       </div>
                       <hr className="hrBgColor"></hr>
                    </div>
                    <div className={Style.productdata}>
                       <div className={Style.productDataDeatils}>
                        <div className={Style.ProductImg}>
                            <img src='assets/images/image 49.png' alt='img'/>
                        </div>
                        <div className={Style.productTitle}><h3>Maison margiela  | <span>Tip Tac Toe Nail Lacquer C...</span></h3> </div>
                       </div>
                       <div className={Style.pricDeatils}>
                        <div className={Style.priceAndDate}>
                            <p className={Style.minusPrice}>-$540</p>
                            <small>01 Jan 1:00PM</small>
                        </div>
                        <div className={Style.viewBtn}>
                            {/* <button >View Now</button> */}
                        </div>
                       </div>
                       <hr className="hrBgColor"></hr>
                    </div>
                    <div className={Style.productdata}>
                       <div className={Style.productDataDeatils}>
                        <div className={Style.ProductImg}>
                            <img src='assets/images/image 49 (1).png' alt='img'/>
                        </div>
                        <div className={Style.productTitle}><h3>Estee Lauder | <span> Seaport Salon & Day Spa</span></h3> </div>
                       </div>
                       <div className={Style.pricDeatils}>
                        <div className={Style.priceAndDate}>
                            <p className={Style.minusPrice}>-$7500</p>
                            <small>01 Jan 1:00PM</small>
                        </div>
                        <div className={Style.viewBtn}>
                            {/* <button >View Now</button> */}
                        </div>
                       </div>
                       <hr className="hrBgColor"></hr>
                    </div>
                    <div className={Style.productdata}>
                       <div className={Style.productDataDeatils}>
                        <div className={Style.ProductImg}>
                            <img src='assets/images/image 48.png' alt='img'/>
                        </div>
                        <div className={Style.productTitle}><h3>Bobbi brown | <span>Eau de Parfum</span></h3> </div>
                       </div>
                       <div className={Style.pricDeatils}>
                        <div className={Style.priceAndDate}>
                            <p className={Style.plusPrice}>+$400.70</p>
                            <small>01 Jan 1:00PM</small>
                        </div>
                        <div className={Style.viewBtn}>
                            {/* <button >View Now</button> */}
                        </div>
                       </div>
                       <hr className="hrBgColor"></hr>
                    </div>
                    <div className={Style.productdata}>
                       <div className={Style.productDataDeatils}>
                        <div className={Style.ProductImg}>
                            <img src='assets/images/image 49.png' alt='img'/>
                        </div>
                        <div className={Style.productTitle}><h3>Bumble and bumble | <span>Tip Tac Toe Nail Lacquer C...</span></h3> </div>
                       </div>
                       <div className={Style.pricDeatils}>
                        <div className={Style.priceAndDate}>
                            <p className={Style.minusPrice}>-$4.20</p>
                            <small>01 Jan 1:00PM</small>
                        </div>
                        <div className={Style.viewBtn}>
                            {/* <button >View Now</button> */}
                        </div>
                       </div>
                       <hr className="hrBgColor"></hr>
                    </div>
                </div>
              


            </div>

        </div>
    )
}

export default CreditNote

