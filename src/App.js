import React, { useState } from 'react';
import { Box, Grommet, Markdown, Paragraph, ResponsiveContext, Text } from 'grommet';

import FinalForm from './FinalForm';

const storyBlocks = require('./story-blocks.json');
const storyPaths = require('./story-paths.json');

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
      button: '#74B4EE'
    },
    font: {
      // family: 'Roboto',
      family: 'EB Garamond',
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
      <ResponsiveContext.Consumer>
        {size => {
          const horizontalSpacing = (size === 'small') ? 'medium' : 'large';
          const topSpacing = (size === 'small') ? 'medium' : 'large';
          return (
            <Box fill>
              <Box direction='row' flex overflow={{ horizontal: 'hidden' }} margin={{bottom: 'large'}}fill>
                <Box
                  flex
                  align='center'
                  justify='center'
                  elevation='small'
                >
                  <Paragraph margin={{top: topSpacing, bottom: 'medium', horizontal: horizontalSpacing}} size='large'>
                    <Markdown>
                      {currBlock.text}
                    </Markdown>
                  </Paragraph>
                </Box>
              </Box>
              {currBlock.actions[0] === "END" ? (<FinalForm />) : currBlock.actions.map(action => {
                return (
                  <Box direction='row' margin={{ bottom: 'medium', horizontal: horizontalSpacing }}>
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
          )
        }
        }
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
