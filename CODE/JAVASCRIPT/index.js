// -- IMPORTS

import md5 from 'md5';

// -- VARIABLES

const isBrowser = typeof window !== 'undefined';

// -- FUNCTIONS

export function getBase64TextFromHexadecimalText(
    hexadecimalText
    )
{
    if ( isBrowser )
    {
        let text = '';

        for ( let byteIndex = 0;
              byteIndex < hexadecimalText.length;
              byteIndex += 2 )
        {
            text += String.fromCharCode( parseInt( hexadecimalText.slice( byteIndex, byteIndex + 2 ), 16 ) );
        }

        return btoa( text );
    }
    else
    {
        return Buffer.from( hexadecimalText, 'hex' ).toString( 'base64' );
    }
}

// ~~

export function getTuidFromHexadecimalText(
    hexadecimalText
    )
{
    return getBase64TextFromHexadecimalText( hexadecimalText ).replaceAll( '+', '-' ).replaceAll( '/', '_' ).replaceAll( '=', '' );
}

// ~~

export function getTuidFromText( text )
{
    if ( text === '' )
    {
        return '';
    }
    else
    {
        return getTuidFromHexadecimalText( md5( text ) );
    }
}

// ~~

export function getHexadecimalTextFromBase64Text(
    base64Text
    )
{
    if ( isBrowser )
    {
        let text = atob( base64Text );
        let hexadecimalText = '';

        for ( let characterIndex = 0;
              characterIndex < text.length;
              ++characterIndex )
        {
            hexadecimalText += ( '0' + text.charCodeAt( characterIndex ).toString( 16 ) ).slice( -2 );
        }

        return hexadecimalText;
    }
    else
    {
        return Buffer.from( base64Text , 'base64' ).toString( 'hex' );
    }
}

// ~~

export function getHexadecimalTextFromTuid(
    tuid
    )
{
    return getHexadecimalTextFromBase64Text( tuid.replaceAll( '-', '+' ).replaceAll( '_', '/' ) + '==' );
}

// ~~

export function getUuidFromHexadecimalText(
    hexadecimalText
    )
{
    return (
        hexadecimalText.slice( 0, 8 )
        + '-'
        + hexadecimalText.slice( 8, 12 )
        + '-'
        + hexadecimalText.slice( 12, 16 )
        + '-'
        + hexadecimalText.slice( 16, 20 )
        + '-'
        + hexadecimalText.slice( 20, 32 )
        );
}

// ~~

export function getUuidFromText(
    text
    )
{
    if ( text === '' )
    {
        return '00000000-0000-0000-0000-000000000000';
    }
    else
    {
        return getUuidFromHexadecimalText( md5( text ) );
    }
}

// ~~

export function getRandomByteArray(
    byteCount
    )
{
    let byteArray = new Uint8Array( byteCount );

    for ( let byteIndex = 0;
          byteIndex < byteCount;
          ++byteIndex )
    {
        byteArray[ byteIndex ] = Math.floor( Math.random() * 256 );
    }

    return byteArray;
}

// ~~

export function getRandomHexadecimalText(
    byteCount
    )
{
    let byteArray = getRandomByteArray( byteCount );
    let hexadecimalText = '';

    for ( let byteIndex = 0;
          byteIndex < byteArray.length;
          ++byteIndex )
    {
        hexadecimalText += ( '0' + byteArray[ byteIndex ].toString( 16 ) ).slice( -2 );
    }

    return hexadecimalText;
}

// ~~

export function getTimeUuid(
    )
{
    return getUuidFromHexadecimalText(
        getHexadecimalTextFromInteger( ( getCurrentMillisecondCount() + 12219292800000 ) * 10000 )
        + getRandomHexadecimalText( 16 )
        );
}

// ~~

export function getRandomUuid(
    )
{
    return getUuidFromHexadecimalText(
        getRandomHexadecimalText( 16 )
        );
}

// ~~

export function getUuidFromTuid(
    tuid
    )
{
    return getUuidFromHexadecimalText( getHexadecimalTextFromTuid( tuid ) );
}

// ~~

export function getRandomTuid(
    )
{
    return getTuidFromUuid( getRandomUuid() );
}

// ~~

export function getTuidFromUuid(
    uuid
    )
{
    return getTuidFromHexadecimalText( uuid.replaceAll( '-', '' ) );
}
