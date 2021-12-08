import React from 'react';

export default class card extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
    render() {
      // console.log(this.props.data)
      if (!this.props.show) {
        return null;
      }
      return (
        <div></div>
      );
    }

}
