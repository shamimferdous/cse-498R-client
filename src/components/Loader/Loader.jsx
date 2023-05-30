import styles from "./Loader.module.scss";



const Loader = ({ height }) => {
    return (
        <div className={styles.loader_wrapper} style={{ height: height ?? "10vh" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={styles.loader}>
                <rect x="0" y="45" width="100" height="10" fill="#eee" rx="5"></rect>
                <rect
                    x="2"
                    y="47"
                    width="6"
                    height="6"
                    fill="var(--color-primary)"
                    rx="4"
                    className={styles.path4}
                ></rect>
            </svg>
        </div>
    );
};

export default Loader;