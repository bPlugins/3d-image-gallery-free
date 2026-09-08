import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Demos from "../../../../bpl-tools/Admin/Demos";
import Pricing from "../../../../bpl-tools/Admin/Pricing";
import FeatureCompare from "../../../../bpl-tools/Admin/FeatureCompare";
import Activation from "../../../../bpl-tools/Admin/Activation";
import Settings from "../../../../bpl-tools/Admin/Settings";
import Welcome from "../../../../bpl-tools/Admin/Welcome";

import Layout from "./Layout";
import { demoInfo, pricingInfo, welcomeInfo } from "../utils/data";

const App = (props) => {
  const { isPremium, hasPro, adminUrl } = props;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout {...props} />}>
          <Route
            index
            element={<Welcome {...props} {...welcomeInfo(adminUrl)} />}
          />

          <Route
            path="welcome"
            element={<Welcome {...props} {...welcomeInfo(adminUrl)} />}
          />

          <Route
            path="demos"
            element={<Demos demoInfo={demoInfo} {...props} />}
          />

          {!isPremium && (
            <Route
              path="pricing"
              element={
                <Pricing pricingInfo={pricingInfo} options={{}} {...props} />
              }
            />
          )}

          {!isPremium && (
            <Route
              path="feature-comparison"
              element={<FeatureCompare plans={["free", "pro"]} {...props} />}
            />
          )}

          {hasPro && (
            <Route
              path="activation"
              element={
                <Activation
                  {...props}
                  // actions={{
                  //   status: "igb_get_license_status",
                  //   activate: "igb_activate_freemius_license",
                  //   deactivate: "igb_deactivate_freemius_license",
                  // }}
                />
              }
            />
          )}

          <Route
            path="settings"
            element={<Settings {...props} ajaxAction="igbSaveUninstallOption" />}
          />

          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
