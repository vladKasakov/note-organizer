import styles from './TagAdder.module.scss';
import { ReactComponent as TagIcon } from '../../assets/tag.svg';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from '../UI/Button';
import { addTag } from '../../store/reducers/tagSlice';
import { Tag } from '../../models';

import { TagComponent } from '../TagComponent';

type Props = {
  addTagToNote: (tag: Tag) => void;
  availableTags: Tag[];
};

export const TagAdder = ({ addTagToNote, availableTags }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const allTags = useAppSelector((state) => state.tags);

  const divRef = useRef<HTMLDivElement | null>(null);

  const addNewTag = () => {
    if (input && !allTags.includes(input)) {
      dispatch(addTag(input));
      setInput('');
    }
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (
      e.target === divRef.current ||
      e.target === divRef.current?.firstChild
    ) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addNewTag();
  };

  return (
    <div ref={divRef} className={styles['tag-adder']} onClick={handleClick}>
      <TagIcon />
      {isOpen && (
        <div className={styles.menu}>
          <form className={styles['tag-addform']} onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <Button
              backgroundColor="var(--clr-primary)"
              color="white"
              width="30px"
              height="22px"
              onClick={addNewTag}
            >
              +
            </Button>
          </form>
          <div className={styles['tag-container']}>
            {availableTags.length > 0 ? (
              availableTags.map((tag) => (
                <TagComponent
                  key={tag}
                  onClick={() => addTagToNote(tag)}
                  name={tag}
                  isPointer={true}
                />
              ))
            ) : (
              <span>Add new tags</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
