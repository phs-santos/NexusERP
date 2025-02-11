import { ApiContext, AuthContext, CategoryContext, CustomerContext, ProductContext } from './contexts/';
import { AppRoutes } from './core/AppRoute';

function App() {
	return (
		<AuthContext.AuthProvider>
			<ApiContext.ApiProvider>
				<CustomerContext.CustomerProvider>
					<ProductContext.ProductProvider>
						<CategoryContext.CategoryProvider>
							<AppRoutes />
						</CategoryContext.CategoryProvider>
					</ProductContext.ProductProvider>
				</CustomerContext.CustomerProvider>
			</ApiContext.ApiProvider>
		</AuthContext.AuthProvider>
	);
}

export default App;