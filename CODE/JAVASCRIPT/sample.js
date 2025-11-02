// -- IMPORTS

import
    {
    } from './index.js';

// -- FUNCTIONS

function checkResult(
    value,
    expectedValue
    )
{
    console.log( 'Value :', JSON.stringify( value ) );
    console.log( 'Expected value :', JSON.stringify( expectedValue ) );

    if ( value !== expectedValue )
    {
        throw new Error( 'Invalid value : ' + JSON.stringify( value ) );
    }
}

// -- STATEMENTS
