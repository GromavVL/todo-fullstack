import styles from './CartUser.module.scss';
import CardUserForm from '../../components/CardUserForm';

function CardUser () {
  return (
    <div className={styles.homeWrapper}>
      <CardUserForm />
    </div>
  );
}

export default CardUser;
