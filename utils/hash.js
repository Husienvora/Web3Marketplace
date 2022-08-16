const Web3Utils = require("web3-utils");
export const createCourseHash = (web3) => (courseId, account) => {
  const hexCourseId = Web3Utils.utf8ToHex(courseId);
  const courseHash = Web3Utils.soliditySha3(
    { type: "bytes16", value: hexCourseId },
    { type: "address", value: account }
  );

  return courseHash;
};
