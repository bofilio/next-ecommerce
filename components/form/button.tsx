import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement> & {
    title: any;
    leftIcon?: any;
    bg?: string;
  }
export default function Button(props: Props) {
  const { title, bg = "#1875f0", leftIcon, ...rest } = props
  return (
    <>
      <button {...rest}>
        {leftIcon}
        {title}
      </button>

      <style jsx>{`
        button {
          width: 100%;
          display:flex;
          gap:0.25rem;
          align-items:center;
          justify-content:center;
          background-color: ${bg};
          color: #ffffff;
          margin-top: 1rem;
          border: none;
          font-size: 16px;
          border-radius: 6px;
          padding-bottom: 1em;
          padding-top: 1em;
          align-self: center;
          cursor: pointer;
        }
        @media (max-width: 1000px) {
          button {
            width: 70vw;
          }
        }
        @media (max-width: 800px) {
          button {
            width: 75vw;
          }
        }
      `}</style>
    </>
  );
}
