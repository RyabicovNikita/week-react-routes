import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
export const NotFound = () => {
	const navigate = useNavigate();
	setTimeout(() => navigate('/'), 5000);
	return (
		<div className={styles['err-container']}>
			<p>Uuups...</p>
			<p>404 Not Found</p>
			<p>Redirecting to the main page...</p>
		</div>
	);
};
