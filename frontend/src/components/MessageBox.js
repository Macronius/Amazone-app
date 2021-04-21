import React from 'react'

export default function MessageBox(props) {
    return (
        <div className={ `alert alert-${props.variant || 'info'}` }>{props.children} </div>
    )
}

//QUESTION:
//Instead of sending the error-state as a child of MessageBox, why not just send it as a prop through MessageBox, then destructure it and use it that way?
//
//Your way seems like its a loop that I don't quite understand

//What about this code would make this choose props.variant over info?

//Does MessageBox exist for reasons beyond simply reporting error messages?

//LAST QUESTION:
//even with styling of alerts
//what's the point of going all the way around the block to establish the alert class?  Why not just set it up?