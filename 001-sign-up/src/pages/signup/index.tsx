import classes from './index.module.scss';
import SignUpForm from '../../containers/SignUpForm';

const SignUpPage = () => {
  return (
    <div className={classes.Container}>
      <SignUpForm />
    </div>
  )
}

export default SignUpPage;
