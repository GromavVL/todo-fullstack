import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { FaRegTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import {
  getTodoThunk,
  createTodoThunk,
  deleteTodoThunk,
  updatedTodoThunk,
} from '../../store/slices/todoSlice';
import { TODO_VALIDATION_SCHEMA } from '../../utils/validatiosnShemas';
import classNames from 'classnames';
import styles from './todo.module.scss';

function Todo ({
  todoTask,
  updateTodoTask,
  createTodo,
  getTodo,
  deleteTodo,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  useEffect(() => {
    getTodo();
  }, [getTodo]);
  const initialValues = {
    todo: '',
  };
  const submitHandler = (values, { resetForm }) => {
    createTodo(values);
    resetForm();
  };
  const changeCompleted = (id, checked) => {
    updateTodoTask(id, { status: checked });
  };
  const startEditing = (id, task) => {
    setEditingId(id);
    setEditText(task);
  };
  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };
  const saveEditing = id => {
    const trimmed = editText.trim();
    if (trimmed) {
      updateTodoTask(id, { body: trimmed });
    }
    setEditingId(null);
    setEditText('');
  };
  const taskClass = isCompleted =>
    classNames(styles.task, { [styles.taskDisable]: isCompleted });

  const completeadtaskNumner = () =>
    todoTask.todo.filter(t => t.status).length;
  const taskNumber = () => todoTask.todo.length;

  return (
    <section className={styles.home}>
      <div className={styles.todoHeader}>
        <h1 className={styles.title}>✓ Todo App</h1>
        <p className={styles.progress}>
          {completeadtaskNumner()} or {taskNumber()} tasks completed
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={TODO_VALIDATION_SCHEMA}
        onSubmit={submitHandler}
      >
        <Form className={styles.addTask}>
          <Field
            name='todo'
            type='text'
            placeholder='Add a new task...'
            autoFocus
            className={styles.inputAdd}
          />
          <button type='submit' className={styles.buttonAdd}>
            + Add
          </button>
        </Form>
      </Formik>
      <div className={styles.taskList}>
        {todoTask.todo.length === 0 ? (
          <div className={styles.noTodo}>
            <h1 className={styles.noTodoTitle}>No todos yet!</h1>
            <p className={styles.noTodoText}>Add one above to get started</p>
          </div>
        ) : (
          todoTask.todo.map(t => (
            <div key={t.id} className={taskClass(t.status)}>
              {editingId === t.id ? (
                <>
                  <input
                    type='text'
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveEditing(t.id);
                      if (e.key === 'Escape') cancelEditing();
                    }}
                    autoFocus
                    className={styles.editInput}
                  />
                  <div className={styles.buttonTask}>
                    <button
                      className={styles.updateTask}
                      onClick={() => saveEditing(t.id)}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className={styles.deleteTask}
                      onClick={cancelEditing}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <label className={styles.taskLabel}>
                    <input
                      type='checkbox'
                      checked={t.status}
                      onChange={({ target: { checked } }) =>
                        changeCompleted(t.id, checked)
                      }
                      className={styles.checkBoxTask}
                    />
                    <p>{t.body}</p>
                  </label>
                  <div className={styles.buttonTask}>
                    <button
                      className={styles.updateTask}
                      onClick={() => startEditing(t.id, t.body)}
                      disabled={t.status}
                    >
                      <FaPen />
                    </button>
                    <button
                      className={styles.deleteTask}
                      onClick={() => deleteTodo(t.id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

const mapStateToProps = ({ todoTask }) => ({ todoTask });
const mapDispatchToProps = dispatch => ({
  updateTodoTask: (id, body) => dispatch(updatedTodoThunk({ id, body })),

  getTodo: data => dispatch(getTodoThunk(data)),
  createTodo: data => dispatch(createTodoThunk(data)),
  deleteTodo: id => dispatch(deleteTodoThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
