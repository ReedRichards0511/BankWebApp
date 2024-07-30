import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ProductsPage } from "./infraestructure/pages/Products.page";

function App() {

 const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsPage/>
    </QueryClientProvider>
  )
}

export default App
