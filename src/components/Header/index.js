import logo from "../../assets/logo.svg";
import "./styles.css";

function Header() {
  return (
    <header className="container-header">
      <img className="logo" alt="logo" src={logo} />
    </header>
  );
}

export default Header;
