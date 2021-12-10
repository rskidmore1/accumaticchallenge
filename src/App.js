import React from 'react';
import Card from './card'
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css'

export default class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      pokemonlink: [],
      pokemon: [],
      apiurl: 'https://pokeapi.co/api/v2/pokemon/',
      nextapiurl: '',
      show: false,
      pokeCard: {}

    }

      this.showModal = this.showModal.bind(this);
      this.getNext = this.getNext.bind(this);
  }

  showModal(poke){
    // console.log(poke);

    this.setState({
      show: !this.state.show,
      pokeCard: poke
    });


  }
  getNext(){
    fetch(this.state.apiurl)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        const pokemonlinks = [];
        this.setState({ apiurl: data.next })

        data.results.map(pokemon => pokemonlinks.push(pokemon.url))
        const pokemonArr = this.state.pokemon
        pokemonlinks.map((poke) => {
          fetch(poke)
            .then(response => response.json())
            .then(data => {
              // console.log(data.abilities);
              // console.log(data)

              //Abilities
              const abilities = []
              data.abilities.map(ability => {
                // console.log(ability.ability.name)
                return (
                  abilities.push(ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)) //This is done
                )

              })

              //Moves
              const moves = []
              data.moves.map(move => {
                return (
                  moves.push(moves.push(move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)))
                )
              })
              // console.log(abilities)

              //Form
              const form = data.forms[0].name.charAt(0).toUpperCase() + data.forms[0].name.slice(1);
              // data.forms[0].name
              // console.log(data.forms[0].name)
              // console.log(form[0].toUpperCase() + form.substring(1))
              // console.log('hi')
              // data.forms[0].name[0].toUpperCase() + data.forms[0].name.substring(1)


              //Species
              const species = data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1);
              // console.log(data.species.name)
              const weight = data.weight;

              const height = data.height;

              const sprite = data.sprites.front_default;

              const base_experience = data.base_experience;

              //Type
              const types = []
              data.types.map(type => {
                return (
                  types.push(type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1))

                )
              })

              pokemonArr.push({ abilities: abilities, form: form, species: species, types: types, height: height, weight: weight, sprite: sprite, base_experience: base_experience, moves: moves })
              this.setState({ pokemon: pokemonArr })
              // console.log(pokemonArr)
              // console.log(data)
            })
          return 0;
        })

      });
  }

  componentDidMount() {
    this.getNext()
  }


  render(){
    // console.log(this.state.pokemon)

    return(
      <>
        <div className='container'>


            <Card onClose={this.showModal} show={this.state.show} data={this.state.pokeCard} />


            <InfiniteScroll
              dataLength={this.state.pokemon.length}
              next={this.getNext}
              hasMore={true}
            >

              <table className='left-padding'>
                  <thead className='table-header'>

                      <tr>
                        <th>Species</th>
                        <th>Form</th>
                        <th>Abilities</th>
                        <th className='type-padding-left'>Types</th>
                      </tr>

                  </thead>


                  <tbody className='table-body'>


                    {this.state.pokemon.map((poke, index) => {
                      return (


                        <tr key={index} className="cursor table-row" onClick={e => {
                          this.showModal(poke);
                        }}>
                          <td><p>{poke.species}</p></td>
                            <td>{poke.form}</td>
                            <td>
                              <ul>
                                {poke.abilities.map((ability, index) => {
                                  return (
                                    <li key={index}>{ability}</li>

                                    )
                                  })}
                              </ul>
                            </td>
                            <td>
                              <ul>
                              {poke.types.map((type,index) => {
                                return (
                                  <li key={index}>{type}</li>
                                  )
                                })}
                              </ul>
                            </td>
                          </tr>


                      )
                    })}


                </tbody>
              </table>
            </InfiniteScroll>

          <div className="center-on-page">

            <div className="pokeball">
              <div className="pokeball__button"></div>
            </div>

          </div>
        </div>

      </>
    )
  }

}
