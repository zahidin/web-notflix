export const styles = (theme) => ({
	card: {
		display: 'grid',
		flexDirection: 'row',
		gridTemplateColumns: '2fr 1fr',
		marginBottom: '10px',
		backgroundColor: '#343434',

		[theme.breakpoints.up('xs')]: {
			width: 300
		},
		[theme.breakpoints.up('sm')]: {
			width: 600
		},
		[theme.breakpoints.up('md')]: {
			width: 800
		}
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 0 auto'
	},
	content: {
		flex: '1 0 auto'
	},
	cover: {
		flex: '1 0 auto'
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing.unit * 3,
		paddingBottom: theme.spacing.unit
	},
	playIcon: {},
	lopingStart: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column'
	}
});
