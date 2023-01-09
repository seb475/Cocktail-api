import React, { Component } from 'react';
import axios from 'axios';

class Drinks extends Component {
  state = {
    cocktails: [],
    search: ''
  }

  componentDidMount() {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then(resp => {
        const cocktails = resp.data.drinks;
        this.setState({ cocktails });
      })
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    const filteredCocktails = this.state.cocktails
    .sort((a, b) => (a.strDrink > b.strDrink) ? 1 : -1)
    .filter(cocktail => {
      return cocktail.strDrink.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });
    return (
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
        <input type="text" name="search" value={this.state.search} onChange={this.handleInputChange} placeholder="Buscar por Nombre... " />
        { filteredCocktails.length ? filteredCocktails.map(cocktail => 
        <div className="Drink-card ">
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
          <h3><span className='Title'>{cocktail.strDrink}</span></h3>
          <p><span>Instruccions: </span>{cocktail.strInstructions}</p>
        </div>) : <p>No hay coincidencias</p>}
      </div>
    )
  }
}

export default Drinks;