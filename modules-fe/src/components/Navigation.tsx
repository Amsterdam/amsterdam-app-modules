import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  location: string;
  text: string;
};

const Navigation = ({ location, text }: Props) => {
  return (
    <div className="navigation">
      <Link to={location}>
        <FaChevronLeft />
        <span style={{ verticalAlign: "3px" }}>{text}</span>
      </Link>
    </div>
  );
};

export default Navigation;
