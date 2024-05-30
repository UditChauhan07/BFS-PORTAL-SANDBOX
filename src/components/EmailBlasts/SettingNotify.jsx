import { useEffect, useState } from "react";
import StyleSheet from "./SettingNotify.module.css"
import { BiArrowBack, BiSave } from "react-icons/bi";
import ModalPage from "../Modal UI";
import { GetAuthData, storeDatesHandler } from "../../lib/store";
import Loading from "../Loading";

const SettingNotify = ({ setSetting }) => {
    const [size, setSize] = useState(0);
    const [loader, setLoaded] = useState(false)
    let option = [{ lable: "Select Date for Notification", value: 0 }, { lable: 1, value: 1 }, { lable: 2, value: 2 }, { lable: 3, value: 3 }, { lable: 4, value: 4 }, { lable: 5, value: 5 }, { lable: 6, value: 6 }, { lable: 7, value: 7 }, { lable: 8, value: 8 }, { lable: 9, value: 9 }, { lable: 10, value: 10 }, { lable: 11, value: 11 }, { lable: 12, value: 12 }, { lable: 13, value: 13 }, { lable: 14, value: 14 }, { lable: 15, value: 15 }, { lable: 16, value: 16 }, { lable: 17, value: 17 }, { lable: 18, value: 18 }, { lable: 19, value: 19 }, { lable: 20, value: 20 }, { lable: 21, value: 21 }, { lable: 22, value: 22 }, { lable: 23, value: 23 }, { lable: 24, value: 24 }, { lable: 25, value: 25 }, { lable: 26, value: 26 }, { lable: 27, value: 27 }, { lable: 28, value: 28 }]
    const [formAlert, setFormAlert] = useState(false);
    const notifyDateHandler = (e) => {
        const { value } = e.target;
        if (value) {
            setSize(parseInt(value))
        } else {
            setSize(0)
        }
    }
    // useEffect(()=>{},[formAlert])
    const submitHandler = () => {
        let values = [];
        new Array(size).fill(1).map((element, index) => {
            let elementId = document.getElementById("freq" + index);
            let elementEId = document.getElementById("freq" + index + "E");
            if (elementId && elementEId) {
                let value = elementId.value;
                elementEId.style.display = "none";
                if (parseInt(value)) {
                    values.push(value);
                    elementId.style.border = null
                } else {
                    elementEId.style.display = "block";
                    elementId.style.border = "1px solid red"
                }
            }
        })
        if (values.length == size) {
            setLoaded(true)
            GetAuthData().then((user) => {
                storeDatesHandler({ key: user.x_access_token, dates: values }).then((resposne) => {
                    if (resposne) {
                        setSetting(false)
                        setLoaded(false)
                    }
                }).catch((resErr) => {
                    console.log({ resErr });
                })
            }).catch((err) => {
                console.log({ err });
            })
        } else {
            setFormAlert(true)
        }
    }
    return (
        <div className={StyleSheet.container}>
            {loader ? <Loading height={'70vh'} /> :
                <>
                    <ModalPage
                        open={formAlert ?? false}
                        content={
                            <div className="d-flex flex-column gap-3" style={{ maxWidth: '700px' }}>
                                <h2>Empty Fields</h2>
                                <p style={{ lineHeight: '22px' }}>
                                    Please fill form to submit!
                                </p>
                                <div className="d-flex justify-content-around ">
                                    <button style={{ backgroundColor: '#000', color: '#fff', fontFamily: 'Montserrat-600', fontSize: '14px', fontStyle: 'normal', fontWeight: '600', height: '30px', letterSpacing: '1.4px', lineHeight: 'normal', width: '100px' }} onClick={() => setFormAlert(false)}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        }
                        onClose={() => {
                            setFormAlert(false);
                        }}
                    />
                    <div className={StyleSheet.formContainer}>
                        <b className={StyleSheet.containerTitle}>Title</b>
                        <div className="">
                            <label for="freq" className={StyleSheet.labelHolder}>enter frequency for notification
                                <input type="text" id="freq" placeholder="" onKeyUp={notifyDateHandler} className="form-control" />
                            </label>
                        </div>
                        {size > 0 ? new Array(size).fill(1).map((item, i) => {
                            return (
                                <div className="">
                                    <label for={"freq-" + i} className={StyleSheet.labelHolder}>Select freq date for freq {i + 1}
                                        <select className="form-control" id={"freq" + i} name={"freq" + i}>
                                            {option.map((Element) => (
                                                <option value={Element.value}>{Element.lable}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <p className="ml-2 text-sm" style={{ color: 'red', display: 'none' }} id={"freq" + i + "E"}>This field is required.</p>
                                </div>
                            );
                        }) : null}
                        <div className="mt-4 d-flex">
                            <button className={`${StyleSheet.submitButton} d-flex  justify-content-center align-items-center`} onClick={() => setSetting(false)}><BiArrowBack />&nbsp;Back</button>
                            {size ? <button onClick={submitHandler} className={`${StyleSheet.submitButton} d-flex  justify-content-center align-items-center`}><BiSave />&nbsp;Submit</button> : null}
                        </div>
                    </div></>}
        </div>
    );

}

export default SettingNotify