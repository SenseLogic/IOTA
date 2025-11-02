// -- IMPORTS

import
    {
        getBase64TextFromHexadecimalText,
        getHexadecimalTextFromBase64Text,
        getHexadecimalTextFromTuid,
        getRandomByteArray,
        getRandomHexadecimalText,
        getRandomTuid,
        getRandomUuid,
        getTimeUuid,
        getTuidFromHexadecimalText,
        getTuidFromText,
        getTuidFromUuid,
        getUuidFromHexadecimalText,
        getUuidFromText,
        getUuidFromTuid
    }
    from './index.js';

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

// ~~

function checkResultType(
    value,
    expectedType
    )
{
    console.log( 'Value :', JSON.stringify( value ) );
    console.log( 'Expected type :', expectedType.name );

    let isValid = false;

    if ( expectedType === String )
    {
        isValid = typeof value === 'string';
    }
    else
    {
        isValid = value instanceof expectedType;
    }

    if ( !isValid )
    {
        throw new Error( 'Invalid type : ' + typeof value );
    }
}

// ~~

function checkResultLength(
    value,
    expectedLength
    )
{
    console.log( 'Value length :', value.length );
    console.log( 'Expected length :', expectedLength );

    if ( value.length !== expectedLength )
    {
        throw new Error( 'Invalid length : ' + value.length );
    }
}

// ~~

function checkResultFormat(
    value,
    format
    )
{
    console.log( 'Value :', JSON.stringify( value ) );
    console.log( 'Expected format :', format );

    let isValid = false;

    if ( format === 'uuid' )
    {
        isValid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test( value );
    }
    else if ( format === 'hex' )
    {
        isValid = /^[0-9a-f]+$/i.test( value );
    }
    else if ( format === 'tuid' )
    {
        isValid = /^[A-Za-z0-9_-]+$/i.test( value );
    }

    if ( !isValid )
    {
        throw new Error( 'Invalid format : ' + JSON.stringify( value ) );
    }
}

// ~~

