import {edstimateCopy} from "@edmit/component-library/src/shared";

interface ICollegeWithPrice {
  effectiveCost: number;
  edstimate: number;
  calculationsUseAidAward: boolean;
  financialAidAward: number | null;
}

export const effectivePriceCopy = (college: ICollegeWithPrice) => {
  if (college.calculationsUseAidAward) { return 'Actual Cost' };
  return edstimateCopy;
};

export const effectivePriceCopyInline = (college: ICollegeWithPrice) => {
  if (college.calculationsUseAidAward) { return 'actual cost' };
  return edstimateCopy;
};

export const effectivePriceIfDifferentThanEdstimate = (college: ICollegeWithPrice) => {
  if (college.effectiveCost !== college.edstimate) { return college.effectiveCost }
  return null
}

export const effectivePrice = (college: ICollegeWithPrice) => {
  return college.effectiveCost
};

export const collegeHasEdstimateLowerThanActual = (college: ICollegeWithPrice) => {
  return college.edstimate < college.effectiveCost
}

export const anyCollegesUsingAidAward = (colleges: ICollegeWithPrice[]) => {
  return colleges
    .filter(c => c.calculationsUseAidAward)
    .length > 0
}