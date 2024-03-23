import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="border-t-2 border-black bg-gray-900 min-h-[100px]">
      <div className="p-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Whitespace. All rights reserved.
        </p>
      </div>
      <span className="sr-only">
        {" "}
        <a
          rel="noopener"
          target="_blank"
          href="https://icons8.com/icon/tgLepcPbp6mP/cat"
        >
          Cat
        </a>{" "}
        icon by{" "}
        <a rel="noopener" target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </span>
    </div>
  );
};

export default Footer;
