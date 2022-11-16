import { useLocation } from "react-router-dom";

type Props = {
  pageTitle: string;
};

const PageTitle = ({ pageTitle }: Props) => {
  const location = useLocation();
  const mainPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className={mainPage ? "mainpage_title" : "page_title"}>
      <h1>{pageTitle}</h1>
    </div>
  );
};

export default PageTitle;
