import _ from "lodash";

export const isObjectEmpty = (objectName) => {
  return _.isEmpty(objectName);
};

export const isObjectEqual = (objectName1, objectName2) => {
  return _.isEqual(objectName1, objectName2);
};
