import React from 'react';

import { TabsButton, Span } from './styled-components/styled-components';

class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }

  active = () => {
    const { sortDescending } = this.props;
    this.setState({
      active: true,
    });
    sortDescending();
  };

  render() {
    const { sortDescending, sortByAscending } = this.props;
    const { active } = this.state;
    return (
      <div className="tabs-wrapper">
        <TabsButton type="button" onClick={this.active} active={active}>
          <Span>самый дешевый</Span>
        </TabsButton>
        <TabsButton onClick={() => sortByAscending()} active={active}>
          <Span>самый дорогой</Span>
        </TabsButton>
      </div>
    );
  }
}

export default Tabs;
