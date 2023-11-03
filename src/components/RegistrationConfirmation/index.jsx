import React from 'react';
import success from "../../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react/cjs/react.production.min"

const RegistrationConfirmation = () => {
  return (
    <Fragment>
			
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Registration Request Received!</h1>
          <p>Your request to register as an admin is being reviewed. You will receive an email shortly about the decision.</p>
					
				</div>
			
		</Fragment>
	);
  //   <div>
  //     <h2>Registration Request Received!</h2>
  //     <p>Your request to register as an admin is being reviewed. You will receive an email shortly about the decision.</p>
  //   </div>
  // );
};

export default RegistrationConfirmation;
