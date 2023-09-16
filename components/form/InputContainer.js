export default function InputContainer({ children }) {
  return (
    <>
      <div className="inputContainer">{children}</div>

      <style jsx>{`
        .inputContainer {
          width: 100%;
          max-width: 428px;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
}
