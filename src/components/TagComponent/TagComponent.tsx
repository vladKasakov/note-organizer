import styles from './TagComponent.module.scss';

type Props = {
  name: string;
  onClick?: () => void;
  isPointer?: boolean;
};

export const TagComponent = ({ name, onClick, isPointer = true }: Props) => {
  return (
    <div
      style={{ cursor: isPointer ? 'pointer' : 'default' }}
      className={styles.tag}
      onClick={onClick}
    >
      {name}
    </div>
  );
};
