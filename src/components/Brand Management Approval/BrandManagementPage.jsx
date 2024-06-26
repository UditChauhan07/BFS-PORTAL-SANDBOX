import { useEffect, useState } from "react";
import BMAIHandler from "../IssuesHandler/BMAIHandler";
import { GetAuthData, getAllAccount, postSupportAny, uploadFileSupport } from "../../lib/store";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import AccountInfo from "../IssuesHandler/AccountInfo";


const BrandManagementPage = ({ setSubmitForm }) => {
    const navigate = useNavigate();
    const reasons = [{ name: "RTV Request", icon: '/assets/request.png', desc: "" }, { name: "Other", icon: '/assets/Other.png', desc: "" }];
    const [reason, setReason] = useState();
    const [accountList, setAccountList] = useState([]);
    const resetHandler = () => {
    }
    function sortingList(data) {
        data.sort(function (a, b) {
            return new Date(b.CreatedDate) - new Date(a.CreatedDate);
        });
        return data;
    }
    useEffect(() => {
        GetAuthData().then((user) => {
            getAllAccount({ user })
                .then((accounts) => {
                    setAccountList(accounts);
                })
                .catch((actError) => {
                    console.error({ actError });
                });
        })
            .catch((error) => {
                console.log({ error });
            });
    }, [])

    return (
        <section>
            <BMAIHandler reasons={reasons} reason={reason} setReason={setReason} resetHandler={resetHandler} />
            {reason && <AccountInfo reason={reason} Accounts={accountList} postSupportAny={postSupportAny} GetAuthData={GetAuthData} setSubmitForm={setSubmitForm} typeId={"0123b000000GfOEAA0"} />}
        </section>
    )
}
export default BrandManagementPage