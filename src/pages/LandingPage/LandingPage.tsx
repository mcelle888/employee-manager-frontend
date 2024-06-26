import styles from './LandingPage.module.scss'

const LandingPage = () => {
  return (
    <main className={styles.mainBody}>
      <div className={styles.headerBox}>
        <header className={styles.mainHeader}>
          <p>NYPD Employee Manager &#128680;</p>
          <p>99th Precinct</p>
        </header>
      </div>
    </main>
  );
}

export default LandingPage