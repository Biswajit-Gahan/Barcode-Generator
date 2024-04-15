import styles from "./barcode-list.module.css";
import Barcode from "react-jsbarcode";

export default function BarCodeList({state}) {
    return <div className={styles.barcodeListContainer}>
        {
            state.products.map(product => {
                return Array.from({length: product.count}, (_, index) => (
                    <Barcode
                        key={index}
                        value={`MRP: ${product.price}`}
                        options={{text: product.name.toUpperCase(), width:1.5, height: 60, fontSize: 10}}
                        className={`${styles.barcodeSvg}`}
                    />
                ))
            })
        }
    </div>
}