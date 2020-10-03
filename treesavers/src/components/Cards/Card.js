import React from "react";
import styles from "styles/cards.module.scss";
// import thresholds from "config/thresholds";

//TODO: styles.in_danger
const Card = ({
  isActive = false,
  data: {
    temp = true,
    noise = true,
    angle = true,
    location = "12.296,76.639",
    device = "1",
    online = true,
    disabled = false,
  },
  setSelectedDevice,
  disableEnableBtnHandlr,
}) => {
  let isOk = true;
  if (angle || temp || noise || !online) {
    isOk = false;
  }

  const className = `${styles.card} ${isActive && isOk ? styles.active : ""} ${
    isOk ? "" : styles.in_danger
  }`;
  return (
    <div className={styles.card_wrapper}>
      <div onClick={setSelectedDevice.bind(this, device)} className={className}>
        <p style={{ fontWeight: 500 }}>Device {device}</p>
        <p className={styles.card_key}>Location</p>
        <p className={styles.card_value}>
          {location
            .split(",")
            .map((item) => parseFloat(item).toFixed(3))
            .join(",")}
        </p>
        <p className={styles.card_key}>Temperature</p>
        <p className={styles.card_value}>{temp ? "High" : "Normal"}</p>
        <p className={styles.card_key}>Noise</p>
        <p className={styles.card_value}>{noise ? "Detected" : "Normal"}</p>
        <p className={styles.card_key}>Deflection</p>
        <p className={styles.card_value}>{angle ? "Deflected" : "Normal"}</p>
        <p className={styles.card_key}>Status</p>
        <p className={styles.card_value}>
          {disabled ? "Disabled" : online ? "Online" : "Offline"}
        </p>
      </div>
      <div
        onClick={disableEnableBtnHandlr.bind(this, device, !disabled)}
        style={{ backgroundColor: disabled ? "#0fa959" : "#e84c3d" }}
        className={`pointer primary-btn  ${styles.disable_device_btn}`}
      >
        {disabled ? "Enable" : "Disable"}
      </div>
    </div>
  );
};

export default Card;
