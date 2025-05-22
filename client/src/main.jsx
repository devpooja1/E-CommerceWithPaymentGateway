import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './admin/admin.css';
import store from './redux/store.jsx';
import { Provider } from 'react-redux';
import LoginContextProvider from './LoginContext.jsx';  

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    
        <LoginContextProvider>  
            <App />
        </LoginContextProvider>
    </Provider>
);
