const thresholds = {
  angleDiff: (presentAngle, previousAngle) => {
    if (Math.abs(parseFloat(presentAngle) - parseFloat(previousAngle)) >= 30) {
      return true;
    }
    return false;
  },
  //Used in Test Form Component
  temp: 40,
  noise: 95,
};
export default thresholds;
