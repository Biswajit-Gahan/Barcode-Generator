import styles from "./main-screen.module.css";
import Display from "../display/display";
import Card from "../card/card";
import {useReducer, useRef} from "react";
import { useReactToPrint } from 'react-to-print';
import BarCodeList from "../barcode-list/barcode-list";

export default function MainScreen() {
    const initialState = {
        products: [],
        isDownloading: false,
        showPopup: false,
    }

    function reducer(state, action) {
        return {...state, ...action.payload};
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const componentRef = useRef(null);

    const handleDownload = useReactToPrint({
        content: () => componentRef.current,
        removeAfterPrint: true,
    })

    return <main className={styles.mainScreen}>
        {/* DISPLAY SCREEN */}
        <section className={styles.displayScreen}><Display {...{state, dispatch}}/></section>
    {/* CARDS SCREEN */}
        <section className={styles.cardScreen}>
            {state.products.map((product, index) => (
                <Card key={index} product={{...product, dispatch, state}} />
            ))}
        </section>

        <section ref={componentRef} className={`${styles.barcodeList}`}>
            <BarCodeList state={state} />
        </section>

        {/* DOWNLOAD BUTTON */}
        <section className={styles.downloadButtonContainer}>
            <button onClick={() => {
                if(state.products.length === 0) return;
                handleDownload();
            }} className={styles.downloadButton}>DOWNLOAD</button>
        </section>
    </main>
}