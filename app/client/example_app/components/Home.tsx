import React from 'react';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import CounterConnected from './CounterConnected';
import AsyncComp from './AsyncComp';
import TechStack from './TechStack';
import { IMandatoryProps } from '../../App';

interface IHomeProps {
}

type HomeProps = RouteComponentProps<any> & IHomeProps & IMandatoryProps;

class Home extends React.Component<HomeProps> {

  public render() {
    const { history, otherApps, match: { url } } = this.props;
    const navigateTo = (route: string): void => {
      history.push(route);
    };
    return (
      <React.Fragment>
        <div id="example-app-subheader">
          <h3>Simple Example App</h3>
          <div>
            {otherApps.map(({ name, path }) => (
              <h3 key={path} onClick={(_e: React.SyntheticEvent<HTMLElement>) => navigateTo(path)}>
                {name}
              </h3>
            ))}
          </div>
        </div>
        <div id="example-app-content">
          <AsyncComp/>
          <div className="example-app-content-section">
            <p>With React Router, you can navigate to the connected counter component</p>
            {history.location.pathname !== '/counter'
              ? (
                <div className="navigate-button"
                     onClick={(e: React.SyntheticEvent<HTMLDivElement>) => navigateTo(`${url}/counter`)}>
                  Go To Counter
                </div>
              )
              : null
            }
            <Route path={`${url}/counter`} component={CounterConnected}/>
          </div>
          <TechStack/>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
