import React from 'react';
import { isNull } from 'util';

interface IAppState {
  dynamicComponentsHaveLoaded: boolean;
  components: null | JSX.Element[];
}

export default class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      dynamicComponentsHaveLoaded: false,
      components: null,
    };
  }

  public componentWillMount() {
    this.loadDynamicComponents();
  }

  public render() {
    const {components} = this.state;
    if (isNull(components)) {
      return <h2>Loading... Please wait</h2>;
    }
    return (
      <div>
        {
          components.map((COMP: any) => {
            return <COMP/>;
          })
        }
      </div>
    );
  }

  private loadDynamicComponents(): void {
    setTimeout(async () => {
      const comp: any = await import('./example_app/Example');
      this.setState({
        dynamicComponentsHaveLoaded: true,
        components: [comp.default as JSX.Element],
      });
    }, 1 * 1000);
  }
}
