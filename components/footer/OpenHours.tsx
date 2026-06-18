import React from "react";

export default function OpenHours() {
  return (
    <div className="flex flex-col items-center space-y-3 md:items-start">
      <h3 className="text-background font-serif font-medium">Orari</h3>
      <div className="text-background/80 space-y-1">
        <p>Lun - Ven: 09:00 - 19:00</p>
        <p>Sab - Dom: 10:00 - 21:00</p>
      </div>
    </div>
  );
}
