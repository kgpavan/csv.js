/**
 * Transforms JSON to CSV
 * 
 * @method csv
 * @param  {String}  arg       Array, Object or JSON String to transform
 * @param  {String}  delimiter [Optional] Character to separate fields
 * @param  {Boolean} header    [Optional] False to not include field names as first row
 * @return {String}            CSV string
 */
var csv = function ( arg, delimiter, header ) {
	delimiter  = delimiter || ",";
	header     = ( header !== false );
	var obj    = decode( arg ) || arg,
	    result = "";

	if ( obj instanceof Array ) {
		if ( header ) {
			result = ( keys( obj[0] ).join( delimiter ) + "\n" );
		}

		result += obj.map( function ( i ) {
			return csv( i, delimiter, false );
		}).join( "\n" );
	}
	else {
		if ( header ) {
			result = ( keys( obj ).join( delimiter ) + "\n" );
		}

		result += ( cast( obj ).map( prepare ).join( delimiter ) + "\n" );
	}

	return result.replace(/\n$/, "");
};
