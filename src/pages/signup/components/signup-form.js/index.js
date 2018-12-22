import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Mail, Lock } from '@material-ui/icons';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';
import { connect } from 'react-redux';

import { USER_REGISTER } from '../../../../redux/actions/user';
import { styles } from './styles';

class LoginTab extends React.Component {
	state = {
		mail: null,
		username: null,
		password: null,
		confirmPassword: null,
		agreement: false
	};

	handleChangeText = (target) => (e) => {
		this.setState({
			[target]: e.target.value
		});
	};

	handleAgreement = () =>
		this.setState({
			agreement: !this.state.agreement
		});

	handleSignUp = async () => {
		const { mail, password, confirmPassword, username, agreement } = this.state;
		if (password !== confirmPassword) {
			return alert('password not equal !');
		}
		if (!validator.isEmail(mail || 'gakvalid')) {
			return alert(`${mail} is not a valid email.`);
		}
		if (!agreement) {
			return alert(`check agreement first`);
		}
		await this.props.dispatch(USER_REGISTER(username, username, mail, password));
		alert(this.props.user.regist && this.props.user.regist.message);
		this.props.user.regist && this.props.user.regist && this.props.history.push('/login');
	};

	render() {
		const { classes } = this.props;
		console.log('​LoginTab -> render -> this.props', this.props);
		return (
			<Paper className={classes.padding}>
				<div className={classes.margin}>
					<Grid container spacing={8} alignItems='flex-end'>
						<Grid item>
							<Mail />
						</Grid>
						<Grid item md={true} sm={true} xs={true}>
							<TextField
								label='E-Mail'
								type='email'
								onChange={this.handleChangeText('mail')}
								fullWidth
								autoFocus
								required
							/>
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems='flex-end'>
						<Grid item>
							<Face />
						</Grid>
						<Grid item md={true} sm={true} xs={true}>
							<TextField
								label='Username'
								type='text'
								onChange={this.handleChangeText('username')}
								fullWidth
								autoFocus
								required
							/>
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems='flex-end'>
						<Grid item>
							<Lock />
						</Grid>
						<Grid item md={true} sm={true} xs={true}>
							<TextField
								label='Password'
								type='password'
								onChange={this.handleChangeText('password')}
								fullWidth
								required
							/>
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems='flex-end'>
						<Grid item>
							<Lock />
						</Grid>
						<Grid item md={true} sm={true} xs={true}>
							<TextField
								label='Confirm Password'
								type='password'
								onChange={this.handleChangeText('confirmPassword')}
								fullWidth
								required
							/>
						</Grid>
					</Grid>
					<Grid container alignItems='flex-end' justify='space-between' style={{ minWidth: 400 }}>
						<Grid item>
							<FormControlLabel
								control={
									<Checkbox
										color='primary'
										checked={this.state.agreement}
										onClick={this.handleAgreement}
									/>
								}
								label='agreement terms'
							/>
						</Grid>
					</Grid>
					<Grid container justify='center' style={{ marginTop: '10px' }}>
						<Button
							variant='outlined'
							color='primary'
							style={{ textTransform: 'none' }}
							onClick={this.handleSignUp}
						>
							Sign up
						</Button>
					</Grid>
					<Grid container justify='flex-end' style={{ marginTop: '10px' }}>
						<Link to='/login'>
							<Button color='primary' style={{ textTransform: 'none' }}>
								Login
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
