import React from 'react';

export default class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      pokemonlink: [],
      pokemon: [],
      apiurl: 'https://pokeapi.co/api/v2/pokemon/'
    }
    fetch(this.state.apiurl)
      .then(response => response.json())
      .then(data => {
          // console.log(data)
          // console.log(data.results[0].url)
          const pokemonlinks = [];
          let keyId = 0;
          data.results.map(pokemon => pokemonlinks.push(pokemon.url))
          const pokemonArr = [];
          pokemonlinks.map((poke) => {
            keyId++;
            fetch(poke)
              .then(response => response.json())
              .then(data => {
                // console.log(data.abilities);

                //Abilities
                const abilities = []
                data.abilities.map(ability => {
                  // console.log(ability.ability.name)
                  abilities.push(ability.ability.name) //This is done
                  return 0;
                })
                // console.log(abilities)

                //Form
                const form = data.forms[0].name;
                // console.log(data.forms[0].name)


                //Species
                const species = data.species.name;
                // console.log(data.species.name)

                //Type
                const types = []
                data.types.map(type =>{
                  // console.log(type.type.name)
                  types.push(type.type.name)
                  return 0;
                })





                pokemonArr.push({keyId: keyId, abilities: abilities, form: form, species: species, types: types})
                this.setState({pokemon: pokemonArr})
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

      <table>
        <tr>
          <th>Species</th>
          <th>Form</th>
          <th>Abilities</th>
          <th>Types</th>
        </tr>


          {this.state.pokemon.map((poke) => {
            return (


                <tr>
                  <td>{poke.species}</td>
                  <td>{poke.form}</td>
                  <td>
                    <ul>
                      {poke.abilities.map(ability => {
                                               return (
                          <li>{ability}</li>
                        )
                      })}
                    </ul>
                  </td>
                  <td>
                    <ul>
                    {poke.types.map(type => {
                        return (

                          <li>{type}</li>

                        )
                      })}
                    </ul>
                  </td>
                </tr>


            )
          })}



      </table>

      </>
    )
  }

}
