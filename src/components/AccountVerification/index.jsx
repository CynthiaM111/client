import React from 'react';
import success from "../../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react/cjs/react.production.min"

const AccountVerification = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.centeredContent}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Your Corner Account has been created successfully!</h1>
          <p>Check your email and click the link you will find there to verify it.</p>
        </div>
      </div>
    </Fragment>
  );
};

export default AccountVerification;
