import { useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { removeNote } from '../../../store/reducers/noteSlice';
import styles from './EditMenu.module.scss';

type Props = {
  id: number;
  editNote: () => void;
};

export const EditMenu = ({ id, editNote }: Props) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const toggleEditMenu = () => {
    setIsOpenEdit((prev) => !prev);
  };

  const dispatch = useAppDispatch();

  const deleteNote = () => {
    dispatch(removeNote(id));
  };

  return (
    <div className={styles['edit-menu']}>
      <div className={styles['toggle']} onClick={toggleEditMenu}>
        &#9776;
      </div>
      {isOpenEdit && (
        <div className={styles.settings}>
          <button onClick={editNote}>Edit</button>
          <button onClick={deleteNote}>Delete</button>
        </div>
      )}
    </div>
  );
};
