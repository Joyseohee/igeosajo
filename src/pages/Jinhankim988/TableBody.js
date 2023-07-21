import { CompanyListItem } from "./CompanyListItem";

export const TableBody = ({ data }) => {
  return (
    <div className="list_body">
      {data.map((item) => (
        <CompanyListItem key={item.company_no} data={item} />
      ))}
    </div>
  );
};
