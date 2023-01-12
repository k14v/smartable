import TablePagination from "@containers/TestTable/PaginationComponent/TablePagination";
import TestTable from "@containers/TestTable/TestTable";

const Landing = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TestTable />
      </div>
    </>
  );
};

export default Landing;
