import { AlertDisplayProps } from "../../datatypes/proptypes";

import styles from "./Video.module.css";

const AlertDisplay: React.FC<AlertDisplayProps> = ({isAudio, isMotion, isOffline}) => {
    return (
        <div className={styles.alerts}>
          <img
            className={styles.alertIcon}
            src="./audio-alert.png"
            alt="audio alert"
            style={{ visibility: isAudio ? "visible" : "hidden" }}
          />
          <img
            className={styles.alertIcon}
            src="./motion-alert.png"
            alt="audio alert"
            style={{ visibility: isMotion ? "visible" : "hidden" }}
          />
          <img
            className={styles.alertIcon}
            src="./offline-alert.png"
            alt="offline alert"
            style={{ visibility: isOffline ? "visible" : "hidden" }}
          />
        </div>
    )
}

export default AlertDisplay