import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}
const Gradient:React.FC<Props> = ({children}) => {
  return (
      <div className={"h-50 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-blur grid grid-cols-2"}>
        {children}
      </div>
  );
};

export default Gradient;