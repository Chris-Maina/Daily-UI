import clsx from "clsx";
import classes from './Button.module.scss';

interface IButton {
  type?: any;
  className?: string;
  children: React.ReactNode;
}

const Button = ({ className, type="button", children }: IButton) => {
  return (<button className={clsx(classes.Button, className)} type={type}>{children}</button>)
}

export default Button;
