import React, { useState } from 'react';
import { Box, Button, Grommet, Text } from 'grommet';

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

  const updatePosition = (currPosition, action) => {
    const validPaths = storyPaths.filter(path => path.source === currPosition);
    const targetPosition = validPaths.find(path => path.action === action);
    setCurrPosition(targetPosition.target);
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
             {storyBlocks[currPosition].text}
            </Text>
          </Box>
        </Box>
        {storyBlocks[currPosition].actions.map(action => {
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
