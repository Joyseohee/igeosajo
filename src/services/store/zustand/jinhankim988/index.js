import create from "zustand";
import jinhankim988Api from "services/apis/jinhankim988";

const initState = { companyList: [] };

const jinhankim988Store = create((set, get) => ({
  ...initState,
  echo: async (param) => {
    const response = await jinhankim988Api.echo(param);
    const { resultCode, resultData } = response;
    if (resultCode === 200) {
      console.log(resultData);
    }
  },
  getCompanyList: async (param) => {
    const response = await jinhankim988Api.getCompanyList(param);
    const { resultCode, resultData } = response;
    if (resultCode === 200) {
      return set((prev) => ({ ...prev, companyList: resultData }));
    }
  },
  getCompanyDetails: async (param) => {},
}));

export default jinhankim988Store;
