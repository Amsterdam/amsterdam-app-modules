type Props = {
  height: string | number;
};

const Gutter = ({ height }: Props) => {
  return <div style={{ height: `${height}` }}>&nbsp;</div>;
};

export default Gutter;
