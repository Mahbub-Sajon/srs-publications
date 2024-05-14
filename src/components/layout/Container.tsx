import { ReactNode } from "react";

type TContainerProps = {
  children: ReactNode;
  className?: string;
};
const Container = ({ children, className }: TContainerProps) => {
  return (
    <div className={` mx-auto px-5 w-full max-w-[1230px]" ${className}`}>
      {children}
    </div>
  );
};

export default Container;
