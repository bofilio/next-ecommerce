import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PageContainer from '../../components/page-container';
import { SIGN_UP } from '../../apollo/client/mutations';
import { useMutation } from '@apollo/client';
import { getErrorMessage } from '../../lib/form';

import AlertError from '../../components/alerts/error';
import Button from '../../components/form/button';
import Input from '../../components/form/input';
import InputContainer from '../../components/form/InputContainer';
import FormContainer from '../../components/form/formContainer';
import { useSignUp, useSignUpWithOAuth2 } from '../../react-query/mutation_hooks';

export default function SignUp() {
  const router = useRouter();
  const { mutate: signUp, isLoading: signingUp } = useSignUp();
  const { mutate: GoogleSign, isLoading: googleSigning } = useSignUpWithOAuth2("google")
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [msgError, setMsgError] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (password != passwordConfirm) {
      setMsgError('The passwords do not match');
      setPassword('');
      setPasswordConfirm('');
      return;
    }

    try {
      signUp(
        {
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          passwordConfirm: passwordConfirm.trim(),
        },
        {
          onSuccess: () => router.push('/user/login'),
          onError: (err: any) => setMsgError(getErrorMessage(err)),
        }
      );
    } catch (error) {
      setMsgError(getErrorMessage(error));
    }
  }

  return (
    <PageContainer title="BZ E-commerce - Sign Up" description="">
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <h3 className="formTitle">sign up</h3>

          {msgError && <AlertError message={msgError} />}
          <InputContainer>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(value: string) => setName(value)}
              value={name}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(value: string) => setEmail(value)}
              value={email}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(value: string) => setPassword(value)}
              value={password}
            />
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Repeat Password"
              onChange={(value: string) => setPasswordConfirm(value)}
              value={passwordConfirm}
            />

            <Button type="submit" title="Sign Up" />
            <Button
              type="button"
              onClick={() => GoogleSign()}
              title="Sign up width Google"
              bg="#DB4437" />
          </InputContainer>
        </form>

        <Link href="/user/login">
          <a className="switchForm">I already have a account</a>
        </Link>
      </FormContainer>

      <style jsx>{`
        form {
          width: 100%;
          align-items: center;
        }
        form .formTitle {
          text-align: center;
          font-size: 38px;
          font-weight: 1000;
          letter-spacing: 1.65px;
          color: #b2b2b2;
          text-transform: uppercase;
          margin-bottom: 32px;
        }
        .switchForm {
          color: #b2b2b2;
          margin-top: 12px;
          font-weight: 500;
        }
      `}
      </style>
    </PageContainer>
  );
}
