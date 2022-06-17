import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { INote, Tag } from '../../../models';
import { updateNote } from '../../../store/reducers/noteSlice';
import { addTags } from '../../../store/reducers/tagSlice';
import { TagAdder } from '../../TagAdder';
import { TagContainer } from '../../TagContainer';
import { Button } from '../../UI/Button';
import styles from './EditNoteForm.module.scss';

type Props = {
  note: INote;
  hideForm: () => void;
};

export const EditNoteForm = ({ note, hideForm }: Props) => {
  const { title, content, id, tags } = note;
  const allTags = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  const [titleValue, setTitleValue] = useState(title);
  const [contentValue, setContentValue] = useState(content);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const editFormRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<NodeJS.Timeout>();

  const hideFormModal: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === editFormRef.current) {
      hideForm();
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    editNote();
    hideForm();
  };

  const editNote = () => {
    if (titleValue || contentValue) {
      dispatch(
        updateNote({
          id,
          title: titleValue,
          content: contentValue,
          date: Date.now(),
          tags: selectedTags,
        })
      );
      hideForm();
    }
  };

  const removeTagFromNote = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));

    const regexp = new RegExp(`#${tag}`, 'mgi');

    let newContentValue = contentValue.replaceAll(regexp, tag);

    setContentValue(newContentValue);
  };

  const addTagToNote = (tag: Tag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const createTags = (tags: Tag[]) => {
    dispatch(addTags(tags));
  };

  const handleTextareaInput: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContentValue(e.target.value);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      const parsedTags = parseInput(e.target.innerHTML).map((suit) => suit[1]);

      createTags(parsedTags);

      setSelectedTags((prev) => [
        ...prev,
        ...parsedTags.filter((t) => !selectedTags.includes(t)),
      ]);
    }, 1000);
  };

  const parseInput = (input: string) => {
    const regexp = new RegExp(/#([a-za-я0-9_-]+)/, 'mgi');

    return Array.from(input.matchAll(regexp));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideForm();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [hideForm]);

  return (
    <div
      ref={editFormRef}
      className={styles.modal}
      onClick={(e) => hideFormModal(e)}
    >
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            type="text"
            placeholder="title"
          />
          <textarea
            spellCheck={false}
            value={contentValue}
            onChange={handleTextareaInput}
            placeholder={'Content'}
          ></textarea>
        </form>
        <TagContainer tags={selectedTags} onClick={removeTagFromNote} />
        <div className={styles.panel}>
          <Button
            width="8rem"
            backgroundColor="var(--clr-primary)"
            color="white"
            onClick={editNote}
          >
            save
          </Button>
          <Button
            width="8rem"
            backgroundColor="var(--clr-primary)"
            color="white"
            onClick={hideForm}
          >
            close
          </Button>
        </div>
        <TagAdder
          addTagToNote={addTagToNote}
          availableTags={allTags.filter((t) => !selectedTags.includes(t))}
        />
      </div>
    </div>
  );
};
