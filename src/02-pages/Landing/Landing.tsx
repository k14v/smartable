import Logo from "@components/Logo";
import useFetch from "04-hooks/use-fetcher";
import useSWR from "swr";
const FETCH_URL = "https://swapi.dev/api/planets/3/";

const Landing = () => {
  const { fetcher } = useFetch();
  const { data } = useSWR(FETCH_URL, fetcher);

  return (
    <div>
      <div className="flex flex-col items-center my-10 ">
        <Logo bg="#2b2b2b" size={500} />
      </div>
      <div className="w-full flex flex-col text-light my-3">
        <div className="text-2xl flex text-dark dark:text-light justify-center">
          Trebuchet v<sub>0.0.1</sub>
        </div>
        <div className="text-xl flex text-dark dark:text-light justify-center">
          {data?.name}
        </div>
      </div>
    </div>
  );
};

export default Landing;
