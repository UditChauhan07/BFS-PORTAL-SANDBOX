import React, { useState, useEffect, useMemo } from 'react';
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import Style from "../../../pages/CreditNote.module.css";
import ModalPage from '../../../components/Modal UI';


const Header = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;


  const [modalOpenA, setModalOpenA] = useState(false)
  const [selectedItemA, setSelectedItemA] = useState(null)

  const openModalA = (item) => {
      setSelectedItemA(item)
      setModalOpenA(true)
  }
  
  const closeModalA = () => {
      setModalOpenA(false)
      setSelectedItemA(null)
  }
  
  return (
    <div className="d-none-print">
      <div id={`${styles.main}`} className="d-flex justify-content-between  align-items-center gap-1">
        <p className={`m-0 ${styles.text}`}>
          <Link to="/top-products" className="linkStyle">
            Top Products
          </Link>
        </p>
        <p className={`m-0  ${styles.text}`}>
          <Link to="/marketing-calendar" className="linkStyle">
            Marketing Calendar
          </Link>

          {/* <Link to="" className="linkStyle">
            <div className="dropdown dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {path === "/marketing-calendar" ? "Calendar" : null ||  path === "/Target-Report" ? "Target Report" : "Marketing"}
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/marketing-calendar"
                    className="dropdown-item text-start"
                    onClick={() => {
                      navigate("/marketing-calendar");
                    }}
                  >
                    Calendar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketing-material"
                    className="dropdown-item text-start"
                    onClick={() => {
                      navigate("/marketing-material");
                    }}
                  >
                    Material's
                  </Link>
                </li>
              </ul>
            </div>
          </Link> */}
        </p>

        <p className={`m-0  ${styles.text}`}>
          <Link to="/education-center" className="linkStyle">
            Education Center
          </Link>
        </p>
        <p className={`m-0  ${styles.text}`} onClick={() => openModalA()} >
          {/* <Link to="/credit-note" className="linkStyle"> */}
          <Link to="" className="linkStyle">
          Credit Note
          </Link>

{/* credit note modal */}
{modalOpenA && (
                                                <ModalPage
                                                    open={modalOpenA}
                                                    closeModalA={closeModalA}
                                                    content={
                                                       <div className={Style.ModalPart}>
<h4>Choose the Retailer</h4>

<div className={Style.RetailerMainName}>

<div className={Style.RetailerAllName}>



    <div className={Style.Retailers}>
        <label><input type='radio' id='1' name='rate'/>Earthsavers.Inc </label>

        <div className={Style.RetailerRate}>
            <h4>$971</h4>
            <p>Available bal</p>
        </div>
    </div>

    <div className={Style.Retailers}>
        <label><input type='radio' id='2' name='rate'/>Earthsavers.Inc </label>

        <div className={Style.RetailerRate}>
            <h4>$971</h4>
            <p>Available bal</p>
        </div>
    </div>

    <div className={Style.Retailers}>
        <label><input type='radio' id='3' name='rate' />Earthsavers.Inc </label>

        <div className={Style.RetailerRate}>
            <h4>$971</h4>
            <p>Available bal</p>
        </div>
    </div>


    <div className={Style.Retailers}>
        <label><input type='radio'  id='4' name='rate'/>Earthsavers.Inc </label>

        <div className={Style.RetailerRate}>
            <h4>$971</h4>
            <p>Available bal</p>
        </div>
    </div>
    </div>


<div className={Style.ButtonSubmit}>
    <a onClick={closeModalA}>Cancel</a>
     
    <a href="/credit-note" className={Style.SubmitButton} >Submit</a>

</div>


</div>


                                                       </div>
                                                    }
                                                />
                                            )}

{/* credit note modal */}


        </p>
        <p className={`m-0  ${styles.text}`}>
          <Link to="/customer-support" className="linkStyle">
            Customer Support
          </Link>
        </p>
        <p className={`m-0  ${styles.text}`}>
          <Link to="" className="linkStyle">
            <div className="dropdown dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {path === "/sales-report" ? "Sales Report" : null || path === "/newness-report" ? "Newness Report" : null || path === "/comparison-report" ? "Comparison Report" : null|| path === "/comparison" ? "Yearly Comparison Report" : null || path === "/Target-Report" ? "Target Report" : "Reports"}
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/sales-report"
                    className="dropdown-item text-start"
                    onClick={() => {
                      navigate("/sales-report");
                    }}
                  >
                    Sales Report
                  </Link>
                </li>
                <li>
                  <Link
                    to="/newness-report"
                    className="dropdown-item text-start"
                    onClick={() => {
                      navigate("/newness-report");
                    }}
                  >
                    Newness Report
                  </Link>
                </li>
                <li>
                  <Link
                    to="/comparison-report"
                    className="dropdown-item  text-start"
                    onClick={() => {
                      navigate("/comparison-report");
                    }}
                  >
                    Comparison Report
                  </Link>
                </li>
                <li>
                  <Link
                    to="/comparison-report"
                    className="dropdown-item  text-start"
                    onClick={() => {
                      navigate("/comparison");
                    }}
                  >
                    Yearly Comparison Report
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Target-Report"
                    className="dropdown-item  text-start"
                    onClick={() => {
                      navigate("/Target-Report");
                    }}
                  >
                    Target Report
                  </Link>
                </li>
              </ul>
            </div>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Header;
