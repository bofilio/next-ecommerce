import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  handleChange: (value: string) => void
}
export default function Input(props: Props) {
  const { handleChange, name, type, placeholder, value, ...rest } = props
  function OnChange(event: any) {
    const { value } = event.target;
    handleChange?.(value);
  }

  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={OnChange}
        value={value}
        {...rest}
      />

      <style jsx>{`
        input {
          width: 100%;
          font-size: 15px;
          margin-bottom: 34px;
          color: #4d4d4d;
          font-weight: 500;
          border: none;
          border-radius: 6px;
          background-color: #ffffff;
          box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
          padding-bottom: 1.25em;
          padding-top: 1.25em;
          padding-left: 32px;
          box-sizing: border-box;
        }
        input ::placeholder {
          color: #b2b2b2;
          opacity: 1; /* Firefox */
        }
        .input :-ms-input-placeholder {
          color: #b2b2b2;
        }
        input ::-ms-input-placeholder {
          color: #b2b2b2;
        }
        @media (max-width: 1000px) {
          input {
            width: 70vw;
            align-self: center;
          }
        }
        @media (max-width: 800px) {
          input {
            width: 75vw;
          }
        }
      `}</style>
    </>
  );
}
