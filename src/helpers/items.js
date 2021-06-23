import React from "react";



export const recursion = (id, mas, items) => {
    items.map(item => {
        if (item.parent_id === id) {
            if (id === 0) {
                mas.push(item);
                recursion(item.id, mas, items);
            } else {
                mas.map(current => {
                    if (current.id === id) {
                        if (!current.children) {
                            current.children = [];
                        }
                        current.children.push(item);
                        recursion(item.id, current.children, items);
                    }
                });
            }
        }
    });
    return mas;
};

export const recursionChild = (child) => {
    let deepChild = child.map( (current) => {
        if(current.hasOwnProperty('children')){
            let childHead = recursionChild(current.children);
            return (<li key={current.id}>{current.label}{childHead}</li>);
        }
        else return (<li key={current.id}>{current.label}</li>)

    });
    return ( <ul>{deepChild}</ul>)
};