import { useAppSelector } from '../../hooks';
import { INote } from '../../models';
import { Note } from '../Note';
import styles from './NoteList.module.scss';

type Props = {};

export const NoteList = ({}: Props) => {
  const notes: INote[] = JSON.parse(useAppSelector((state) => state.notes));
  const filterTags = useAppSelector((state) => state.filter);

  const getFilteredNotes = () => {
    if (!filterTags.length) return notes;

    const filteredNotes = notes.filter((note) => {
      for (let i = 0; i < filterTags.length; i++) {
        const filterTag = filterTags[i];

        if (!note.tags.includes(filterTag)) {
          return false;
        }
      }
      return true;
    });
    return filteredNotes;
  };

  return (
    <div className={styles.list}>
      {getFilteredNotes().map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};
