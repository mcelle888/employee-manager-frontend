import React from 'react'
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <img className={styles.badge} src="src\assets\badge.png" alt="icon" />
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/employees" className={styles.navLink}>
            View All Employees
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/add" className={styles.navLink}>
            Add Employee
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar