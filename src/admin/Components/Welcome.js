import Welcome from "../../../../bpl-tools/Admin/Welcome";
import { welcomeInfo } from "../utils/data";

const WelcomePage = (props) => {
  const { adminUrl } = props;

  return <Welcome {...props} {...welcomeInfo(adminUrl)} />;
};
export default WelcomePage;
