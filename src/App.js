import React from 'react';
import Card from './card'
import InfiniteScroll from 'react-infinite-scroll-component';

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
    fetch(this.state.apiurl)
      .then(response => response.json())
      .then(data => {
          // console.log(data)
          const pokemonlinks = [];
          this.setState({nextapiurl: data.next})
          data.results.map(pokemon => pokemonlinks.push(pokemon.url))
          const pokemonArr = [];
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
                  abilities.push(ability.ability.name) //This is done
                  return 0;
                })

                //Moves
                const moves = []
                data.moves.map(move => {
                  return(
                    moves.push(move.move.name)
                  )
                })
                // console.log(abilities)

                //Form
                const form = data.forms[0].name;
                // console.log(data.forms[0].name)


                //Species
                const species = data.species.name;
                // console.log(data.species.name)
                const weight = data.weight;

                const height = data.height;

                const sprite = data.sprites.front_default;

                const base_experience = data.base_experience;

                //Type
                const types = []
                data.types.map(type =>{
                  // console.log(type.type.name)
                  types.push(type.type.name)
                  return 0;
                })

                pokemonArr.push({ abilities: abilities, form: form, species: species, types: types, height: height, weight: weight, sprite: sprite, base_experience: base_experience, moves: moves})
                this.setState({pokemon: pokemonArr})
                console.log(pokemonArr)
                // console.log(data)
              })
            return 0;
          })

      });
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
    fetch(this.state.nextapiurl)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        const pokemonlinks = [];
        this.setState({ nextapiurl: data.next })
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
                abilities.push(ability.ability.name) //This is done
                return 0;
              })

              //Moves
              const moves = []
              data.moves.map(move => {
                return (
                  moves.push(move.move.name)
                )
              })
              // console.log(abilities)

              //Form
              const form = data.forms[0].name;
              // console.log(data.forms[0].name)


              //Species
              const species = data.species.name;
              // console.log(data.species.name)
              const weight = data.weight;

              const height = data.height;

              const sprite = data.sprites.front_default;

              const base_experience = data.base_experience;

              //Type
              const types = []
              data.types.map(type => {
                // console.log(type.type.name)
                types.push(type.type.name)
                return 0;
              })

              pokemonArr.push({ abilities: abilities, form: form, species: species, types: types, height: height, weight: weight, sprite: sprite, base_experience: base_experience, moves: moves })
              this.setState({ pokemon: pokemonArr })
              console.log(pokemonArr)
              // console.log(data)
            })
          return 0;
        })

      });
  }
  render(){
    // console.log(this.state.pokemon)

    return(
      <>

        <Card onClose={this.showModal} show={this.state.show} data={this.state.pokeCard} />




        <table>
            <thead>
              <tr>
                <th>Species</th>
                <th>Form</th>
                <th>Abilities</th>
                <th>Types</th>
              </tr>
            </thead>

            <tbody>
            <InfiniteScroll
              dataLength={this.state.pokemon.length}
              next={this.getNext}
              // inverse={true}
              hasMore={true}
              // loader={<h4>Loading...</h4>}

            >
              {this.state.pokemon.map((poke, index) => {
                return (


                  <tr key={index}>
                    <td><p className="cursor" onClick={e => {
                      this.showModal(poke);
                    }}
                    >{poke.species}</p></td>
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
            </InfiniteScroll>

          </tbody>
        </table>


      </>
    )
  }

}
