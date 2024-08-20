import React, { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import Loading from "../../components/Loading";
import Styles from "./index.module.css";
import Table from "../../components/Material/table";
import { GetAuthData, getMarkertingMaterial } from "../../lib/store";

const MarketingMaterial = () => {
  // const [user, setUser] = useState()
  const [apiData, setApiData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    sendApiCall()
  },[])

  const sendApiCall = async () => {
    setIsLoading(true)
    GetAuthData().then((user)=>{
      getMarkertingMaterial({saleRepId:user.Sales_Rep__c,token:user.x_access_token}).then((result)=>{
        setApiData(result)
        setIsLoading(false)
      }).catch((resErr)=>{
        console.log({resErr});
        
      })
    }).catch((userErr)=>{
      console.log({userErr});
    })
  }

  // const getUserData = async () => {
  //   const result = await GetAuthData();
  //   console.log({result})
  //   setUser(result)
  // };


  return (
    <AppLayout>
      <div className={Styles.inorderflex}>
        <div>
          <h2>
            Marketing Material
          </h2>
        </div>
        <div></div>
      </div>
      {!isLoading ? <Table materialData={apiData} /> : <Loading height={"70vh"} />}
    </AppLayout>
  );
};

export default MarketingMaterial;