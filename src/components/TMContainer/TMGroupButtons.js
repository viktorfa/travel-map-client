import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from 'semantic-ui-react'


const TMGroupButtons = ({ groups, handleClick, selectedGroup }) => (
  <ButtonGroup>
    <TMGroupButton
      handleClick={() => handleClick()}
      group={'Show all'}
      active={!selectedGroup}
    />
    <TMGroupButton
      handleClick={() => handleClick(selectedGroup ? groups[groups.indexOf(selectedGroup) - 1] : groups[0])}
      disabled={groups.indexOf(selectedGroup) === 0}
      group={'<'}
    />
    {
      groups.map(group => (
        <TMGroupButton
          key={group}
          handleClick={() => handleClick(group)}
          group={group}
          active={selectedGroup === group}
        />
      ))
    }
    <TMGroupButton
      disabled={groups.indexOf(selectedGroup) === groups.length - 1}
      handleClick={() => handleClick(selectedGroup ? groups[groups.indexOf(selectedGroup) + 1] : groups[0])}
      group={'>'}
    />
  </ButtonGroup>
)

const TMGroupButton = ({ group, handleClick, active, disabled }) => (
  <Button
    onClick={handleClick}
    active={active}
    disabled={disabled}
  >
    {group}
  </Button>
)

TMGroupButtons.propTypes = {
  groups: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedGroup: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
}


export default TMGroupButtons
