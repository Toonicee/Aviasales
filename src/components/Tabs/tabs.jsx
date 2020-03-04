import React from 'react';
import PropTypes from 'prop-types';

import TabsButton from './styled-components/styled-components';

class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      active: null,
    };
  }

  isActive = ({ target }) => {
    this.setState({ active: target.name });
  };

  render() {
    const { sortAllTickets } = this.props;
    const { active } = this.state;
    return (
      <div className="tabs-wrapper">
        <TabsButton
          name="cheapest"
          onClick={e => {
            sortAllTickets(e);
            this.isActive(e);
          }}
          active={active === 'cheapest'}
        >
          самый дешевый
        </TabsButton>
        <TabsButton
          name="fastest"
          onClick={e => {
            sortAllTickets(e);
            this.isActive(e);
          }}
          active={active === 'fastest'}
        >
          самый быстрый
        </TabsButton>
      </div>
    );
  }
}
Tabs.defaultProps = {
  sortAllTickets: () => {},
};

Tabs.propTypes = {
  sortAllTickets: PropTypes.func,
};

export default Tabs;
