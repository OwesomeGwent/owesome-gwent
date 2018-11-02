import React, { Component } from 'react';
import Card from './Card';
import cardData from './data/cards.json';

// type Partial<T> = { [K in keyof T]?: T[K] };

class App extends Component {
  state = {
    cards: Object.keys(cardData).slice(0, 10),
  };
  render() {
    const { cards } = this.state;
    return (
      <div>
        {cards.map(key => (
          <Card key={key} id={key} card={(cardData as any)[key]} />
        ))}
      </div>
    );
  }
}

export default App;
