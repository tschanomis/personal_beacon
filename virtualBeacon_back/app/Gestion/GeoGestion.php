<?php

namespace App\Gestion;

class GeoGestion
{
	/*public function validateLatLong($test)
	{
		return preg_match('/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/', $test);
		//return preg_match('/^[-]?(([0-8]?[0-9])\.(\d+))|(90(\.0+)?),[-]?((((1[0-7][0-9])|([0-9]?[0-9]))\.(\d+))|180(\.0+)?)$/', $lat . ',' . $long);
	}*/

	public function validateLatLong($lat, $lon)
	{
		$geolocation = strval($lat) . ',' . strval($lon);
		return preg_match('/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/', $geolocation);
		//return preg_match('/^[-]?(([0-8]?[0-9])\.(\d+))|(90(\.0+)?),[-]?((((1[0-7][0-9])|([0-9]?[0-9]))\.(\d+))|180(\.0+)?)$/', $lat . ',' . $long);
	}
}
