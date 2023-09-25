import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageContainer from '../../components/page-container';
import Link from 'next/link';
import { getErrorMessage } from '../../lib/form';

import AlertError from '../../components/alerts/error';
import Button from '../../components/form/button';
import Input from '../../components/form/input';
import InputContainer from '../../components/form/InputContainer';
import FormContainer from '../../components/form/formContainer';
import { useSignIn, useSignUpWithOAuth2 } from '../../react-query/mutation_hooks';
import { useStoreState } from '../../state/store';

export default function Login() {
  const { mutate: signIn, isLoading: isSigning } = useSignIn()
  const { mutate: googleSignIn, isLoading: isGooglesigning } = useSignUpWithOAuth2()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useStoreState(store => store.user)
  const router = useRouter();
  function handlegoogleSignin() {
    googleSignIn("google",
      {
        onSuccess: () => router.push('/')
      })
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    signIn({
      email: email.trim(),
      password: password.trim(),
    },
      {
        onSuccess: () => router.push('/')
      }
    );
  }
  useEffect(() => {
    if (user) router.push("/")
  }, [])

  return (
    <PageContainer title="BZ E-commerce - Login" description="">
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <h3 className="formTitle">login</h3>

          <InputContainer>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              handleChange={(value: string) => setEmail(value)}
              value={email}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              handleChange={(value: string) => setPassword(value)}
              value={password}
            />

            <Button type="submit" title="Login" />
            <Button
              type="button"
              title="Sign in width Google"
              bg="#DB4437"
              onClick={handlegoogleSignin}
            />
          </InputContainer>
        </form>

        <Link href="/user/signup">
          <a className="switchForm">I do not have a account</a>
        </Link>
        <Link href="/user/resetpassword">
          <a className="switchForm">I forgot my password</a>
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
          margin-bottom: 84px;
        }
        .switchForm {
          color: #b2b2b2;
          margin-top: 12px;
          font-weight: 500;
        }
      `}</style>
    </PageContainer>
  );
}
