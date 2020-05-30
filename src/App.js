import React, { useState } from 'react';
import { Box, Grommet, Text } from 'grommet';

import PaternChallenge from './PatternChallenge';

const storyBlocks = require('./story-blocks.json');
const storyPaths = require('./story-paths.json');

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
      button: '#74B4EE'
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {
  const [currPosition, setCurrPosition] = useState(0);
  const currBlock = storyBlocks.find(block => block.position === currPosition);

  const updatePosition = (currPosition, action) => {
    const validPaths = storyPaths.filter(path => path.source === currPosition);
    const targetPosition = validPaths.find(path => path.action === action);
    if (targetPosition && targetPosition.target >= 0) {
      setCurrPosition(targetPosition.target);
    } else {
      setCurrPosition(-1);
    }
  }

  return (
    <Grommet theme={theme}>
      <Box fill>
        <Box direction='row' flex overflow={{ horizontal: 'hidden'}} fill>
          <Box 
            flex 
            align='center' 
            justify='center' 
            elevation='small'
          >
            <Text margin='large' size='large'>
             {currBlock.text}
            </Text>
          </Box>
        </Box>
        {currBlock.actions[0] === "PATTERN_CHALLENGE" ? PaternChallenge : currBlock.actions.map(action => {
            return (
              <Box direction='row' margin={{bottom: 'medium', horizontal: 'large'}}>
                <Box 
                  flex 
                  align='center' 
                  justify='center' 
                  background='button'
                  elevation='small'
                  pad='medium'
                  onClick={() => updatePosition(currPosition, action)}
                >
                  <Text size='large' color='white'>
                    {action}
                  </Text>
                </Box>
               </Box>
            );
          })}
        </Box>
    </Grommet>
  );
}

export default App;
