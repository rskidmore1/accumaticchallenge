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
          <button className="toggle-button" onClick={this.onClose}>
            X
          </button>
          <h2>Pokemon Details</h2>

          <div>
            <p>Form: {this.props.data.form}</p>
            <p>Species: {this.props.data.species}</p>
            <span>Abilities </span>
            <ul>
              {this.props.data.abilities.map((ability, index) => {
                return (
                  <li key={index}> {ability}  </li>
                )
              })}
            </ul>
            <span>Types</span>
            <ul>
              {this.props.data.types.map((type, index) => {
                return (
                  <li key={index}> {type} </li>
                )
              })}
            </ul>
            <p>Weight: {this.props.data.weight}</p>
            <p>Height: {this.props.data.height}</p>
            <p>Base Experience: {this.props.data.base_experience}</p>
            <img src={this.props.data.sprite} alt="sprite"></img>
          </div>

          <div className="content">{this.props.children}</div>
          <div className="actions">

          </div>
        </div>



      );
    }

}
