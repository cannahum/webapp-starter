import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import CounterConnected from './CounterConnected';
import AsyncComp from './AsyncComp';
import TechStack from './TechStack';
import { IMandatoryProps } from '../../App';

interface IHomeProps {
}

type HomeProps = RouteComponentProps<any> & IHomeProps & IMandatoryProps;

interface IDescriptorProps {
  children: React.ReactNode;
  path: string;
}

const WrappedComp: React.SFC<IDescriptorProps> = (props: IDescriptorProps): JSX.Element => (
  <div className="example-app-content-section">
    <p>This component is in {props.path}</p>
    {props.children}
  </div>
);

class Home extends React.Component<HomeProps> {

  public render() {
    const { otherApps } = this.props;
    const pwd: string = '{projectDir}/app/client/example_app/components/';
    return (
      <React.Fragment>
        <div id="example-app-subheader">
          <h3>Simple Example App</h3>
          <div className="other-apps">
            {otherApps.map(({ name, path }) => (
              <Link to={path} key={path}>
                <h3>
                  {name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
        <div id="example-app-content">
          <WrappedComp path={`${pwd}AsyncComp.jsx`}>
            <AsyncComp/>
          </WrappedComp>
          <WrappedComp path={`${pwd}CounterConnected.jsx`}>
            <CounterConnected/>
          </WrappedComp>
          <WrappedComp path={`${pwd}TechStack.tsx`}>
            <TechStack/>
          </WrappedComp>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
