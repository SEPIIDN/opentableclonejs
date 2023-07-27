'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
  useContext,
  useEffect,
  useState,
} from 'react';
import AuthInputs from './auth-inputs';
import useAuth from '../../../../hooks/use-auth';
import { AuthenticationContext } from '../../../../context/auth-context';
import Loading from '../../../../components/layout/loading';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }) {
  const { error, data, loading, setAuthState } =
    useContext(AuthenticationContext);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();

  const renderCondition = (
    signInContent,
    signUpContent
  ) => {
    return isSignIn
      ? signInContent
      : signUpContent;
  };

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.city &&
        inputs.email &&
        inputs.firstName &&
        inputs.lastName &&
        inputs.password &&
        inputs.phone
      ) {
        return setDisabled(false);
      }
    }
    setDisabled(true);
  }, [inputs]);

  const handleClick = () => {
    if (isSignIn) {
      signin(
        {
          email: inputs.email,
          password: inputs.password,
        },
        handleClose
      );
    } else {
      signup(inputs, handleClose);
    }
  };

  const handleOnChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Button
        className={`${renderCondition(
          'bg-red-600 text-white mr-3',
          ''
        )}border p-1 px-4 rounded`}
        onClick={() => handleOpen()}
      >
        {renderCondition('Sign In', 'Sign Up')}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {!loading ? (
            <div className='p-2 h-[30rem]'>
              <div className='text-bold uppercase border-b pb-1 mb-2 text-center'>
                <p className='text-sm'>
                  {renderCondition(
                    'Sign In',
                    'Sign Up'
                  )}
                </p>
              </div>
              <div className='m-auto'>
                <h3 className='text-2xl font-light text-center capitalize'>
                  {renderCondition(
                    'Log Into Your Account',
                    'create an opentable account'
                  )}
                </h3>
                <AuthInputs
                  isSignIn={isSignIn}
                  inputs={inputs}
                  handleOnChange={handleOnChange}
                />
                <button
                  className='bg-red-600 rounded text-sm w-full text-white uppercase p-3 mb-5 disabled:bg-gray-400 disabled:cursor-not-allowed'
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderCondition(
                    'Sign In',
                    'Create Account'
                  )}
                </button>
                {error && (
                  <div
                    class='flex-1 bg-red-100 rounded-lg p-4 mb-4 text-lg font-bold text-red-700'
                    role='alert'
                  >
                    {error}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </Box>
      </Modal>
    </div>
  );
}
