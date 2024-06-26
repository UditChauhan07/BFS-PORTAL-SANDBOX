import { useEffect, useState } from "react";
import BMAIHandler from "../components/IssuesHandler/BMAIHandler.jsx";
import { GetAuthData, getAllAccount, getOrderCustomerSupport, getOrderList, postSupportAny, uploadFileSupport } from "../lib/store.js";
import OrderCardHandler from "../components/IssuesHandler/OrderCardHandler.jsx";
import Attachements from "../components/IssuesHandler/Attachements.jsx";
import { useNavigate } from "react-router-dom";
import CustomerSupportLayout from "../components/customerSupportLayout/index.js";
import AccountInfo from "../components/IssuesHandler/AccountInfo.jsx";
import Loading from "../components/Loading.jsx";

const CustomerService = () => {
  const navigate = useNavigate();
  const [reason, setReason] = useState();
  const [accountList, setAccountList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [sendEmail, setSendEmail] = useState(false)
  const [files, setFile] = useState([]);
  const [desc, setDesc] = useState();
  const [subject, setSubject] = useState();
  const [accountId, setAccountId] = useState(null)
  const [contactId, setContactId] = useState(null)
  const [manufacturerId, setManufacturerId] = useState(null)
  const [Actual_Amount__c, setActual_Amount__c] = useState(null)
  const [errorList, setErrorList] = useState({});
  const [searchPo, setSearchPO] = useState(null);
  const [sumitForm,setSubmitForm] = useState(false)
  const resetHandler = ()=>{
    setOrderId(null)
    setOrderConfirmed(false)
    setFile([])
    setDesc()
    setAccountId(null)
    setContactId(null)
    setManufacturerId(null)
    setActual_Amount__c(null)
    setErrorList({})
  }

  const reasons = [
    { name: "Charges", icon: '/assets/Charges.svg', desc: "extra amount paid for order?" },
    { name: "Product Missing", icon: '/assets/missing.svg', desc: "can't find product in Order?" },
    { name: "Product Overage", icon: '/assets/overage.svg', desc: "got expired product in order?" },
    { name: "Product Damage", icon: '/assets/damage.svg', desc: "got damaged product in order?" },
    { name: "Update Account Info", icon: '/assets/account.svg', desc: "change my personal details" }
  ];
  useEffect(() => {
    GetAuthData()
      .then((response) => {
        getOrderCustomerSupport({
          user: {
            key: response.x_access_token,
            Sales_Rep__c: false ? "00530000005AdvsAAC" : response.Sales_Rep__c,
          },
          PONumber: searchPo
        })
          .then((order) => {
            setOrders(order);
          })
          .catch((error) => {
            console.log({ error });
          });
        getAllAccount({ user: response })
          .then((accounts) => {
            setAccountList(accounts);
          })
          .catch((actError) => {
            console.error({ actError });
          });
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const SubmitHandler = () => {
    setSubmitForm(true)
    GetAuthData()
      .then((user) => {
        if (user) {
          let errorlistObj = Object.keys(errorList);
          let systemStr = "";
          if (errorlistObj.length) {
            errorlistObj.map((id) => {
              systemStr += `${errorList[id].Name}(${errorList[id].ProductCode}) having ${reason} for ${errorList[id].issue} out of ${errorList[id].Quantity} Qty.\n`
            })
          }
          let newDesc = "";
          if (systemStr != "") {
            newDesc = "Issue Desc:" + systemStr
            if (desc) newDesc = "User Desc:" + desc + " \n Issue Desc:" + systemStr
          } else {
            newDesc = desc
          }

          let rawData = {
            orderStatusForm: {
              typeId: "0123b0000007z9pAAA",
              reason: reason,
              salesRepId: user.Sales_Rep__c,
              contactId,
              accountId,
              opportunityId: orderId,
              manufacturerId,
              desc: newDesc,
              priority: "Medium",
              sendEmail,
              subject,
              Actual_Amount__c,
            },
            key: user.x_access_token,
          };
          postSupportAny({ rawData })
            .then((response) => {
              if (response) {
                if (response) {
                  if (files.length > 0) {

                    uploadFileSupport({ key: user.x_access_token, supportId: response, files }).then((fileUploader) => {
                      if (fileUploader) {
                        navigate("/CustomerSupportDetails?id=" + response);
                      }
                    }).catch((fileErr) => {
                      console.log({ fileErr });
                    })
                  } else {
                    navigate("/CustomerSupportDetails?id=" + response);
                  }
                }
              }
            })
            .catch((err) => {
              console.error({ err });
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if(sumitForm) return <Loading height={'80vh'}/>;
  return (<CustomerSupportLayout>
    <section>
      <BMAIHandler reasons={reasons} setReason={setReason} reason={reason} resetHandler={resetHandler} />
      {reason != "Update Account Info" && <OrderCardHandler orders={orders} orderId={orderId} setOrderId={setOrderId} reason={reason} orderConfirmedStatus={{ setOrderConfirmed, orderConfirmed }} accountIdObj={{ accountId, setAccountId }} manufacturerIdObj={{ manufacturerId, setManufacturerId }} errorListObj={{ errorList, setErrorList }} contactIdObj={{ contactId, setContactId }} accountList={accountList} setSubject={setSubject} sendEmailObj={{ sendEmail, setSendEmail }} Actual_Amount__cObj={{ Actual_Amount__c, setActual_Amount__c }} searchPoOBJ={{ searchPo, setSearchPO }} />}
      {/*  files={files} desc={desc} */}
      {reason != "Update Account Info" && <Attachements setFile={setFile} files={files} setDesc={setDesc} orderConfirmed={orderConfirmed} SubmitHandler={SubmitHandler} />}
      {reason == "Update Account Info" && <AccountInfo reason={reason} Accounts={accountList} postSupportAny={postSupportAny} GetAuthData={GetAuthData} setSubmitForm={setSubmitForm} typeId={"0123b0000007z9pAAA"}/>}
    </section>
  </CustomerSupportLayout>)
}
export default CustomerService