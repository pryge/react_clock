import { Component } from 'react';
import './App.scss';

type State = {
  hasClock: boolean;
  clockName: string;
  today: Date;
};

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export class App extends Component<{}, State> {
  state: Readonly<State> = {
    hasClock: true,
    clockName: 'Clock-0',
    today: new Date(),
  };

  timerId: number = 0;

  timeId: number = 0;

  startClock = () => {
    this.timerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    this.timeId = window.setInterval(() => {
      const newTime = new Date();

      // eslint-disable-next-line no-console
      if (this.state.hasClock) {
        // eslint-disable-next-line no-console
        console.log(newTime.toUTCString().slice(-12, -4));
      }

      this.setState({ today: newTime });
    }, 1000);
  };

  stopClock = () => {
    clearInterval(this.timerId);
    clearInterval(this.timeId);
  };

  handleShowClock = () => {
    this.setState({ hasClock: true });
  };

  handleHideClock = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  componentDidMount() {
    this.startClock();

    document.addEventListener('click', this.handleShowClock);
    document.addEventListener('contextmenu', this.handleHideClock);
  }

  componentDidUpdate(_: {}, prevState: State) {
    if (!prevState.hasClock && this.state.hasClock) {
      this.startClock();
    }

    if (prevState.hasClock && !this.state.hasClock) {
      this.stopClock();
    }

    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
    clearInterval(this.timeId);

    document.removeEventListener('click', this.handleShowClock);
    document.removeEventListener('contextmenu', this.handleHideClock);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.hasClock && (
          <div className="Clock">
            <strong className="Clock__name">{this.state.clockName}</strong>

            {' time is '}

            <span className="Clock__time">
              {this.state.today.toUTCString().slice(-12, -4)}
            </span>
          </div>
        )}
      </div>
    );
  }
}
