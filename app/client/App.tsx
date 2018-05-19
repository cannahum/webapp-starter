import React from 'react';
import { Router, Route, Redirect, Link } from 'react-router-dom';
import { History as HHistory } from 'history';
import createHistory from 'history/createBrowserHistory';
import { isNull } from 'util';

enum ExampleApp {
  SIMPLE = 'simple',
  GRAPHQL = 'graphql',
}

interface IAppState {
  dynamicComponentsHaveLoaded: boolean;
  components: null | JSX.Element[];
  exampleApp: ExampleApp | null;
}

export interface IExampleAppConfig {
  name: ExampleApp;
  path: string;
}

export interface IMandatoryProps {
  otherApps: IExampleAppConfig[];
}

const history: HHistory = createHistory();
(window as any).hhh = history;

export default class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      dynamicComponentsHaveLoaded: false,
      components: null,
      exampleApp: null,
    };
  }

  public render() {
    const getExampleApp = (appName: ExampleApp = ExampleApp.SIMPLE): JSX.Element => {
      const { components, exampleApp } = this.state;
      if (exampleApp !== appName) {
        this.loadDynamicComponents(appName);
      }
      if (isNull(components)) {
        return (
          <h2>Loading... Please wait</h2>
        );
      }
      return (
        <div>
          <div id="example-app-header">
            <h1>Welcome To The Full Stack App Starter!</h1>
          </div>
          {
            components.map((COMP: any, index: number) => {
              return <COMP key={`dynamic-comp-${index}`}
                           history={history}
                           otherApps={[{ name: 'GraphQL Example', path: '/gql' }]}/>;
            })
          }
        </div>
      );
    };

    return (
      <Router history={history}>
        <div id="example-app-wrapper">
          <Route exact path="/" component={() => <Redirect to="/simple"/>}/>
          <Route path="/simple" component={() => getExampleApp(ExampleApp.SIMPLE)}/>
          <Route path="/gql" component={() => getExampleApp(ExampleApp.GRAPHQL)}/>
        </div>
      </Router>
    );
  }

  private loadDynamicComponents(appName: ExampleApp): void {
    if (this.state.exampleApp === appName) {
      // bail.
      return;
    }
    this.setState({
      exampleApp: appName,
      components: null,
      dynamicComponentsHaveLoaded: false,
    });
    setTimeout(() => {
      let comp: Promise<any>;
      switch (appName) {
        case ExampleApp.GRAPHQL: {
          comp = import('./example_app_gql/Example');
          break;
        }
        case ExampleApp.SIMPLE:
        default: {
          comp = import('./example_app/Example');
          break;
        }
      }
      comp.then((value: any) => {
        this.setState({
          dynamicComponentsHaveLoaded: true,
          components: [value.default as JSX.Element],
        });
      });
    }, 1000);
  }
}
