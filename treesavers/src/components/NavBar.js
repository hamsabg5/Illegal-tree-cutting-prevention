import React from "react";
import { Nav, Navbar, Image, Dropdown } from "react-bootstrap";
import { GlobalDataContext } from "Store";
import { getProfileImg } from "utils";
import { auth } from "config/firebase";
import { UPDATE_USER } from "Store/actionTypes";
import logo from "assets/logo.png";
import Test from "components/Test";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const style = { fontWeight: 500, marginBottom: 0, color: "#172b4d" };
const NavBar = ({ count, showModalHndlr }) => {
  const { dispatch } = React.useContext(GlobalDataContext);
  const PersonImg = getProfileImg(); //rawData.photo
  const [showModal, setShowModal] = React.useState(false);
  const logoutHandler = () => {
    auth.signOut().then(() => {
      dispatch({ type: UPDATE_USER, payload: null });
      sessionStorage.removeItem("isAuthenticated");
    });
  };
  return (
    <>
      <Navbar className="primary-bg pt-3 px-3 px-md-5">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Tree Savers logo"
          />
        </Navbar.Brand>
        <p style={style}>Total Devices: {count}</p>
        <div
          onClick={() => {
            setShowModal(true);
          }}
          className="ml-auto ml-md-3 pointer primary-btn"
          style={{
            color: "#444b4c",
            backgroundColor: "white",
            boxShadow: "0px 11px 15px -6px #01773859",
          }}
        >
          Test
        </div>
        {/* #01C298 */}

        <div className="ml-auto pointer primary-btn d-none d-md-block">
          <a href="#map" className="reset-a">
            View Map
          </a>
        </div>
        <Dropdown className="ml-3 d-none d-md-block">
          <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
            <Image
              src={PersonImg}
              alt="person"
              style={{ width: "3rem" }}
              className="nav_img"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ left: "unset", right: 0 }}>
            <Dropdown.Item href="/" onClick={logoutHandler}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
      <Test
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default NavBar;
