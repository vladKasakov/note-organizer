import { useState } from 'react';
import { AddNoteForm } from '../AddNoteForm';
import { NoteList } from '../NoteList';
import { TagFilter } from '../TagFilter';
import styles from './App.module.scss';

export const App = () => {
  const [isShownAddForm, setisShownAddForm] = useState(false);

  const hideForm = () => {
    setisShownAddForm(false);
  };

  const showAddForm = () => {
    setisShownAddForm(true);
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Note Organizer</h1>
        <TagFilter />
      </header>
      <button onClick={showAddForm} className={styles['add-btn']}>
        +
      </button>
      <NoteList />
      {isShownAddForm && <AddNoteForm hideForm={hideForm} />}
    </>
  );
};
