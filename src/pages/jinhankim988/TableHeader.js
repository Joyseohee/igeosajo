export const TableHeader = ({ columns }) => {
  return (
    <div className="list_header clearfix">
      {columns.map((col, idx) => (
        <div key={col} className={`col${idx + 1}`}>
          {col}
        </div>
      ))}
    </div>
  );
};
