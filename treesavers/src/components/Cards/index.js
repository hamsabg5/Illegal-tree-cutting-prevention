import React from "react";
import Card from "./Card";
import styles from "styles/cards.module.scss";
import { database } from "config/firebase";

const Cards = ({ latestDetails = [], selectedDevice, setSelectedDevice }) => {
  const disableEnableBtnHandlr = async (device,status) => {
    const deviceRef = database.ref(`devices/${device}/disabled`);
    await deviceRef.set(status);
  };
  return (
    <div className={`${styles.cards} d-flex`}>
      {latestDetails.map((item, idx) => (
        <Card
          key={`live-card-${idx}`}
          isActive={selectedDevice === item.device}
          data={item}
          setSelectedDevice={setSelectedDevice}
          disableEnableBtnHandlr={disableEnableBtnHandlr}
        />
      ))}
    </div>
  );
};

export default Cards;
