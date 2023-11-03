// AdminApproval.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react/cjs/react.production.min";

//import { Button } from 'antd';

const AdminApproval = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const handleAdminApproval = async () => {
			try {
				const url = `http://localhost:4000/users/${param.id}/approveAdmin`;
				const { data } = await axios.get(url);
				//console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		handleAdminApproval();
	}, [param]);

    

  return (
	<Fragment>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Admin approved successfully</h1>
					{/* <Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link> */}
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};
export default AdminApproval;
