type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function layout({ children, modal }: Props) {
  return (
    <section>
      {children}
      {modal}
    </section>
  );
}
