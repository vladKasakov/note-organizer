import { useState } from 'react';
import { INote, Tag } from '../../models';
import { EditMenu } from './EditMenu';
import styles from './Note.module.scss';
import { EditNoteForm } from './EditNoteForm';
import { TagContainer } from '../TagContainer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { appendTagToFilter } from '../../store/reducers/filterSlice';

type Props = {
  note: INote;
};

const dateOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
} as Intl.DateTimeFormatOptions;

export const Note = ({ note }: Props) => {
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useAppDispatch();
  const filterTags = useAppSelector((state) => state.filter);

  const editNote = () => {
    setIsEditable(true);
  };

  const hideEditForm = () => {
    setIsEditable(false);
  };

  const handleTag = (tag: Tag) => {
    if (!filterTags.includes(tag)) {
      dispatch(appendTagToFilter(tag));
    }
  };

  const viewTemplate = (
    <article className={styles.note}>
      <header className={styles.header}>
        <h2>{note.title}</h2>
        <EditMenu id={note.id} editNote={editNote} />
      </header>
      <p>{note.content}</p>
      <TagContainer tags={note.tags} onClick={handleTag} isPointer={true} />
      <span>
        {new Date(note.date).toLocaleDateString(undefined, dateOptions)}
      </span>
    </article>
  );

  if (isEditable) return <EditNoteForm hideForm={hideEditForm} note={note} />;

  return <>{viewTemplate}</>;
};
