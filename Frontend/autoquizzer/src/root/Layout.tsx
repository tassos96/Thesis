import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { Content, Footer } from "antd/lib/layout/layout";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Content className="site-layout">
        <div
          className="site-layout-background layout-wrapper"
        >
          <Outlet />
        </div>
      </Content>
      <Footer className="footer_c">&copy; Αναστάσιος Αντωνόπουλος - Master Thesis - AUEB</Footer>
    </>
  );
};

export default Layout;
