import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import OnScroll from 'react-on-scroll';
import { Link, withRouter } from 'react-router-dom';
import { SAVE_KEYWORD } from '../../redux/actions/search';
import { GET_USER } from '../../redux/actions/user';
import { connect } from 'react-redux';
import axios from 'axios';
import { ip } from '../../configip';

import { styles } from './styles';

class Header extends React.Component {
	state = {
		anchorEl: null,
		mobileMoreAnchorEl: null,
		position: 'static',
		sticky: false,
		search: null,
		isLogin: false
	};
	setSticky = (sticky) => this.setState({ sticky });

	handleProfileMenuOpen = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleMenuClose = async () => {
		if (sessionStorage.getItem('token')) {
			console.log(
				"​Header -> handleMenuClose -> sessionStorage.getItem('token')",
				sessionStorage.getItem('token')
			);
			await axios.post(`${ip}logout`, null, {
				headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
			});
			sessionStorage.setItem('token', null);
			this.setState({
				isLogin: false
			});
		}
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = (event) => {
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};

	renderMenu = (anchorEl, isMenuOpen) => {
		return (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
			>
				<MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
			</Menu>
		);
	};

	renderMobileMenu = (mobileMoreAnchorEl, isMobileMenuOpen) => (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={this.handleMobileMenuClose}
		>
			<MenuItem onClick={this.handleProfileMenuOpen}>
				<IconButton color='inherit'>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	handleInputSearch = (e) =>
		this.setState({
			search: e.target.value
		});

	handleEnterSearch = (e) => {
		if (e.key === 'Enter') {
			this.props.dispatch(SAVE_KEYWORD(this.state.search));
			this.props.history.push({
				pathname: '/search',
				search: `?s=${this.state.search}`,
				params: {
					query: this.state.search
				}
			});
		}
	};

	async componentDidMount() {
		if (sessionStorage.getItem('token')) {
			await this.props.dispatch(GET_USER(sessionStorage.getItem('token')));
			this.setState({
				isLogin: true
			});
		}
	}

	render() {
		const { anchorEl, mobileMoreAnchorEl, sticky, isLogin } = this.state;
		const { classes } = this.props;
		const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
		return (
			<div className={classes.root}>
				<OnScroll
					className='section'
					triggers={[
						{
							top: 0,
							bottom: -0,
							callback: (visible) => this.setSticky(visible)
						}
					]}
				>
					<AppBar position={sticky ? 'static' : 'fixed'} style={{ backgroundColor: '#14141488' }}>
						<Toolbar>
							<Link to='/'>
								<Button variant='contained' color='primary' className={classNames(classes.left)}>
									NOTFLIX
								</Button>
							</Link>
							<Link to='/categories'>
								<Button
									variant='contained'
									color='primary'
									className={classNames(classes.sectionDesktop)}
								>
									Categories
								</Button>
							</Link>
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder='Search…'
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput
									}}
									onChange={this.handleInputSearch}
									onKeyPress={this.handleEnterSearch}
								/>
							</div>
							<div className={classes.grow} />
							<div className={classes.sectionDesktop}>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<Link to='/login'>
										<Button
											color='secondary'
											style={{ color: isLogin && 'white' }}
											variant={isLogin || 'contained'}
										>
											{isLogin ? this.props.user.user.username : 'login'}
										</Button>
									</Link>
								</div>
								<IconButton
									aria-owns={isMenuOpen ? 'material-appbar' : undefined}
									aria-haspopup='true'
									onClick={this.handleProfileMenuOpen}
									color='inherit'
								>
									<AccountCircle />
								</IconButton>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton aria-haspopup='true' onClick={this.handleMobileMenuOpen} color='inherit'>
									<MoreIcon />
								</IconButton>
							</div>
						</Toolbar>
					</AppBar>
					{this.state.isLogin && this.renderMenu(anchorEl, isMenuOpen)}
					{this.renderMobileMenu(mobileMoreAnchorEl, isMobileMenuOpen)}
				</OnScroll>
			</div>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	search: state.searchReducer,
	user: state.userReducer
});

const withRouterHeader = withRouter(Header);
const withConnectHeader = connect(mapStateToProps)(withRouterHeader);

export default withStyles(styles)(withConnectHeader);
