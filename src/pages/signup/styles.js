export const styles = (theme) => ({
	root: {
		position: 'absolute',
		height: '100vh',
		width: '100%',
		backgroundImage: 'url(/assets/movies.jpg)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	linearGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: 'linear-gradient(to left bottom, rgba(0,0,0,1), rgba(0,0,0,0.5))'
	},
	content: {
		position: 'relative',
		zIndex: 200
	}
});
