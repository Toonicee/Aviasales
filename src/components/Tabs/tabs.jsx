import React from 'react';
import PropTypes from 'prop-types';

import TabsButton from './styled-components/styled-components';

class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 'cheapest',
    };
  }

  isActive = ({ target }) => {
    this.setState({ active: target.name });
  };

  render() {
    const { sortDescending, sortByAscending } = this.props;
    const { active } = this.state;
    return (
      <div className="tabs-wrapper">
        <TabsButton
          name="cheapest"
          onClick={e => {
            sortDescending();
            this.isActive(e);
          }}
          active={active === 'cheapest'}
        >
          самый дешевый
        </TabsButton>
        <TabsButton
          name="dearest"
          onClick={e => {
            sortByAscending();
            this.isActive(e);
          }}
          active={active === 'dearest'}
        >
          самый дорогой
        </TabsButton>
      </div>
    );
  }
}
Tabs.defaultProps = {
  sortDescending: () => {},
  sortByAscending: () => {},
};

Tabs.propTypes = {
  sortDescending: PropTypes.func,
  sortByAscending: PropTypes.func,
};

export default Tabs;
