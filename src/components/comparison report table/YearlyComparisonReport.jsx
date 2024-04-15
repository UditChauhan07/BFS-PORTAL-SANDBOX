import React from "react";
import Loading from "../Loading";
import styles from "./table.module.css";
const YearlyComparisonReportTable = ({ comparisonData }) => {
  const formentAcmount =(amount,totalorderPrice,monthTotalAmount)=>{
    return `${Number(amount,totalorderPrice,monthTotalAmount).toFixed(2) }`
  }
  let totalwholesale = 0;
  let totalretailer = 0;
  return (
    <>
      {comparisonData ? (
        <>
          <div className={`d-flex p-3 ${styles.tableBoundary} mb-5 mt-3`}>
            <div className="table-responsive overflow-scroll position-relative" style={{ maxHeight: "73vh", minHeight: "40vh", width: "100vw",  }}>
              <table id="salesReportTable" className="table table-responsive">
                <thead>
                  <tr>
                    <th className={`${styles.th} ${styles.stickyFirstColumnHeading} `} style={{ minWidth: "200px" }}>
                      Retail Store
                    </th>
                    <th className={`${styles.th}  ${styles.stickyMonth}`} style={{ minWidth: "200px" }}>
                      Estee Lauder Number
                    </th>
                    <th className={`${styles.th} ${styles.stickyMonth}`}> Sales Rep</th>
                    <th className={`${styles.th} ${styles.stickyMonth}`}> Status</th>
                    <th className={`${styles.th} ${styles.stickyMonth}`}> Status</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Jan Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Jan Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Feb Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Feb Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Mar Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Mar Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Apr Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Apr Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>May Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>May Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Jun Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Jun Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Jul Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Jul Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Aug Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Aug Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Set Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Set Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Oct Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Oct Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Nov Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Nov Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Dec Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} `}>Dec Wholesale Amount</th>
                    <th className={`${styles.th} ${styles.stickyMonth} ${styles.stickySecondLastColumnHeading}`}  style={{ maxWidth: "100px" }}>Total Retail Revenue</th>
                    <th className={`${styles.th} ${styles.stickyMonth} ${styles.stickyLastColumnHeading}`} style={{ maxWidth: "150px" }}>Total Wholesale Amount</th>
                    <th className={`${styles.th} `}></th>
                  </tr>
                </thead>
                {comparisonData?.length ? (
                  <tbody>
                    <>
                      {
                      comparisonData?.map((ele, index) => {
                        totalretailer+=ele.Jan.retail_revenue__c;
                        totalwholesale+=ele.Jan.Whole_Sales_Amount;
                        totalretailer+=ele.Feb.retail_revenue__c;
                        totalwholesale+=ele.Feb.Whole_Sales_Amount;
                        totalretailer+=ele.Mar.retail_revenue__c;
                        totalwholesale+=ele.Mar.Whole_Sales_Amount;
                        totalretailer+=ele.Apr.retail_revenue__c;
                        totalwholesale+=ele.Apr.Whole_Sales_Amount;
                        totalretailer+=ele.May.retail_revenue__c;
                        totalwholesale+=ele.May.Whole_Sales_Amount;
                        totalretailer+=ele.Jun.retail_revenue__c;
                        totalwholesale+=ele.Jun.Whole_Sales_Amount;
                        totalretailer+=ele.Jul.retail_revenue__c;
                        totalwholesale+=ele.Jul.Whole_Sales_Amount;
                        totalretailer+=ele.Aug.retail_revenue__c;
                        totalwholesale+=ele.Aug.Whole_Sales_Amount;
                        totalretailer+=ele.Sep.retail_revenue__c;
                        totalwholesale+=ele.Sep.Whole_Sales_Amount;
                        totalretailer+=ele.Oct.retail_revenue__c;
                        totalwholesale+=ele.Oct.Whole_Sales_Amount;
                        totalretailer+=ele.Nov.retail_revenue__c;
                        totalwholesale+=ele.Nov.Whole_Sales_Amount;
                        totalretailer+=ele.Dec.retail_revenue__c;
                        totalwholesale+=ele.Dec.Whole_Sales_Amount;
                        return (
                          <>
                            <tr key={index}>
                              <td className={`${styles.td} ${styles.stickyFirstColumn}`}>{ele.AccountName}</td>
                              <td className={`${styles.td}`}>{ele.Estee_Lauder_Number__c??'---'} </td>
                              <td className={`${styles.td}`}>{ele.Sales_Rep__c}</td>
                              <td className={`${styles.td}`}>{ele.Sales_Rep__c}</td>
                              <td className={`${styles.td}`}>{ele.Status}</td>
                              <td className={`${styles.td}`}>{ele.Jan.retail_revenue__c ?"$"+formentAcmount(Number(ele.Jan.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Jan.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.Feb.retail_revenue__c ?"$"+formentAcmount(Number(ele.Feb.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Feb.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.Mar.retail_revenue__c ?"$"+formentAcmount(Number(ele.Mar.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Mar.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.Apr.retail_revenue__c ?"$"+formentAcmount(Number(ele.Apr.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Apr.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.May.retail_revenue__c ?"$"+formentAcmount(Number(ele.May.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.May.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.Jun.retail_revenue__c ?"$"+formentAcmount(Number(ele.Jun.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Jun.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.Jul.retail_revenue__c ?"$"+formentAcmount(Number(ele.Jul.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Jul.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.Aug.retail_revenue__c ?"$"+formentAcmount(Number(ele.Aug.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Aug.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.Sep.retail_revenue__c ?"$"+formentAcmount(Number(ele.Sep.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Sep.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.Oct.retail_revenue__c ?"$"+formentAcmount(Number(ele.Oct.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Oct.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.Nov.retail_revenue__c ?"$"+formentAcmount(Number(ele.Nov.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Nov.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td}`}>{ele.Dec.retail_revenue__c ?"$"+formentAcmount(Number(ele.Dec.retail_revenue__c).toFixed(2)):'NA'}</td>
                              <td className={`${styles.td}`}>${formentAcmount(Number(ele.Dec.Whole_Sales_Amount).toFixed(2))}</td>
                              <td className={`${styles.td} ${styles.stickySecondLastColumn}`} style={{ maxWidth: "100px" }}>${formentAcmount(Number(totalretailer).toFixed(2))}</td>
                              <td className={`${styles.td} ${styles.stickyLastColumn}`}>${formentAcmount(Number(totalwholesale).toFixed(2))}</td>
                            </tr>
                          </>
                        );
                      })}
                    </>
                  </tbody>
                ) : (
                  <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50">
                    No data found
                  </div>
                )}
              </table>
            </div>
          </div>
        </>
      ) : (
        <Loading height={"70vh"} />
      )}
    </>
  );
};

export default YearlyComparisonReportTable;