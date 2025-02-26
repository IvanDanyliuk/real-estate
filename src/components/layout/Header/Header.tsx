import { Link } from "react-router";
import { NAV_LINKS } from "../../../utils/constants";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div>
        Logo
      </div>
      <nav>
        <ul>
          {NAV_LINKS.map(link => (
            <li key={crypto.randomUUID()}>
              <Link to={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        Auth
      </div>
    </header>
  );
};