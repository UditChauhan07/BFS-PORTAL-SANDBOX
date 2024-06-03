import React, { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import Loading from "../../components/Loading";
import Styles from "./index.module.css";
import Table from "../../components/Material/table";
import { getMarkertingMaterial } from "../../lib/store";

const MarketingMaterial = () => {
  // const [user, setUser] = useState()
  const [apiData, setApiData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    sendApiCall()
  },[])

  const sendApiCall = async () => {
    setIsLoading(true)
    const result = await getMarkertingMaterial()
    setApiData(result)
    setIsLoading(false)
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