import styles from './Button.module.scss';
type Props = {
  children?: React.ReactNode;
  onClick: () => void;
  color: string;
  backgroundColor: string;
  isRound?: boolean;
  width?: string;
  height?: string;
};

export const Button = ({
  children,
  onClick,
  color,
  backgroundColor,
  isRound,
  height = '3rem',
  width = '3rem',
}: Props) => {
  return (
    <div
      style={{
        color,
        backgroundColor,
        borderRadius: isRound ? '50%' : 'var(--radii)',
        height,
        width,
      }}
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
