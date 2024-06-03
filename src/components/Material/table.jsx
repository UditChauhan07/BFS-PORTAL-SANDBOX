import React from "react";
import Loading from "../Loading";
import styles from "./table.module.css";
const Table = ({ materialData }) => {
  
  return (
    <>
      {materialData ? (
        <>
          <div className={`d-flex p-3 ${styles.tableBoundary} mb-5 mt-3`}>
            <div className="" style={{ maxHeight: "73vh", minHeight: "40vh", overflow: "auto", width: "100%" }}>
              <table id="salesReportTable" className="table table-responsive" style={{ minHeight: "400px" }}>
                <thead>
                  <tr>
                    <th className={`${styles.th} ${styles.stickyFirstColumnHeading} `} style={{ minWidth: "200px" }}>
                      Material Name
                    </th>
                    <th className={`${styles.th}  ${styles.stickyMonth}`} style={{ minWidth: "200px" }}>
                      Product Name
                    </th>
                    <th className={`${styles.th} ${styles.stickyMonth}`}> Manufacturer</th>
                    <th className={`${styles.th} ${styles.stickyMonth}`}> Action</th>
                  </tr>
                </thead>
                {materialData?.length ? (
                  <tbody>
                    {console.log({materialData})}
                    <>
                      {materialData?.map((ele, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td className={`${styles.td} ${styles.stickyFirstColumn}`}>{ele.Name}</td>
                              <td className={`${styles.td}`}>{ele.ProductName} </td>
                              <td className={`${styles.td}`}>{ele.ManufacturerName}</td>
                              <td className={`${styles.td}`}>
                                <a href={ele.downloadURL} rel="noopener noreferrer">
                                  <i className="fas fa-download"></i>
                                </a>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </>
                  </tbody>
                ) : (
                  <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50">No data found</div>
                )}
                <tfoot>
                  
                </tfoot>
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

export default Table;

