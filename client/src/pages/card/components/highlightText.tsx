import React from "react";

type HighlightedTextProps = {
  text: string;
  searchTerm: string;
  highlightClassName?: string;
};

export const HighlightedText: React.FC<HighlightedTextProps> = ({text,searchTerm,highlightClassName = "bg-yellow-200",}) => {
  if (!searchTerm) return <>{text}</>;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={index} className={highlightClassName}>
            {part}
          </mark>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

