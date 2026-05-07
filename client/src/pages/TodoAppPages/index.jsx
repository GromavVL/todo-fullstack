import Todo from '../../components/Todo';
import styles from './todoApp.module.scss';

function TodoAppPages () {
  return (
    <div className={styles.homeWrapper}>
      <Todo />
    </div>
  );
}

export default TodoAppPages;
