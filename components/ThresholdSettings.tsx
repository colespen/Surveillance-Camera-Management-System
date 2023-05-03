import { ThresholdSettingsProps } from "../datatypes/proptypes";

import styles from "../pages/index.module.css";

const ThresholdSettings: React.FC<ThresholdSettingsProps> = ({
  handleThreshChange,
  threshold,
}) => {
  return (
    <div className={styles.motionThresholdWrapper}>
      <fieldset
        className={styles.thresholdSelectors}
        onChange={handleThreshChange}
      >
        <legend>Motion Sensitivity Threshold</legend>
        <div>
          <input
            type="radio"
            id="low"
            name="thresh"
            value="low"
            defaultChecked={threshold === "low"}
          />{" "}
          low
        </div>
        <div>
          <input
            type="radio"
            id="med"
            name="thresh"
            value="med"
            defaultChecked={threshold === "med"}
          />{" "}
          med
        </div>
        <div>
          <input
            type="radio"
            id="high"
            name="thresh"
            value="high"
            defaultChecked={threshold === "high"}
          />{" "}
          high
        </div>
      </fieldset>
    </div>
  );
};

export default ThresholdSettings;
