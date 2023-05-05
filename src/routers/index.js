import Product from "../Pages/Product/Products"
import User from '../Pages/User/User'
import Order from '../Pages/Order/Order'
import ProductDetail from "../Pages/Product/ProductDetail"
import AddProduct from "../Pages/Product/AddProduct"
import AddSize from "../Pages/Product/AddSize"
import SignIn from "../Pages/SignIn/SignIn"
import Editproduct from "../Pages/Product/EditProduct/Editproduct"
import BillDetail from "../Pages/Order/BillDetail"
import Analysis from "../Pages/Analysis/Analysis"

const publicRouter = [
    {
        path: '', component: Product
    },
    {
        path: '/user', component: User
    },
    {
        path: '/order', component: Order
    },
    {
        path: '/order/:id', component: BillDetail
    },
    {
        path: '/product/:id', component: ProductDetail
    },
    {
        path: '/product/add', component: AddProduct
    },
    {
        path: '/product/add/size/:id', component: AddSize
    },
    {
        path: '/product/edit/:id', component: Editproduct
    },
    {
        path: '/signin', component: SignIn, layout: 'admin'
    },
    {
        path: '/analysis', component: Analysis
    },
]

const privateRouter = [
    {
        path: '/signin', component: SignIn
    },
]

export { publicRouter, privateRouter }