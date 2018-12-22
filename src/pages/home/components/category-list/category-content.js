import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { Animate } from 'react-simple-animate';

import { styles } from './category-content-styles';
import CardList from '../../../../components/cardlist';
import Title from '../../../../components/title/';

const props = {
	startStyle: {
		transform: 'scale(0.1)',
		opacity: 0
	},
	endStyle: {
		transform: 'scale(1)',
		opacity: 1
	},
	durationSeconds: 0.5,
	easeType: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

class CategoryContent extends React.Component {
	render() {
		const { data, classes, categories } = this.props;
		const valiData = data.length ? data : [];

		return (
			<CardContent>
				<Title variant='subtitle1' noLeft={true}>
					{categories.name}
				</Title>
				<div className={classes.item} style={{ gridGap: 6 }}>
					{valiData.map((item, key) => (
						<Animate
							play={true}
							{...props}
							key={key}
							render={({ style }) => {
								return <CardList item={item} key={key} styles={style} />;
							}}
						/>
					))}
				</div>
			</CardContent>
		);
	}
}

export default withStyles(styles)(CategoryContent);
