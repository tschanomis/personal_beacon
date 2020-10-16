<?php

namespace App\Gestion;

class GeoGestion
{
	public function validateLatLong($lat, $lon)
	{
		$geolocation = strval($lat) . ',' . strval($lon);
		return preg_match('/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/', $geolocation);
	}
}
