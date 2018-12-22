import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';

import { styles } from './styles';

function SearchList(props) {
	const { classes, item } = props;
	const title = item.title.replace(/\s+/g, '').toLowerCase();

	return (
		<Card className={classes.card}>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography gutterBottom={true} component='h5' style={{ color: 'white' }} variant='h5'>
						{item.title}
					</Typography>
					<Chip label={item.rating} style={{ marginRight: 10 }} />
					<Chip label={item.genre} />
				</CardContent>
				<div className={classes.controls}>
					<Link
						to={{
							pathname: `/movie/${title}`,
							query: {
								title: item.title,
								id: item.id
							}
						}}
					>
						<IconButton
							color='secondary'
							style={{
								width: 50,
								height: 50,
								border: '1px solid #F44336',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
							aria-label='Play/pause'
						>
							<PlayArrowIcon className={classes.playIcon} />
						</IconButton>
					</Link>
				</div>
			</div>
			<CardMedia className={classes.cover} image={item.image} title={item.title} />
		</Card>
	);
}

SearchList.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SearchList);
