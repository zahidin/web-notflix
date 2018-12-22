import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { GET_FEATURED } from '../../../redux/actions/featured';
import { Link } from 'react-router-dom';

import BackgroundGradient from './background-gradient';
import { styles } from './jumbotron-styles';

const dummyData = [
	{
		image: '/assets/1.jpg'
	}
];

class Jumbotorn extends React.Component {
	renderChip = (item, classes) => (
		<Grid item>
			<Chip label={item} className={classes.chip} color='default' />
		</Grid>
	);

	renderAltFeatured = (item, key, classes) => (
		<div className={classes.container} key={key}>
			<BackgroundGradient />
			<img
				src={item.image}
				style={{ filter: 'blur(0)' }}
				className={classNames(classes.images, 'image')}
				alt='#'
			/>
		</div>
	);

	renderFeatured = (item, key, classes) => {
		return (
			<div className={classes.container} key={key}>
				<BackgroundGradient />
				<img src={item.image} className={classNames(classes.images, 'image')} alt='#' />
				<Grid container className={classes.content}>
					<Typography style={{ fontSize: '4vmax', color: 'white' }}>{item.title}</Typography>
					<Grid style={{ marginBottom: 12 }} item xs={12}>
						<Chip variant='outlined' color='secondary' label={item.rating} />
					</Grid>
					<Typography paragraph variant='body1' style={{ color: 'white', maxWidth: 400 }}>
						{item.sinopsis}
					</Typography>
					<Grid container className={classes.content}>
						{this.renderChip(item.genre, classes)}
					</Grid>
					{this.renderButtonActions(item, classes)}
				</Grid>
			</div>
		);
	};

	renderButtonActions = (item, classes) => (
		<div className={classes.buttonWraper}>
			<div>
				<Button
					color='primary'
					size='small'
					className={classNames(classes.button, classes.leftIcon, classes.BottomIcon)}
				>
					<Icon className={classes.middleIcon}>remove_red_eye</Icon>
					<Typography style={{ color: 'white' }}>{item.views}</Typography>
				</Button>
			</div>

			<div>
				<Link
					to={{
						pathname: `/movie/${item.title}`,
						query: {
							title: item.title,
							id: item.id
						}
					}}
				>
					<Button variant='contained' color='secondary' size='large' className={classes.button}>
						<Icon className={classes.leftIcon}>play_arrow</Icon>
						Play
					</Button>
				</Link>
			</div>

			<div>
				<Button
					color='primary'
					size='small'
					className={classNames(classes.button, classes.leftIcon, classes.BottomIcon)}
				>
					<Icon className={classes.middleIcon}>bookmark</Icon>
					<Typography style={{ color: 'white' }}>bookmark</Typography>
				</Button>
			</div>
		</div>
	);

	componentDidMount() {
		this.props.dispatch(GET_FEATURED());
	}

	render() {
		const { classes } = this.props;

		return (
			<Carousel
				showThumbs={false}
				showStatus={false}
				className={classes.container}
				showIndicators={false}
				style={{ width: '100vw' }}
				dynamicHeight={true}
				autoPlay
				interval={5000}
				infiniteLoop
			>
				{this.props.featured.data.length ? (
					this.props.featured.data.map((item, key) => this.renderFeatured(item, key, classes))
				) : (
					dummyData.map((item, key) => this.renderAltFeatured(item, key, classes))
				)}
			</Carousel>
		);
	}
}

const mapStateToProps = (state) => ({
	featured: state.featuredReducer
});

const withConnectJumbotron = connect(mapStateToProps)(Jumbotorn);

export default withStyles(styles)(withConnectJumbotron);
