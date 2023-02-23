import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App/App'
import './main.scss'
import 'antd/dist/reset.css'
import 'aos/dist/aos.css'; 

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://cr.higherlifegroup.com/graphql',
    cache: new InMemoryCache()
});

ReactDOM.render(<React.StrictMode><ApolloProvider client={client}> <App /></ApolloProvider></React.StrictMode>, document.getElementById('gameroom'))
