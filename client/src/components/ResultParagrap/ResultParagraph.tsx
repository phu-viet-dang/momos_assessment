interface ResultParagraphProps {
  successDomains: string[];
  errorDomains: string[];
}

const ResultParagraph = (props: ResultParagraphProps) => {
  const { successDomains = [], errorDomains = [] } = props;
  return (
    <div>
      <p>
        Finished scrapping media from {successDomains.length} domain(s):{" "}
        {successDomains.map((item) => item)}
      </p>
      <p>
        Scrapped failed media from {errorDomains.length} domain(s):
        {errorDomains.map((item) => item)}
      </p>
    </div>
  );
};

export default ResultParagraph;
