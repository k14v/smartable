import TestTable from "@containers/TestTable/TestTable";
import { useState } from "react";

const ws = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

const Landing = () => {
  const [data, setData] = useState<any>([]);
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
        setData(formatData);
      }
    } catch (err) {}
  };
  return <div>{data && <TestTable data={data} />}</div>;
};

export default Landing;
