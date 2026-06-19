import React from "react";

interface Props {
  title: string;
  weekday: string;
  weekend: string;
}

export default function OpenHours({ title, weekday, weekend }: Props) {
  return (
    <div className="flex flex-col items-center space-y-3 md:items-start">
      <h3 className="text-background font-serif font-medium">{title}</h3>
      <div className="text-background/80 space-y-1">
        <p>{weekday}</p>
        <p>{weekend}</p>
      </div>
    </div>
  );
}
