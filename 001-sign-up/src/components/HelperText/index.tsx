import clsx from 'clsx';
import classes from './HelperText.module.scss';

interface IHelperText {
  error?: boolean
  className?: string;
  children: React.ReactNode;
}
const HelperText = ({ error, className, children }: IHelperText) => {
  return (
  <p 
    className={clsx(classes.Text, className, {
      [classes.Error]: error
    })
  }>{children}</p>)
};

export default HelperText;
