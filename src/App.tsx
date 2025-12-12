import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRouter from "./router/app.router";
import { useStoreTheme } from "@/stores";

// Create a client
const queryClient = new QueryClient();

function App() {
  const getTheme = useStoreTheme((state) => state.getTheme);

  useEffect(() => {
    getTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
