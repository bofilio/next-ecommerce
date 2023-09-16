export default function Button({ type, title, bg }) {
  return (
    <>
      <button type={type}>{title}</button>

      <style jsx>{`
        button {
          width: 100%;
          background-color: ${bg ?? '#1875f0'};
          color: #ffffff;
          margin-top: 1rem;
          border: none;
          font-size: 18px;
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
