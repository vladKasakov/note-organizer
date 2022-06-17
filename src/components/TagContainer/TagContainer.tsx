import { Tag } from '../../models';
import { TagComponent } from '../TagComponent';
import styles from './TagContainer.module.scss';

type Props = {
  tags: Tag[];
  onClick?: (tag: Tag) => void;
  isPointer?: boolean;
};

export const TagContainer = ({ tags, isPointer, onClick = () => {} }: Props) => {
  return tags.length > 0 ? (
    <div className={styles['tag-container']}>
      {tags.map((t) => (
        <TagComponent name={t} key={t} onClick={() => onClick(t)} isPointer={isPointer} />
      ))}
    </div>
  ) : (
    <div className={styles.plug}></div>
  );
};
