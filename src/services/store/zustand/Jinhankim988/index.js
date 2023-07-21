import create from "zustand";
import jinhankim988Api from "services/apis/Jinhankim988";

const dialogCompanyInit = {
  isOpen: false,
  company_no: 0,
  company_reg_no: "",
  company_name_kr: "",
  company_state: 0,
  business_format: "",
  business_type: "",
  ceo_name_kr: "",
  membership_code: "WC",
};

const initState = {
  companyList: [],
  dialogCompany: dialogCompanyInit,
  isDialogOpen: false,
};

const jinhankim988Store = create((set, get) => ({
  ...initState,
  getCompanyList: async (param) => {
    const response = await jinhankim988Api.getCompanyList(param);
    const { resultCode, resultData } = response;
    if (resultCode === 200) {
      console.log("getCompanyList", resultData);
      set((prev) => ({ ...prev, companyList: resultData }));
    }
  },
  getCompanyDetails: async (dialogCompanyNo) => {
    const response = await jinhankim988Api.getCompanyDetails(dialogCompanyNo);
    const { resultCode, resultData } = response;
    if (resultCode === 200) {
      console.log("getCompanyDetails", resultData);
      set((prev) => ({ ...prev, dialogCompany: resultData }));
    }
  },
  setIsDialogOpen: (bool) => set((prev) => ({ ...prev, isDialogOpen: bool })),
}));

export default jinhankim988Store;
