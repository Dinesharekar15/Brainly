import { ReactElement } from 'react';

interface sidebartypes {
  icon: ReactElement;
  text: string;
  onClick?: () => void;
  click?: boolean;
}

const Sibaricon = (prop: sidebartypes) => {
  return (
    <div
      onClick={prop.onClick}
      className={`flex p-2 cursor-pointer font-semibold text-gray-700 items-center gap-5 text-xl rounded-md hover:bg-gray-300 transition-all duration-300 mr-4 ${prop.click ? "bg-gray-300" : ""}`}
    >
      {prop.icon}
      <h3>{prop.text}</h3>
    </div>
  );
};

export default Sibaricon;
