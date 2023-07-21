export const CompanyListItem = ({ data }) => {
  const {
    company_no,
    company_reg_no,
    company_name_kr,
    user_name,
    user_contact,
    user_email,
  } = data;
  return (
    <div className="row">
      <div className="col1">
        <p className="ellipsis">
          {company_no}
          {/* <span className="bar" /> */}
        </p>
      </div>
      <div className="col2">
        <p className="ellipsis">{company_reg_no}</p>
      </div>
      <div className="col3">
        <p className="ellipsis">{company_name_kr}</p>
      </div>
      <div className="col4">
        <p className="ellipsis">{user_name}</p>
      </div>
      <div className="col5">
        <p className="ellispsis">{user_contact}</p>
      </div>
      <div className="col6">
        <p className="ellispsis">{user_email}</p>
      </div>
    </div>
  );
};
