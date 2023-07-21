export const Title = ({ main, sub }) => {
  return (
    <div className="pageLayout__title">
      <div className="pageLayout__title--textBox">
        <p className="title__text title__text--main">{main}</p>
        <p className="title__text title__text--sub">{sub}</p>
      </div>
      <div className="pageLayout__title--optionBox" />
    </div>
  );
};
