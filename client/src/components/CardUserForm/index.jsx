import { connect } from 'react-redux';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { IoHeartOutline } from 'react-icons/io5';
import { updateUser } from '../../store/slices/userSlice';
import styles from './CardUserForm.module.scss';

function CardUserForm ({ userCard, updateUserById }) {
  return (
    <div className={styles.cardWrapper}>
      {userCard.users.map(u => (
        <article key={u.id} className={styles.userArticle}>
          <div className={styles.cardHeader}>
            <button
              className={styles.iconsHeartButton}
              onClick={() => updateUserById(u.id)}
            >
              <IoHeartOutline className={styles.iconsHeart} />
            </button>
            <img className={styles.userImg} src={u.imgSrc} alt={u.id} />
          </div>
          <div className={styles.cardBody}>
            <p className={styles.fullName}>
              {u.firstName} {u.lastName}
            </p>
            <p className={styles.ageUser}>{u.age} years</p>
            <p className={styles.numberUser}>
              <MdOutlinePhoneIphone />
              {u.phoneNumber}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

const mapStateToProps = ({ userCard }) => ({ userCard });
const mapDispatchToProps = dispatch => ({
  updateUserById: id => dispatch(updateUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardUserForm);
