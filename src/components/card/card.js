import styles from "./card.module.css";

export default function Card({product}) {
    function handleDelete(code) {
        const newProductList = product.state.products.filter((product) => product.code !== code);
        product.dispatch({payload: {products: newProductList}});

        const removeAudio = new Audio("/remove.mp3");
        removeAudio.play();
    }

    return <div className={styles.cardContainer}>
        <div className={styles.titleContainer}>
            <img className={styles.checkboxImage} src={"/check-box.svg"} alt="check-box"/>
            <p className={styles.title}>{product.name}</p>
        </div>

        <div className={styles.productDetailsContainer}>
            <p className={styles.productContent}>PRODUCT CODE: {product.code}</p>
            <p className={styles.productContent}>PRODUCT PRICE: RS. {product.price}/-</p>
            <p className={styles.productContent}>PRODUCT COUNT: {product.count} PCS</p>
        </div>

        <button onClick={() => handleDelete(product.code)} className={styles.deleteButton}>DELETE</button>
    </div>
}