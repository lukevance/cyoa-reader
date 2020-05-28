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

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'medium' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

function App() {
  const [currPosition, setCurrPosition] = useState(0);

  const updatePosition = (currPosition, action) => {
    const validPaths = storyPaths.filter(path => path.source === currPosition);
    const targetPosition = validPaths.find(path => path.action === action);
    setCurrPosition(targetPosition.target);
  }

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>Simple Grommet Reader</AppBar>
        <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
          <Box flex align='center' justify='center' elevation='small'>
            <Text margin='large' size='large'>
             {storyBlocks[currPosition].text}
            </Text>
          </Box>
        </Box>
        {/* <Box direction='row' 
          border={{
            "color": "gray",
            "size": "medium",
            "side": "top"
          }}
        > */}
        <Box direction='row' margin={{bottom: 'medium', horizontal: 'large'}}>
          {storyBlocks[currPosition].actions.map((action, i) => {
            return (
              
                <Box 
                  flex 
                  align='center' 
                  justify='center' 
                  // background='button'
                  // elevation='small'
                  // pad='medium'
                >
                  {/* <Text size='large'>
                    {action}
                  </Text> */}
                  <Button label={action} onClick={() => updatePosition(currPosition, action)} />
                </Box>
              
              );
          })}
          </Box>
        {/* </Box> */}
      </Box>
    </Grommet>
  );
}

export default App;
