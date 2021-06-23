import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {disabledButton, itemsFetchData, newList} from '../actions/items';
import {disabledReducer} from "../reducers/disabled";

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.onSorted = this.onSorted.bind(this);
    }
    componentDidMount() {
        this.props.fetchData('http://5af1eee530f9490014ead8c4.mockapi.io/items')
    }

    work = [];

    onSorted() {
        this.recursion(0, this.work);
        console.log(this.work);
        this.props.newList(this.work);
    }

    recursion(id, mas) {
        this.props.items.map(item => {
            if (item.parent_id === id) {
                if (id === 0) {
                    this.work.push(item);
                    this.recursion(item.id, this.work);
                } else {
                    mas.map(current => {
                        if (current.id === id) {
                            if (!current.children) {
                                current.children = [];
                            }
                            current.children.push(item);
                            this.recursion(item.id, current.children);
                        }
                    });
                }
            }
        });
    }

    recursionChild(child){
        let deepChild = child.map( (current) => {
            if(current.hasOwnProperty('children')){
                let childHead = this.recursionChild(current.children);
                return (<li key={current.id}>{current.label}{childHead}</li>);
            }
            else return (<li key={current.id}>{current.label}</li>)

        });
        return ( <ul>{deepChild}</ul>)
    };

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
                                let newSort = this.recursionChild(item.children);
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        newList: (newItems) => dispatch(newList(newItems)),
        disabledd: (ans) => dispatch(disabledButton(ans))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);