import { useToastContext } from "@contexts/toastContext";

export default function useFetch() {
  const { showToast } = useToastContext();

  const fetcher = (url: string) => {
    return fetch(url)
      .then((res) => {
        res.status !== 200 && showToast(res.statusText, "error");
        res.status === 200 && showToast("Success", "success");
        return res.json();
      })
      .then((res) => res);
  };

  return { fetcher };
}
