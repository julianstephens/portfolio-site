import { AiOutlineCopyright } from "react-icons/ai";

const AppFooter = () => {
  return (
    <p className="w-full flex items-center justify-center text-muted">
      Copyright
      <span className="mx-1">
        <AiOutlineCopyright />
      </span>
      2023 All Rights Reserved
    </p>
  );
};

export default AppFooter;
