import React, { useEffect, useMemo, useState } from "react";
import useSalesReport from "../../api/useSalesReport";
import { useNavigate } from "react-router";
import AppLayout from "../../components/AppLayout";
import { FilterItem } from "../../components/FilterItem";
import { useManufacturer } from "../../api/useManufacturer";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import SalesReportTable from "../../components/sales report table/SalesReportTable";
import Loading from "../../components/Loading";
import FilterDate from "../../components/FilterDate";
import FilterSearch from "../../components/FilterSearch";
import Styles from "./index.module.css";
import { MdOutlineDownload } from "react-icons/md";
import ModalPage from "../../components/Modal UI";
import styles from "../../components/Modal UI/Styles.module.css";
import { CloseButton, SearchIcon } from "../../lib/svg";
const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const SalesReport = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [yearFor, setYearFor] = useState(2024);
  const salesReportApi = useSalesReport();
  const [isLoading, setIsLoading] = useState(false);
  const [manufacturerFilter, setManufacturerFilter] = useState();
  const [highestOrders, setHighestOrders] = useState(true);
  const [activeAccounts, setActiveAccounts] = useState("Active Account");
  const [salesReportData, setSalesReportData] = useState([]);
  const [ownerPermission, setOwnerPermission] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [searchBySalesRep, setSearchBySalesRep] = useState("");
  const [salesRepList, setSalesRepList] = useState([]);
  const [yearForTableSort, setYearForTableSort] = useState(2024);
  const [exportToExcelState, setExportToExcelState] = useState(false);
  const filteredSalesReportData = useMemo(() => {
    let filtered = salesReportData.filter((ele) => {
      return !manufacturerFilter || !ele.ManufacturerName__c.localeCompare(manufacturerFilter);
    });
    if (searchBy) {
      filtered = filtered?.map((ele) => {
        const Orders = ele.Orders.filter((item) => {
          if (item.Name?.toLowerCase().includes(searchBy?.toLowerCase())) {
            return item;
          }
        });
        return {
          ...ele,
          Orders,
        };
      });
    }
    if (searchBySalesRep) {
      filtered = filtered?.map((ele) => {
        const Orders = ele.Orders.filter((item) => {
          if (item.AccountRepo?.toLowerCase().includes(searchBySalesRep?.toLowerCase())) {
            return item;
          }
        });
        return {
          ...ele,
          Orders,
        };
      });
    }
    // ..........
     if (highestOrders) {
      filtered = filtered?.map((ele) => {
        const Orders = ele.Orders.sort((a, b) => b.totalOrders - a.totalOrders);
        return {
          ...ele,
          Orders,
        };
      });
    } else {
      filtered = filtered?.map((ele) => {
        const Orders = ele.Orders.sort((a, b) => a.totalOrders - b.totalOrders);
        return {
          ...ele,
          Orders,
        };
      });
    }
    // ...
    if (activeAccounts === "Active Account") {
      filtered = filtered?.filter((ele) => 
     ele.Orders.some((item) => 
item.Status === "Active Account" ));
    }else if(activeAccounts === "All Account"){
      filtered=filtered;
        };
      
    
    // ........

    // ...........
    return filtered;
  }, [manufacturerFilter, salesReportData, highestOrders, searchBy, searchBySalesRep, activeAccounts]);

 
  // ................
  const csvData = useMemo(() => {
    const dataWithTotals = filteredSalesReportData?.map((ele) =>
      ele.Orders.map((item) => ({
        ManufacturerName: ele.ManufacturerName__c,
        AccountName: item.AccountName,
        AccountType: item.AccountType,
        DateOpen: item.DateOpen,
        Status: item.Status,
        AccountRepo: item?.AccountRepo ?? JSON.parse(localStorage.getItem("Api Data")).data.Name,
        JanOrders: item.Jan.items?.length,
        JanAmount: item.Jan.amount,
        FebOrders: item.Feb.items?.length,
        FebAmount: item.Feb.amount,
        MarOrders: item.Mar.items?.length,
        MarAmount: item.Mar.amount,
        AprOrders: item.Apr.items?.length,
        AprAmount: item.Apr.amount,
        MayOrders: item.May.items?.length,
        MayAmount: item.May.amount,
        JunOrders: item.Jun.items?.length,
        JunAmount: item.Jun.amount,
        JulOrders: item.Jul.items?.length,
        JulAmount: item.Jul.amount,
        AugOrders: item.Aug.items?.length,
        AugAmount: item.Aug.amount,
        SepOrders: item.Sep.items?.length,
        SepAmount: item.Sep.amount,
        OctOrders: item.Oct.items?.length,
        OctAmount: item.Oct.amount,
        NovOrders: item.Nov.items?.length,
        NovAmount: item.Nov.amount,
        DecOrders: item.Dec.items?.length,
        DecAmount: item.Dec.amount,
        TotalOrders: item.totalOrders,
        TotalAmount: item.totalorderPrice,
      }))
    ).flat();
  
 const totals = {
      ManufacturerName: "Total", 
      JanOrders: dataWithTotals.reduce((total, item) => total + (item.JanOrders || 0), 0),
      JanAmount: dataWithTotals.reduce((total, item) => total + (item.JanAmount || 0), 0),
      
      FebOrders: dataWithTotals.reduce((total, item) => total + (item.FebOrders || 0), 0),
      FebAmount: dataWithTotals.reduce((total, item) => total + (item.FebAmount || 0), 0),

      MarOrders: dataWithTotals.reduce((total, item) => total + (item.MarOrders || 0), 0),
      MarAmount: dataWithTotals.reduce((total, item) => total + (item.MarAmount || 0), 0),

      AprOrders: dataWithTotals.reduce((total, item) => total + (item.AprOrders || 0), 0),
      AprAmount: dataWithTotals.reduce((total, item) => total + (item.AprAmount || 0), 0),
      
      MayOrders: dataWithTotals.reduce((total, item) => total + (item.MayOrders || 0), 0),
      MayAmount: dataWithTotals.reduce((total, item) => total + (item.MayAmount || 0), 0),

      JunOrders: dataWithTotals.reduce((total, item) => total + (item.JunOrders || 0), 0),
      JunAmount: dataWithTotals.reduce((total, item) => total + (item.JunAmount || 0), 0),

      JulOrders: dataWithTotals.reduce((total, item) => total + (item.JulOrders || 0), 0),
      JulAmount: dataWithTotals.reduce((total, item) => total + (item.JulAmount || 0), 0),

      AugOrders: dataWithTotals.reduce((total, item) => total + (item.AugOrders || 0), 0),
      AugAmount: dataWithTotals.reduce((total, item) => total + (item.AugAmount || 0), 0),

      SepOrders: dataWithTotals.reduce((total, item) => total + (item.SepOrders || 0), 0),
      SepAmount: dataWithTotals.reduce((total, item) => total + (item.SepAmount || 0), 0),

      OctOrders: dataWithTotals.reduce((total, item) => total + (item.OctOrders || 0), 0),
      OctAmount: dataWithTotals.reduce((total, item) => total + (item.OctAmount || 0), 0),

      NovOrders: dataWithTotals.reduce((total, item) => total + (item.NovOrders || 0), 0),
      NovAmount: dataWithTotals.reduce((total, item) => total + (item.NovAmount || 0), 0),

    DecOrders: dataWithTotals.reduce((total, item) => total + (item.DecOrders || 0), 0),
     DecAmount: dataWithTotals.reduce((total, item) => total + (item.DceAmount || 0), 0),

     TotalOrders: dataWithTotals.reduce((total, item) => total + (item.TotalOrders || 0), 0),
      TotalAmount: dataWithTotals.reduce((total, item) => total + (item.TotalAmount || 0), 0),
  
    
    };
  
    const dataWithTotalRow = [...dataWithTotals, totals];
  
    return dataWithTotalRow;
  }, [filteredSalesReportData, manufacturerFilter]);
  
 const handleExportToExcel = () => {
    setExportToExcelState(true);
  };
  const exportToExcel = () => {
    setExportToExcelState(false);
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Sales Report ${new Date().toDateString()}` + fileExtension);
  };
  const resetFilter = () => {
    setManufacturerFilter(null);
    setHighestOrders(true);
    setActiveAccounts("Active Account"); 
    setYearFor(2024);
    setSearchBy("");
    setSearchBySalesRep("");
    setYearForTableSort(2024);
  };
  const navigate = useNavigate();

  const getSalesData = async (yearFor) => {
    setIsLoading(true);
    setYearForTableSort(yearFor);
    const result = await salesReportApi.salesReportData({ yearFor });
    let salesListName = [];
    let salesList = [];
    let manuIds = [];
    let manufacturerList = [];
    result?.data?.data?.map((manu) => {
      if (!manuIds.includes(manu.ManufacturerId__c)) {
        manuIds.push(manu.ManufacturerId__c);
        manufacturerList.push({
          label: manu.ManufacturerName__c,
          value: manu.ManufacturerName__c,
          // value: manu.ManufacturerId__c,
        });
      }
      if (manu.Orders.length) {
        manu.Orders.map((item) => {
          if (!salesListName.includes(item.AccountRepo)) {
            salesListName.push(item.AccountRepo);
            salesList.push({
              label: item.AccountRepo,
              value: item.AccountRepo,
            });
          }
        });
      }
    });
    setManufacturers(manufacturerList)
    setSalesRepList(salesList);
    setSalesReportData(result?.data?.data);
    setOwnerPermission(result.data.ownerPermission);
    setIsLoading(false);
  };
  // console.log("salesReportData", salesReportData);
  useEffect(() => {
    const userData = localStorage.getItem("Name");
    if (userData) {
      getSalesData(yearFor);
    } else {
      navigate("/");
    }
  }, []);
  const sendApiCall = () => {
    // setManufacturerFilter(null);
    // setHighestOrders(true);
    // getSalesData(yearFor);
    // setSearchBy("");
    // setSearchBySalesRep("");
    getSalesData(yearFor);
  };
  let yearList = [
    { value: 2024, label: 2024 },
    { value: 2023, label: 2023 },
    { value: 2022, label: 2022 },
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
    { value: 2018, label: 2018 },
    { value: 2017, label: 2017 },
    { value: 2016, label: 2016 },
    { value: 2015, label: 2015 },
  ]
  

  return (
    <AppLayout
      filterNodes={
        <div className="d-flex justify-content-between m-auto" style={{ width: '99%' }}>
          <div className="d-flex justify-content-start gap-4 col-3">
            <FilterItem
              label="year"
              name="Year"
              value={yearFor}
              options={yearList}
              onChange={(value) => setYearFor(value)}
            />
            <button onClick={() => sendApiCall()} className="border px-2 py-1 leading-tight d-grid"> <SearchIcon fill="#fff" width={20} height={20} />
              <small style={{ fontSize: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>search</small>
            </button>
          </div>
          <div className="d-flex justify-content-around col-1"></div>
          <div className="d-flex justify-content-around col-1"><hr className={Styles.breakHolder} /></div>
          <div className="d-flex justify-content-end gap-4 col-7">
            {ownerPermission && <FilterItem minWidth="220px" label="All Sales Rep" name="AllSalesRep" value={searchBySalesRep} options={salesRepList} onChange={(value) => setSearchBySalesRep(value)} />}
            <FilterItem
              minWidth="220px"
              label="All Manufacturers"
              name="AllManufacturers1"
              value={manufacturerFilter}
              options={manufacturers}
              onChange={(value) => setManufacturerFilter(value)}
            />
            <FilterItem
              minWidth="220px"
              label="Lowest Orders"
              name="LowestOrders"
              value={highestOrders}
              options={[
                {
                  label: "Highest Orders",
                  value: true,
                },
                {
                  label: "Lowest Orders",
                  value: false,
                },
              ]}
              onChange={(value) => setHighestOrders(value)}
            />
            <FilterItem
  minWidth="220px"
  label="Status"
  name="Status"
  value={activeAccounts}
  options={[
    {
      label: "Active Account",
      value: "Active Account",
    },
    {
      label: "All Account",
      value: "All Account",
    },
  ]}
  onChange={(value) => {
    setActiveAccounts(value);
  }}
/>
           
            {/* First Calender Filter-- start date */}
            <FilterSearch onChange={(e) => setSearchBy(e.target.value)} value={searchBy} placeholder={"Search by account"} minWidth={"167px"} />
            <div className="d-flex gap-3">
              <button className="border px-2 py-1 leading-tight d-grid" onClick={resetFilter}>
                <CloseButton crossFill={'#fff'} height={20} width={20} />
                <small style={{ fontSize: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>clear</small>
              </button>
            </div>
            <button className="border px-2 py-1 leading-tight d-grid" onClick={handleExportToExcel}>

              <MdOutlineDownload size={16} className="m-auto" />
              <small style={{ fontSize: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>EXPORT</small>
            </button>
          </div>
        </div>
      }
    >
      {exportToExcelState && (
        <ModalPage
          open
          content={
            <>
              <div style={{ maxWidth: "330px" }}>
                <h1 className={`fs-5 ${styles.ModalHeader}`}>Warning</h1>
                <p className={` ${styles.ModalContent}`}>Do you want to download Sales Report?</p>
                <div className="d-flex justify-content-center gap-3 ">
                  <button className={`${styles.modalButton}`} onClick={exportToExcel}>
                    OK
                  </button>
                  <button className={`${styles.modalButton}`} onClick={() => setExportToExcelState(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </>
          }
          onClose={() => {
            setExportToExcelState(false);
          }}
        />
      )}
      <div className={Styles.inorderflex}>
        <div>
          <h2>
            {ownerPermission ? `${searchBySalesRep ? searchBySalesRep + "`s" : "All"} Sales Report` : "Your Sales Report"}
            {manufacturerFilter && " for " + manufacturerFilter}
          </h2>
        </div>
        <div>
          {false && <div className={`d-flex align-items-center ${Styles.InputControll}`}>
            <select onChange={(e) => setYearFor(e.target.value)}>
              <option value={2015} selected={yearFor == 2015 ? true : false}>
                2015
              </option>
              <option value={2016} selected={yearFor == 2016 ? true : false}>
                2016
              </option>
              <option value={2017} selected={yearFor == 2017 ? true : false}>
                2017
              </option>
              <option value={2018} selected={yearFor == 2018 ? true : false}>
                2018
              </option>
              <option value={2019} selected={yearFor == 2019 ? true : false}>
                2019
              </option>
              <option value={2020} selected={yearFor == 2020 ? true : false}>
                2020
              </option>
              <option value={2021} selected={yearFor == 2021 ? true : false}>
                2021
              </option>
              <option value={2022} selected={yearFor == 2022 ? true : false}>
                2022
              </option>
              <option value={2023} selected={yearFor == 2023 ? true : false}>
                2023
              </option>
              <option value={2024} selected={yearFor == 2024 ? true : false}>
                2024
              </option>
            </select>
            <button onClick={() => sendApiCall()}>Search Sales</button>
          </div>}
        </div>
      </div>

      {filteredSalesReportData?.length   && !isLoading ?(
        <SalesReportTable salesData={filteredSalesReportData} year={yearForTableSort} ownerPermission={ownerPermission} />
      ) : filteredSalesReportData.length ===0 && !isLoading ? (
        <div className="flex justify-center items-center py-4 w-full lg:min-h-[300px] xl:min-h-[380px]">No data found</div>
      ) : (
        <Loading height={"70vh"} />
      )}
      
    </AppLayout>
  );
};

export default SalesReport;
