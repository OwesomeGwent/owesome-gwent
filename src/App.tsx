import React, { Component } from 'react';
import Card from './Card';
import cardData from './data/cards.json';

// type Partial<T> = { [K in keyof T]?: T[K] };
const MOCK_CARD = ['113203', '122205', '142107', '162203'];
class App extends Component {
  state = {
    cards: MOCK_CARD,
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
