import React from 'react';
import {connect, Dispatch, MapStateToPropsParam, MapStateToProps, MapDispatchToProps} from 'react-redux';
import {IReducers} from '../redux';
import {hover, unhover} from '../redux/actions/link';
import {ILinkReducer} from '../redux/reducers/link';

const mapStateToProps: MapStateToProps<ILinkReducer, {}, IReducers> = (state: IReducers): ILinkReducer => {
  return {
    hovered: state.link.hovered,
  };
};

interface IDispatchProps {
  onHover: typeof hover;
  onUnhover: typeof unhover;
}

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = (dispatch: Dispatch<IReducers>): IDispatchProps => {
  return {
    onHover: () => dispatch(hover()),
    onUnhover: () => dispatch(unhover()),
  };
};

interface ILinkProps extends ILinkReducer, IDispatchProps {
}

// @connect<ILinkReducer, IDispatchProps, {}, IReducers>(mapStateToProps, mapDispatchToProps)
// export default class Link extends React.Component<ILinkProps> {
class Link extends React.Component<ILinkProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const {hovered, onHover, onUnhover} = this.props;
    return (
      <a className={hovered ? 'hovered' : 'normal'}
         href="#"
         onMouseEnter={(e: React.SyntheticEvent<Element>) => onHover()}
         onMouseLeave={(e: React.SyntheticEvent<Element>) => onUnhover()}>
        {this.props.children}
      </a>
    );
  }
}
export default connect<ILinkReducer, IDispatchProps, {}, IReducers>(mapStateToProps, mapDispatchToProps)(Link);
