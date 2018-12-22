import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import { styles } from './styles';
import { Link, withRouter } from 'react-router-dom';
import { USER_LOGIN } from '../../../../redux/actions/user';
import validator from 'validator';
import { connect } from 'react-redux';

class LoginTab extends React.Component {
	state = {
		email: '',
		password: ''
	};

	handleChangeText = (target) => (e) =>
		this.setState({
			[target]: e.target.value
		});

	handleLogin = async () => {
		const { email, password } = this.state;
		if (!validator.isEmail(email)) {
			return alert(`${email} is not a valid email.`);
		}
		await this.props.dispatch(USER_LOGIN(email, password));
		sessionStorage.setItem('token', this.props.user.login.token);
		if (this.props.user.login.token) return this.props.history.push('/');

		return alert(this.props.user.login.message);
	};

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.padding}>
				<div className={classes.margin}>
					<Grid container spacing={8} alignItems='flex-end'>
						<Grid item>
							<Face />
						</Grid>
						<Grid item md={true} sm={true} xs={true}>
							<TextField
								onChange={this.handleChangeText('email')}
								label='E-Mail'
								type='email'
								fullWidth
								autoFocus
								required
							/>
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems='flex-end'>
						<Grid item>
							<Fingerprint />
						</Grid>
						<Grid item md={true} sm={true} xs={true}>
							<TextField
								onChange={this.handleChangeText('password')}
								label='Password'
								type='password'
								fullWidth
								required
							/>
						</Grid>
					</Grid>
					<Grid container alignItems='center' justify='space-between'>
						<Grid item>
							<FormControlLabel control={<Checkbox color='primary' />} label='Remember me' />
						</Grid>
						<Grid item>
							<Button
								disableFocusRipple
								disableRipple
								style={{ textTransform: 'none' }}
								variant='text'
								color='primary'
							>
								Forgot password ?
							</Button>
						</Grid>
					</Grid>
					<Grid container justify='center' style={{ marginTop: '10px' }}>
						<Button
							variant='outlined'
							color='primary'
							style={{ textTransform: 'none' }}
							onClick={this.handleLogin}
						>
							Login
						</Button>
					</Grid>
					<Grid container justify='flex-start' style={{ marginTop: '10px' }}>
						<Link to='/signup'>
							<Button color='primary' style={{ textTransform: 'none' }}>
								Sign Up
							</Button>
						</Link>
					</Grid>
				</div>
			</Paper>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer
});

const withConnectLoginTab = connect(mapStateToProps)(LoginTab);
const withRouterLoginTab = withRouter(withConnectLoginTab);

export default withStyles(styles)(withRouterLoginTab);
