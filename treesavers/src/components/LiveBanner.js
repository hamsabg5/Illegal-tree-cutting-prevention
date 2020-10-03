import React from "react";
import styles from "styles/liveBanner.module.scss";

const LiveBanner = ({ title }) => {
  return (
    <div className={styles.live_banner}>
      <span className={`${styles.pulse}  mr-3`}></span>
      <span className="primary-text" style={{fontWeight:500,fontSize:'1rem'}}>{title}</span>
    </div>
  );
};

export default LiveBanner;
