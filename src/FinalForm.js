import React from 'react';
import { Box } from 'grommet';

function FinalForm() {
    return (
        <Box 
            direction='row' 
            flex
            align='center'
            justify='center'
        >
            <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSd7W3BVV6QhertofYLotqFcKs5BNy-rFqfHexZa7eQ27RSkKg/viewform?embedded=true" 
                width="480" 
                height="594" 
                frameborder="0" 
                marginheight="0" 
                marginwidth="0"
            >
                Loading…
            </iframe> 
        </Box>
    );
}

export default FinalForm;