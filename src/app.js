import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import { withRouter } from 'react-router-dom';

import Home from './pages/home/';
import Categories from './pages/categories';
import Detail from './pages/detail';
import Search from './pages/search';
import Login from './pages/login';
import SignUp from './pages/signup';
class App extends React.Component {
	scrollTop = () =>
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	render() {
		return (
			<div>
				<Route
					exact
					path='/login'
					render={(props) => {
						this.scrollTop();
						return <Login {...props} />;
					}}
				/>
				<Route
					exact
					path='/signup'
					render={(props) => {
						this.scrollTop();
						return <SignUp {...props} />;
					}}
				/>
				<div style={{ width: '100%', overflowX: 'hidden' }}>
					{this.props.location.pathname !== '/login' &&
					this.props.location.pathname !== '/signup' && <Header />}

					<Switch>
						<Route
							exact
							path='/'
							render={(props) => {
								this.scrollTop();
								return <Home {...props} />;
							}}
						/>
						<Route
							exact
							path='/categories'
							render={(props) => {
								this.scrollTop();
								return <Categories {...props} />;
							}}
						/>
						<Route
							path='/movie/:name'
							render={(props) => {
								this.scrollTop();
								return <Detail {...props} />;
							}}
						/>
						<Route
							path='/search'
							render={(props) => {
								this.scrollTop();
								return <Search {...props} />;
							}}
						/>
					</Switch>
					{this.props.location.pathname !== '/' &&
					this.props.location.pathname !== '/login' &&
					this.props.location.pathname !== '/signup' && <Footer />}
				</div>
			</div>
		);
	}
}

export default withRouter(App);
