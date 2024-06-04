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
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
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

