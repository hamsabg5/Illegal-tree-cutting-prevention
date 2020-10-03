const msg91ApiKey = process.env.API_KEY || "318738AlvRxGha5e4a7d39P1";
const phoneNum = process.env.PHONE_NUM || "8073013439";

const MSG91URL = "https://api.msg91.com/api/v5/flow/";

const sendMsg = async (message) => {
  const body = {
    sender: "SAVETR",
    mobiles: "918073013439",
    flow_id: "5ef78e0dd6fc0517e82ef887",
    message: message,
  };

  try {
    await fetch(MSG91URL, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        authkey: msg91ApiKey,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendMsg;
