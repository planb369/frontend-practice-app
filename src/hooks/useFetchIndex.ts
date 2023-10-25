//indexページのデータを取得する処理
import { baseURL } from "@/baseURL";
import { useQuery, QueryClient } from "react-query";
import axios from "axios";
import { posts } from "../types/types";

const createPath = "/post/create";

type ApiResponse = {
  items: posts[];
};

export default function useFetchIndex() {
  const queryClient = new QueryClient();
  const api = baseURL;

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<posts[]>("posts", async () => {
    try {
      const response = await axios.get<ApiResponse>(api);
      return response.data.items;
    } catch (err) {
      throw new Error("データの取得に失敗しました");
    }
  });

  return { posts, isLoading, isError } as {
    posts: posts[];
    isLoading: boolean;
    isError: boolean;
  };
}
