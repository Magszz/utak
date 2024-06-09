import _ from "lodash";

export const isObjectTrue = <T extends object>(object: T): boolean => {
  return !Object.values(object).every((item) => !item);
};

export const allValuesHaveLength = <T extends object>(object: T): boolean => {
  return _.every(object, (value) => _.isString(value) && _.size(value) > 0);
};
