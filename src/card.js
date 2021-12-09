import React from 'react';
import "./modal.css";

export default class Card extends React.Component {
  // constructor(props) {
  //   super(props)

  //    console.log(this.props.data)
  //    this.onClose = this.onClose.bind(this);
  // }
    onClose = e => {
      this.props.onClose && this.props.onClose(e);
    };

    render() {
    // console.log(this.props.data)

      if (!this.props.show) {
        return null;
      }
      return (


        <div className="modal" id="modal">
          <h2>Modal Window</h2>

          <div>
            <p>{this.props.data.form}</p>
            <p>{this.props.data.species}</p>
            <ul>
              {this.props.data.abilities.map((ability, index) => {
                return (
                  <li key={index}> {ability}  </li>
                )
              })}
            </ul>
            <ul>
              {this.props.data.types.map((type, index) => {
                return (
                  <li key={index}> {type} </li>
                )
              })}
            </ul>
            <p>weight: {this.props.data.weight}</p>
            <p>Height: {this.props.data.height}</p>
            <p>Base Experience: {this.props.data.base_experience}</p>
            <img src={this.props.data.sprite} alt="sprite"></img>
          </div>

          <div className="content">{this.props.children}</div>
          <div className="actions">
            <button className="toggle-button" onClick={this.onClose}>
              close
            </button>
          </div>
        </div>



      );
    }

}
