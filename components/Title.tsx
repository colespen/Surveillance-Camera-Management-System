import styles from "../pages/index.module.css";

const Title: React.FC<{isTripped: boolean}> = ({isTripped}) => {
  return (
    <div className={styles.titleMain}>
          <h1>Surveillance Management System</h1>
          <img
            className={styles.mainIndicator}
            src={"./" + (isTripped ? "red" : "green") + "-circle.png"}
            alt="cam indicator1"
          ></img>
        </div>
  );
};

export default Title;
