import React, { useState, useEffect, useMemo } from 'react'
import styles from "./index.module.css"
import { Link, useNavigate } from "react-router-dom"
import "./index.css"
import Style from "../../../pages/CreditNote.module.css"
import ModalPage from '../../../components/Modal UI'
import { GetAuthData, getRetailerListWithAmount } from '../../../../src/lib/store'

const Header = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const [ modalOpenA, setModalOpenA ] = useState(false)
  const [ selectedItemA, setSelectedItemA ] = useState(null)
  const [ retailerAmount, setRetailerAmount ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ userData, setUserData ] = useState(null)
  const [checkedId, setCheckedId] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const handleChange = (event) => {
    const selectedValue = event.target.id
    setValidationMessage('')
    // localStorage.setItem('reatilerFilterValue', selectedValue)
    setCheckedId(selectedValue)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!checkedId) {
      setValidationMessage('Please select a Retailer.')
    }
    else {
      localStorage.setItem('reatilerFilterValue', checkedId)
      navigate('/credit-note')
    }
  }

  const openModalA = (item) => {
    setSelectedItemA(item)
    setModalOpenA(true)
  }
  
  const closeModalA = () => {
    setModalOpenA(false)
    setSelectedItemA(null)
  }

  useEffect(() => {
    setIsLoading(true)
    GetAuthData().then((user) => {
        setUserData(user)
        getRetailerListWithAmount(user?.x_access_token, user?.Sales_Rep__c)
            .then((data) => {
              setRetailerAmount(data)
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
}, [])
  
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
          {modalOpenA && (<ModalPage
              open={modalOpenA}
              closeModalA={closeModalA}
              content={
                <div className={Style.ModalPart}>
                  <h4>Choose the Retailer</h4>
                    <div className={Style.RetailerMainName}>
                      <div className={Style.RetailerAllName}>

                      {retailerAmount.length > 0 ? 
                        retailerAmount.map((entry, index) => (
                          <div className={Style.Retailers} key={entry.Id}>
                              <label>
                                <input 
                                  type='radio' 
                                  id={entry.Id}
                                  name='rate' 
                                  value={entry.Id}
                                  checked={checkedId === entry.Id}
                                  onChange={handleChange}
                                />
                                {entry?.Name}
                              </label>
                              <div className={Style.RetailerRate}>
                                  <h4>${entry?.amount}</h4>
                                  <p>Available bal</p>
                              </div>
                          </div>
                        ))
                      : '' }
                      </div>

                      {validationMessage && <p className={Style.ValidationMessage}>{validationMessage}</p>}

                      <div className={Style.ButtonSubmit}>
                        <button className={Style.CancleBtn} onClick={closeModalA}>Cancel</button>
                        <button className={Style.SubmitButton} onClick={handleSubmit}>Submit</button>
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
