import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { disabledd, fetchData, newList} from '../actions/items';
import {recursion, recursionChild} from "../helpers/items";

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.onSorted = this.onSorted.bind(this);
        this.work = [];
    }
    componentDidMount() {
        this.props.fetchData('http://5af1eee530f9490014ead8c4.mockapi.io/items');
    }

    onSorted() {
        this.work = recursion(0, this.work, this.props.items);
        this.props.newList(this.work);
    }

    render() {
        return (
            <div>
                <button disabled={this.props.dis === true} onClick={ () => {
                    this.onSorted();
                    this.props.disabledd(true);
                }}>Sort</button>

                <ul>
                    {this.props.items.map((item) => (
                        <li key={item.id}>
                            {item.label}
                        </li>
                    ))}
                </ul>
                <ul>New list
                    { this.props.newItems.map((item) => {
                            if(item.hasOwnProperty('children')){
                                let newSort = recursionChild(item.children);
                                return (<li key={item.id}>{item.label}{newSort}</li>);
                            }
                            return (<li key={item.id}>{item.label}</li>);
                        }
                    )}
                </ul>
            </div>
        );
    }
}

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        newItems: state.newItems,
        dis: state.disabledReducer,
    };
};
export default connect(mapStateToProps, {fetchData, newList, disabledd})(ItemList);