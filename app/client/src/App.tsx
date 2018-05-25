import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { History as HHistory } from 'history';
import createHistory from 'history/createBrowserHistory';
import { isNull } from 'util';

interface IAppState {
  dynamicComponentsHaveLoaded: boolean;
  components: null | JSX.Element[];
  exampleApp: ExampleApp | null;
}

enum ExampleApp {
  SIMPLE = 'simple',
  GRAPHQL = 'graphql',
}

export interface IExampleAppConfig {
  name: string;
  path: string;
}

type OtherApps = IExampleAppConfig[];

export interface IMandatoryProps {
  otherApps: OtherApps;
}

const history: HHistory = createHistory();

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
                           otherApps={this.getOtherApps()}/>;
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

  private getOtherApps(): OtherApps {
    const { exampleApp } = this.state;
    const otherApps: OtherApps = [];
    if (exampleApp !== ExampleApp.GRAPHQL) {
      otherApps.push({ name: 'GraphQL Example', path: '/gql' });
    }
    if (exampleApp !== ExampleApp.SIMPLE) {
      otherApps.push({ name: 'Simple Example', path: '/simple' });
    }
    return otherApps;
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
          comp = import('./example_app_simple/Example');
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
