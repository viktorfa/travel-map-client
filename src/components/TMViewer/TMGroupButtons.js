import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from 'semantic-ui-react'


const TMGroupButtons = ({ groups, handleClick, selectedGroup }) => {
  const currentIndex = groups.indexOf(selectedGroup)
  const isNext = currentIndex !== -1 && currentIndex < groups.length - 1
  const isPrev = currentIndex > 0
  const prevIndex = isPrev ? currentIndex - 1 : 0
  const nextIndex = isNext ? currentIndex + 1 : 0
  return (
    <ButtonGroup>
      <TMGroupButton
        handleClick={() => handleClick()}
        group={'Show all'}
        active={!selectedGroup}
      />
      <TMGroupButton
        handleClick={() => handleClick(groups[prevIndex])}
        disabled={!isPrev}
        group={'<'}
      />
      {
        getMinSizedSliceFromIndex(groups, currentIndex, 2).map(group => (
          <TMGroupButton
            key={group}
            handleClick={() => handleClick(group)}
            group={group}
            active={selectedGroup === group}
          />
        ))
      }
      <TMGroupButton
        handleClick={() => handleClick(groups[nextIndex])}
        disabled={!isNext && selectedGroup}
        group={'>'}
      />
    </ButtonGroup>
  )
}

const getMinSizedSliceFromIndex = (array, index, sliceSize) => {
  return array.slice(Math.max(Math.min(index, array.length - sliceSize), 0), Math.max(index, 0) + sliceSize)
}

const TMGroupButton = ({ group, handleClick, active, disabled }) => (
  <Button
    onClick={handleClick}
    active={active}
    disabled={!!disabled}
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
