/*
Define as rotas e suas informações, servido como fonte única de
verdade para AppRoutes.jsx e MainMenu.jsx
*/

import Homepage from '../pages/Homepage'

import CarForm from '../pages/car/CarForm'
import CarList from '../pages/car/CarList'

import CustomerForm from '../pages/customer/CustomerForm'
import CustomerList from '../pages/customer/CustomerList'

import UserList from '../pages/user/UserList'
import UserForm from '../pages/user/UserForm'

import Login from '../pages/Login'
import BruteForce from '../pages/BruteForce'

//Constantes que definem o nivel de acesso
const NO_USER = 0              // não ha necessidade do usuário autenticar
const AUTHENTICATED_USER = 1   // somente usuário autentcados
const ADMIN_USER = 2           // somente usuários administradores

const routes = [
    {
        path: '/',
        description: "Inicio",
        element: <Homepage />,
        userLevel: NO_USER,
        divider: true           // mostra uma divisória no menu
    },
        {
        path: '/login',
        description: "Entrar",
        element: <Login />,
        userLevel: NO_USER,
        omitFromMainMenu: true   // não aparece no menu principal
        },
        {
        path: '/costumers',
        description: "Listagem de Clientes",
        element: <CostumerList />,
        userLevel: AUTHENTICATED_USER,
        },
        {
        path: '/costumers/new',
        description: "Cadastro de Clientes",
        element: <CostumerForm />,
        userLevel: AUTHENTICATED_USER,
        omitFromMainMenu: true
    },
        {
        path: '/cars',
        description: "Listagem de Veículos",
        element: <CarList />,
        userLevel: AUTHENTICATED_USER,
    },
        {
        path: '/cars/new',
        description: "Cadastro de Veículos",
        element: <CarForm />,
        userLevel: AUTHENTICATED_USER,
    },
        {
        path: '/cars/:id',
        description: "Alterar Veículos",
        element: <CarForm />,
        userLevel: AUTHENTICATED_USER,
        omitFromMainMenu: true
    },
            {
        path: '/users',
        description: "Listagem de Usuários",
        element: <UserList />,
        userLevel: ADMIN_USER,
    },
                {
        path: '/users/new',
        description: "Cadastro de Usuários",
        element: <UserForm />,
        userLevel: ADMIN_USER,
        divider: true
    },
                {
        path: '/users/:id',
        description: "Alterar Usuários",
        element: <UserForm />,
        userLevel: ADMIN_USER,
    },
                {
        path: '/brute-force',
        description: "Ataque de Força Bruta",
        element: <BruteForce />,
        userLevel: ADMIN_USER,
        divider: true
    },
]

export { routes, NO_USER, AUTHENTICATED_USER, ADMIN_USER}
