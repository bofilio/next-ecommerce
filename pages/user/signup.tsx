import { useEffect, useState } from 'react';
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
import { useStoreState } from '../../state/store';

export default function SignUp() {
  const router = useRouter();
  const { mutate: signUp, isLoading: signingUp } = useSignUp();
  const { mutate: GoogleSign, isLoading: googleSigning } = useSignUpWithOAuth2()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [msgError, setMsgError] = useState('');
  const user = useStoreState(store => store.user)
  function handlegoogleSignin() {
    GoogleSign("google",
      {
        onSuccess: () => router.push('/')
      })
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (password != passwordConfirm) {
      setMsgError('The passwords do not match');
      setPassword('');
      setPasswordConfirm('');
      return;
    }
    signUp(
      {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
        passwordConfirm: passwordConfirm.trim(),
      },
      {
        onSuccess: () => router.push('/user/login'),
        onError: (err: any) => setMsgError(getErrorMessage(err)),
      }
    );

  }
  useEffect(() => {
    if (user) router.push("/")
  }, [user])

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
              handleChange={(value: string) => setName(value)}
              value={name}
            />
            <Input
              id='email'
              type="email"
              name="email"
              placeholder="Email"
              handleChange={(value: string) => setEmail(value)}
              value={email}
            />
            <Input
              id='phone'
              type="phone"
              name="phone"
              placeholder="Phone Number"
              handleChange={(value: string) => setPhone(value)}
              value={phone}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              handleChange={(value: string) => setPassword(value)}
              value={password}
            />
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Repeat Password"
              handleChange={(value: string) => setPasswordConfirm(value)}
              value={passwordConfirm}
            />

            <Button type="submit" title="Sign Up" />
            <Button
              type="button"
              onClick={handlegoogleSignin}
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
