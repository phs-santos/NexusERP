import { ApiContext, AuthContext, CategoryContext, CustomerContext, ProductContext } from './contexts/';
import { AppRoutes } from './core/AppRoute';

function App() {
	return (
		<ApiContext.ApiProvider>
			<AuthContext.AuthProvider>
				<CustomerContext.CustomerProvider>
					<ProductContext.ProductProvider>
						<CategoryContext.CategoryProvider>
							<AppRoutes />
						</CategoryContext.CategoryProvider>
					</ProductContext.ProductProvider>
				</CustomerContext.CustomerProvider>
			</AuthContext.AuthProvider>
		</ApiContext.ApiProvider>
	);
}

export default App;