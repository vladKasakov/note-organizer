import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { INote, Tag } from '../../models';
import { addNote } from '../../store/reducers/noteSlice';
import { addTags } from '../../store/reducers/tagSlice';
import { TagAdder } from '../TagAdder';
import { TagContainer } from '../TagContainer';
import { Button } from '../UI/Button';
import styles from './AddNoteForm.module.scss';

type Props = {
  hideForm: () => void;
};

export const AddNoteForm = ({ hideForm }: Props) => {
  const tags = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const addFormRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<NodeJS.Timeout>();

  const addNewNote = () => {
    if (title || content) {
      const newNote: INote = {
        id: Date.now(),
        content,
        title,
        date: Date.now(),
        tags: selectedTags,
      };

      dispatch(addNote(newNote));
      setTitle('');
      setContent('');
      hideForm();
    }
  };

  const hideFormModal: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === addFormRef.current) {
      hideForm();
    }
  };

  const handleSumbit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addNewNote();
  };

  const addTagToNote = (tag: Tag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const removeTagFromNote = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));

    const regexp = new RegExp(`#${tag}`, 'mgi');

    let newContentValue = content.replaceAll(regexp, tag);

    setContent(newContentValue);
  };

  const createTags = (tags: Tag[]) => {
    dispatch(addTags(tags));
  };

  const handleTextareaInput: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContent(e.target.value);

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
      ref={addFormRef}
      className={styles.modal}
      onClick={(e) => hideFormModal(e)}
    >
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSumbit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
          />
          <textarea
            spellCheck={false}
            value={content}
            onChange={handleTextareaInput}
            placeholder="Content"
          ></textarea>
        </form>
        <TagContainer tags={selectedTags} onClick={removeTagFromNote} />
        <div className={styles.panel}>
          <Button
            width="8rem"
            backgroundColor="var(--clr-primary)"
            color="white"
            onClick={addNewNote}
          >
            Add
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
          availableTags={tags.filter((t) => !selectedTags.includes(t))}
        />
      </div>
    </div>
  );
};
