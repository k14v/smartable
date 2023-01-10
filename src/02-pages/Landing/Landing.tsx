import TestTable from "@containers/TestTable/TestTable";
import { useState } from "react";

const ws = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

const Landing = () => {
  const [rows, setRows] = useState<any>([]);
  const [objc, setObjc] = useState<any>({});
  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      {
        setObjc({ ...objc, ...json });
        const formatData = Object.entries(objc)
          .sort()
          .map((item) => ({
            name: item[0],
            price: item[1],
          }));
        setRows(formatData);
      }
    } catch (err) {}
  };
  return <div>{rows && <TestTable data={rows} />}</div>;
};

export default Landing;
