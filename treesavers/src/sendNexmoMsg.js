import Nexmo from "nexmo";

const sendMessage = async (message) => {
  console.log(message);
  const nexmo = new Nexmo({
    apiKey: "3dfc8145",
    apiSecret: "YbsPECc4ZiFIQL6a",
  });

  const from = "SAVETR";
  const to = "919731446092"; //918073013439 //919731446092

  await nexmo.message.sendSms(from, to, message);
};
export default sendMessage;
