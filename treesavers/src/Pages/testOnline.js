import React, { Component } from "react";
import { database } from "config/firebase";
import sendMessage from "sendNexmoMsg.js";
import { now } from "moment";
//set up a time interval, which executes periodically to
//checkout whether the device is online or not.
//If date varied too much then send message with latest location and
//set online:false in db

const getPastMin = (minutesToBeSubstracted) => {
  let pastNMin = new Date();
  pastNMin.setMinutes(pastNMin.getMinutes() - minutesToBeSubstracted);
  return pastNMin;
};
class TestOnline extends Component {
  componentDidMount() {
    const interval = 10000;
    setInterval(async () => {
      //only first device is configured now, since others are dummy.
      const data = this.props.latestDetails[0];
      if (data.disabled === true) return;
      const past5Min = getPastMin(5);
      if (
        data.online === true &&
        past5Min.getTime() > new Date(parseInt(data.date) * 1000).getTime()
      ) {
        //send message
        let message = `https://www.google.com/maps/search/${data.location}/`;

        await sendMessage(
          `Device #0 is offline. It was previously spotted in ${message}`
        );
        // set online = false;
        const onlineRef = database.ref("devices/0/online");
        onlineRef.set(false);
      }
    }, interval); //
  }
  render() {
    return null;
  }
}

export default TestOnline;