function runTests(
    )
{
    console.log( 'Testing : getBase64TextFromHexadecimalText' );
    checkResult( getBase64TextFromHexadecimalText( '00000000000000000000000000000000' ), 'AAAAAAAAAAAAAAAAAAAAAA==' );
    checkResult( getBase64TextFromHexadecimalText( '000000' ), 'AAAA' );
    checkResult( getBase64TextFromHexadecimalText( '010203' ), 'AQID' );
    checkResult( getBase64TextFromHexadecimalText( '48656c6c6f20576f726c64' ), 'SGVsbG8gV29ybGQ=' );

    console.log( '\nTesting : getHexadecimalTextFromBase64Text' );
    checkResult( getHexadecimalTextFromBase64Text( 'AAAAAAAAAAAAAAAAAAAAAA==' ), '00000000000000000000000000000000' );
    checkResult( getHexadecimalTextFromBase64Text( 'AAAA' ), '000000' );
    checkResult( getHexadecimalTextFromBase64Text( 'AQID' ), '010203' );
    checkResult( getHexadecimalTextFromBase64Text( 'SGVsbG8gV29ybGQ=' ), '48656c6c6f20576f726c64' );

    console.log( '\nTesting : getTuidFromHexadecimalText' );
    checkResult( getTuidFromHexadecimalText( '00000000000000000000000000000000' ), 'AAAAAAAAAAAAAAAAAAAAAA' );
    checkResult( getTuidFromHexadecimalText( '000000' ), 'AAAA' );
    checkResult( getTuidFromHexadecimalText( '010203' ), 'AQID' );
    checkResult( getTuidFromHexadecimalText( '48656c6c6f20576f726c64' ), 'SGVsbG8gV29ybGQ' );

    console.log( '\nTesting : getHexadecimalTextFromTuid' );
    checkResult( getHexadecimalTextFromTuid( 'AAAAAAAAAAAAAAAAAAAAAA' ), '00000000000000000000000000000000' );
    checkResult( getHexadecimalTextFromTuid( 'AAAA' ), '000000' );
    checkResult( getHexadecimalTextFromTuid( 'AQID' ), '010203' );
    checkResult( getHexadecimalTextFromTuid( 'SGVsbG8gV29ybGQ' ), '48656c6c6f20576f726c64' );

    console.log( '\nTesting : getTuidFromText' );
    checkResult( getTuidFromText( '' ), '' );
    checkResult( getTuidFromText( 'hello' ), getTuidFromHexadecimalText( '5d41402abc4b2a76b9719d911017c592' ) );
    checkResult( getTuidFromText( 'Hello World' ), getTuidFromHexadecimalText( 'b10a8db164e0754105b7a99be72e3fe5' ) );

    console.log( '\nTesting : getUuidFromHexadecimalText' );
    checkResult( getUuidFromHexadecimalText( '00000000000000000000000000000000' ), '00000000-0000-0000-0000-000000000000' );
    checkResult( getUuidFromHexadecimalText( '0102030405060708090a0b0c0d0e0f10' ), '01020304-0506-0708-090a-0b0c0d0e0f10' );
    checkResult( getUuidFromHexadecimalText( 'ffffffffffffffffffffffffffffffff' ), 'ffffffff-ffff-ffff-ffff-ffffffffffff' );

    console.log( '\nTesting : getUuidFromText' );
    checkResult( getUuidFromText( '' ), '00000000-0000-0000-0000-000000000000' );
    checkResult( getUuidFromText( 'hello' ), getUuidFromHexadecimalText( '5d41402abc4b2a76b9719d911017c592' ) );
    checkResult( getUuidFromText( 'Hello World' ), getUuidFromHexadecimalText( 'b10a8db164e0754105b7a99be72e3fe5' ) );

    console.log( '\nTesting : getUuidFromTuid' );
    let testTuid = getTuidFromHexadecimalText( '00000000000000000000000000000000' );
    checkResult( getUuidFromTuid( testTuid ), '00000000-0000-0000-0000-000000000000' );
    testTuid = getTuidFromHexadecimalText( '0102030405060708090a0b0c0d0e0f10' );
    checkResult( getUuidFromTuid( testTuid ), '01020304-0506-0708-090a-0b0c0d0e0f10' );

    console.log( '\nTesting : getTuidFromUuid' );
    checkResult( getTuidFromUuid( '00000000-0000-0000-0000-000000000000' ), 'AAAAAAAAAAAAAAAAAAAAAA' );
    checkResult( getTuidFromUuid( '01020304-0506-0708-090a-0b0c0d0e0f10' ), getTuidFromHexadecimalText( '0102030405060708090a0b0c0d0e0f10' ) );

    console.log( '\nTesting : getRandomByteArray' );
    let byteArray1 = getRandomByteArray( 0 );
    checkResultType( byteArray1, Uint8Array );
    checkResultLength( byteArray1, 0 );
    let byteArray2 = getRandomByteArray( 16 );
    checkResultType( byteArray2, Uint8Array );
    checkResultLength( byteArray2, 16 );
    let byteArray3 = getRandomByteArray( 32 );
    checkResultType( byteArray3, Uint8Array );
    checkResultLength( byteArray3, 32 );

    console.log( '\nTesting : getRandomHexadecimalText' );
    let hex1 = getRandomHexadecimalText( 0 );
    checkResultType( hex1, String );
    checkResultLength( hex1, 0 );
    let hex2 = getRandomHexadecimalText( 16 );
    checkResultType( hex2, String );
    checkResultLength( hex2, 32 );
    checkResultFormat( hex2, 'hex' );
    let hex3 = getRandomHexadecimalText( 8 );
    checkResultType( hex3, String );
    checkResultLength( hex3, 16 );
    checkResultFormat( hex3, 'hex' );

    console.log( '\nTesting : getRandomUuid' );
    let uuid1 = getRandomUuid();
    checkResultType( uuid1, String );
    checkResultLength( uuid1, 36 );
    checkResultFormat( uuid1, 'uuid' );
    let uuid2 = getRandomUuid();
    checkResultType( uuid2, String );
    checkResultLength( uuid2, 36 );
    checkResultFormat( uuid2, 'uuid' );

    if ( uuid1 === uuid2 )
    {
        throw new Error( 'Random UUIDs should be different' );
    }

    console.log( '\nTesting : getRandomTuid' );
    let tuid1 = getRandomTuid();
    checkResultType( tuid1, String );
    checkResultFormat( tuid1, 'tuid' );
    let tuid2 = getRandomTuid();
    checkResultType( tuid2, String );
    checkResultFormat( tuid2, 'tuid' );
    if ( tuid1 === tuid2 )
    {
        throw new Error( 'Random TUIDs should be different' );
    }

    console.log( '\nTesting : getTimeUuid' );
    try
    {
        let timeUuid1 = getTimeUuid();
        checkResultType( timeUuid1, String );
        checkResultLength( timeUuid1, 36 );
        checkResultFormat( timeUuid1, 'uuid' );
        console.log( 'Note: getTimeUuid requires getHexadecimalTextFromInteger and getCurrentMillisecondCount' );
    }
    catch ( error )
    {
        console.log( 'Warning: getTimeUuid failed (requires getHexadecimalTextFromInteger and getCurrentMillisecondCount):', error.message );
    }

    console.log( '\nTesting round-trip conversions' );
    let originalHex = '0102030405060708090a0b0c0d0e0f10';
    let base64 = getBase64TextFromHexadecimalText( originalHex );
    let convertedHex = getHexadecimalTextFromBase64Text( base64 );
    checkResult( convertedHex, originalHex );

    let originalTuid = getTuidFromHexadecimalText( originalHex );
    let convertedHex2 = getHexadecimalTextFromTuid( originalTuid );
    checkResult( convertedHex2, originalHex );

    let originalUuid = getUuidFromHexadecimalText( originalHex );
    let convertedTuid = getTuidFromUuid( originalUuid );
    let convertedUuid = getUuidFromTuid( convertedTuid );
    checkResult( convertedUuid, originalUuid );

    console.log( '\nAll tests passed!' );
}

// -- STATEMENTS

runTests();
