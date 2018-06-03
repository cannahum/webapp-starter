import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps, Link } from 'react-router-dom';
import { IMandatoryProps } from '../../App';
import Auth from './Auth';

interface IHomeProps {
}

type HomeProps = RouteComponentProps<any> & IHomeProps & IMandatoryProps;

interface IDescriptorProps {
  children: React.ReactNode;
  path: string;
}

const WRAPPED: React.SFC<IDescriptorProps> = (props: IDescriptorProps): JSX.Element => (
  <div className="example-app-content-section">
    <p>This component is in {props.path}</p>
    {props.children}
  </div>
);


class Home extends React.Component<HomeProps> {
  public render() {
    const { otherApps, match } = this.props;
    const pwd: string = '{projectDir}/app/client/example_app_auth/components/';
    return (
      <React.Fragment>
        <div id="example-app-subheader">
          <h3>GraphQL Auth Example App</h3>
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
          <WRAPPED path={`${pwd}Auth.jsx`}>
            <Auth />
          </WRAPPED>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
