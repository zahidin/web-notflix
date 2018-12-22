import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { GET_SEARCH, SAVE_KEYWORD } from '../../redux/actions/search';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { styles } from './styles';
import SearchList from './components/searc-list';
import Typography from '@material-ui/core/Typography';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: this.props.search.keyword || null,
			off: 0
		};
	}

	componentDidMount() {
		this.props.dispatch(GET_SEARCH(this.state.keyword));
		this.setState({
			off: this.props.search.data.length || 0
		});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.search.keyword !== prevState.keyword) {
			nextProps.dispatch(GET_SEARCH(nextProps.search.keyword, prevState.off));
			return {
				keyword: nextProps.search.keyword,
				off: prevState.off + (nextProps.search.data.length || 0)
			};
		} else return null;
	}

	handleLoadMore = async () => {
		this.props.dispatch(SAVE_KEYWORD(this.state.keyword, this.state.off + this.props.search.data.length));
		this.props.dispatch(GET_SEARCH(this.state.keyword, this.state.off + this.props.search.data.length));
		this.props.history.push({
			pathname: '/search',
			search: `?s=${this.state.keyword}&o=${this.state.off + this.props.search.data.length}`,
			params: {
				query: this.state.keyword
			}
		});
		this.setState({
			off: this.state.off + this.props.search.data.length
		});
	};

	renderSearchList = (classes) => {
		if (this.props.search.data.length === 0 && this.props.search.isLoading) {
			return <CircularProgress className={classes.progress} color='secondary' />;
		} else if (this.props.search.data.length === 0) {
			return (
				<Typography variant='h5' gutterBottom style={{ color: 'white' }}>
					Not Found
				</Typography>
			);
		}
		return (
			<div style={classes.loopingStart}>
				{this.props.search.data.length &&
					this.props.search.data.map((item, key) => <SearchList item={item} key={key} />)}
				<Button onClick={this.handleLoadMore} color='secondary'>
					Load More
				</Button>
			</div>
		);
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Typography variant='h5' gutterBottom style={{ color: 'white' }}>
					You search for : {this.props.search.keyword}
				</Typography>
				<Grid container style={{ display: 'flex', justifyContent: 'center' }}>
					<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
						{this.renderSearchList(classes)}
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	search: state.searchReducer
});

const withConnectSearch = connect(mapStateToProps)(Search);

export default withStyles(styles)(withConnectSearch);
