<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class PositionsController extends Controller
{

	public function deletePosition($name)
	{
		DB::table('mytable')->where('Nom_de_la_station', $name)->delete();
		return ($name . ' supprimé');
	}

	public function byPosition(Request $position)
	{
		$latitude = $position->latitude;
		$longitude = $position->longitude;
		$rayon = $position->rayon;

		$result = DB::select(
			DB::Raw(
				'SELECT Nom_de_la_station, geo, (get_distance_metres(:latitude, :longitude, SUBSTRING_INDEX(geo, ",", 1), SUBSTRING_INDEX(SUBSTRING_INDEX(geo, ",", 2), ",", -1))) 
				AS distance
				FROM mytable
				HAVING distance <= :rayon
				ORDER BY distance',
				array('latitude' => $latitude, 'longitude' => $longitude, 'rayon' => $rayon)
			)
		);
		return response()->json(($result));
	}

	public function byName($name)
	{
		$spotByName = DB::table('mytable')->where('Nom_de_la_station', $name)->get()->first();
		if ($spotByName) {
			return Response::json(($spotByName));
		} else {
			return Response::json(['error' => "La station n'existe pas."], 404);
		}
	}

	public function allPositions()
	{
		try {
			$allSpots = DB::table('mytable')->get();
			return response()->json(($allSpots));
		} catch (\Throwable $th) {
			Log::error($th);
			return Response::json(['error' => "Erreur de récupération position."], 500);
		}
	}
}
