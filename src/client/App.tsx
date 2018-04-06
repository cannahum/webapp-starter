import React from 'react';

interface IAppState {
  dynamicComponentsHaveLoaded: boolean;
  components: JSX.Element[];
}

export default class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      dynamicComponentsHaveLoaded: false,
      components: [],
    };
  }

  public componentWillMount() {
    this.loadDynamicComponents();
  }

  public render() {
    console.log(this.state);
    return (
      <div>
        {
          this.state.components.map((Comp: any) => {
            return <Comp/>;
          })
        }
      </div>
    );
  }

  private async loadDynamicComponents(): Promise<void> {
    const comp: any = await import('./example_app/App');
    this.setState({
      dynamicComponentsHaveLoaded: true,
      components: [comp.default as JSX.Element],
    });
  }
}
