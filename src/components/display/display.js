import styles from "./display.module.css";
import {useRef, useState} from "react";

export default function Display({state, dispatch}) {
    const productCodeRef = useRef();
    const [productCode, setProductCode] = useState(() => "");

    function handleGenerateButton() {
        const brandName = "MAMAMIA";
        const currentTime = `${Date.now()}`;
        const randomCode = [...currentTime].map((item) => {
            switch (item) {
                case "0" : return "X";
                case "1" : return "5";
                case "2" : return "Z";
                case "3" : return "P";
                case "4" : return "2";
                case "5" : return "B";
                case "6" : return "R";
                case "7" : return "9";
                case "8" : return "L";
                case "9" : return "S";
            }
        }).join("");

        productCodeRef.current.classList.remove(styles["emptyInput"]);
        setProductCode(brandName + randomCode);
    };

    function handleAddButton(event) {
        event.preventDefault();
        const [name, code, _, price, count] = event.target;

        let checkInput = true;
        [name, code, price, count].forEach((item) => {
            if(!item.value) {
                checkInput = false;
                item.classList.add(styles["emptyInput"]);
            } else {
                item.classList.remove(styles["emptyInput"]);
            }
        })

        if(!checkInput) {
            return;
        }

        dispatch({payload: {products: [...state.products, {name: name.value, code: code.value, price: price.value, count: count.value}]}});

        [name, price, count].forEach((item) => {item.value = ""});
        setProductCode("");

        const addedAudio = new Audio("/add.mp3");
        addedAudio.play();
    }

    function handleProductNameInput(event) {
        event.target.classList.remove(styles["emptyInput"]);
    }

    function handlePriceInput(event) {
        if(!isNaN(parseFloat(event.target.value))) {
            event.target.classList.remove(styles["emptyInput"]);
            return;
        }
        event.target.value = "";
    }

    function handleCountInput(event) {
        if(!isNaN(parseInt(event.target.value))) {
            event.target.classList.remove(styles["emptyInput"]);
            return;
        }
        event.target.value = "";
    }

    return <form className={styles.displayContainer} onSubmit={handleAddButton}>
        <div className={styles.inputContainer}>
            <span className={styles.lable}>PRODUCT NAME</span>
            <input onInput={handleProductNameInput} className={styles.input} type={"text"} placeholder={"PLEASE SPECIFY PRODUCT NAME"}/>
        </div>

        <div className={styles.inputContainer}>
            <span className={styles.lable}>PRODUCT CODE</span>
            <div className={styles.generateContainer}>
                <input ref={productCodeRef} className={styles.input} readOnly={true} type={"text"}
                       placeholder={"PLEASE GENERATE PRODUCT CODE"} value={productCode}/>
                <button type={"button"} className={styles.generateButton} onClick={handleGenerateButton}>GENERATE</button>
            </div>
        </div>

        <div className={styles.inputContainer}>
            <span className={styles.lable}>PRODUCT PRICE</span>
            <input onInput={handlePriceInput} className={styles.input} type={"text"} placeholder={"PLEASE SPECIFY PRICE OF THE PRODUCT"}/>
        </div>

        <div className={styles.inputContainer}>
            <span className={styles.lable}>PRINT COUNT</span>
            <input onInput={handleCountInput} className={styles.input} type={"text"} placeholder={"PLEASE SPECIFY COUNT TO PRINT"}/>
        </div>

        <button type={"submit"} className={styles.addButton}>ADD</button>
    </form>
}