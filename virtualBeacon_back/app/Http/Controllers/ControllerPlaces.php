<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use OpenApi\Annotations as OA;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use App\Gestion\GeoGestion;

use Illuminate\Support\Facades\Auth;

class ControllerPlaces extends Controller
{

	/**
	 *  @OA\Delete(
	 * 		path="/places/delete/{id}",
	 * 		@OA\Parameter(
	 *         name="id",
	 * 		   	 in="path",
	 *         description="Nom de la balise à supprimer",
	 *         required=true,
	 * 		   @OA\Schema(
	 * 			  type="string",
	 *         ),
	 * 		),
	 * 		@OA\Response(
	 * 			response="204",
	 * 			description="Supression de la balise",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Suppression"), 
	 * 				description="Tableau de la balise correspondante"),
	 * 		),
	 * 		@OA\Response(
	 * 			response="410",
	 * 			description="Erreur supression",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Erreurs"), 
	 * 				description="Tableau d'erreur"
	 * 			)
	 * 		),
	 * 		@OA\Response(
	 * 			response="500",
	 * 			description="Erreur serveur",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Erreurs"), 
	 * 				description="Tableau d'erreur"),
	 * 		)
	 * 	)
	 */


	public function deletePosition($id)
	{
		$user = Auth::user();
		$user_id = $user->id;
		try {
			$suppr = DB::table('places')->where('id', $id)->where('user_id', $user_id)->delete();
			if ($suppr) {
				return Response::json(['suppression' => 'station suprrimée'], 204);
			} else {
				return Response::json(['error' => "Erreur lors de la suppression."], 410);
			}
		} catch (\Throwable $error) {
			Log::error($error);
			return Response::json(['Erreur server' => "Erreur lors de la suppression de la balise."], 500);
		}
	}

	/**
	 *  @OA\Post(
	 * 		path="/places/create/position",
	 * 		@OA\Response(
	 * 			response="200",
	 * 			description="Création nouvelle balise",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Balises"), 
	 * 				description="Tableau de la station correspondante"),
	 * 		),
	 * 		@OA\Response(
	 * 			response="400",
	 * 			description="Erreur validité des données client",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Erreurs"), 
	 * 				description="Tableau d'erreur"
	 * 			)
	 * 		),
	 * 		@OA\Response(
	 * 			response="409",
	 * 			description="Nom de balise déja utilisé",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Erreurs"), 
	 * 				description="Tableau d'erreur"
	 * 			)
	 * 		),
	 * 		@OA\Response(
	 * 			response="500",
	 * 			description="Erreur serveur",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Erreurs"), 
	 * 				description="Tableau d'erreur"),
	 * 		)
	 * 	)
	 */

	public function createPosition(Request $position)
	{
		$user = Auth::user();

		$lat = $position->lat;
		$lon = $position->lon;
		$name = $position->name;
		$description = $position->description;
		$user_id = $user->id;

		$Geotest = new GeoGestion();
		$validGeo = $Geotest->validateLatLong($lat, $lon);
		try {
			if ($validGeo) {
				$countSpots = DB::table('places')->where('user_id', $user_id)->count();
				if ($countSpots > 14) {
					return Response::json(['error' => "Plus de balises disponibles."], 403);
				} else {
					$nameExist = DB::table('places')->where('name', $name)->get()->first();
					if ($nameExist) {
						return Response::json(['error' => "le nom existe déjà."], 409);
					}

					$newSpot = [
						'lat' => $lat,
						'lon' => $lon,
						'name' => $name,
						'description' => $description,
						'user_id' => $user_id
					];
				}
				$insertReturnId = DB::table('places')->insertGetId($newSpot);
				return Response::json(['ok' => "Ajout station.", 'id' => $insertReturnId], 200);
			} else {
				return Response::json(['error' => "erreur coordonnées géo."], 400);
			}
		} catch (\Throwable $error) {
			Log::error($error);
			return Response::json(['Erreur server' => "Erreur lors de la création de la balise."], 500);
		}
	}

	public function modifyPosition(Request $position)
	{
		$user = Auth::user();
		$user_id = $user->id;

		$name = $position->name;
		$description = $position->description;
		$id = $position->id;

		try {
			$result = DB::table('places')->where('id', $id)->where('user_id', $user_id)->update(['name' => $name, 'description' => $description]);
			return Response::Json($result, 200);
		} catch (\Throwable $error) {
			Log::error($error);
			return Response::json(['Erreur server' => "Erreur lors de la modification de la balise."], 500);
		}
	}

	/**
	 *  @OA\Post(
	 * 		path="/places/position",
	 * 		@OA\Response(
	 * 			response="200",
	 * 			description="La balise la plus proche",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Balises"),
	 * 				description="Tableau de la station correspondante"),
	 * 		),
	 * 		@OA\Response(
	 * 			response="400",
	 * 			description="Erreur validité des données client",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Erreurs"), 
	 * 				description="Tableau d'erreur"
	 * 			)
	 * 		),
	 * 		@OA\Response(
	 * 			response="500",
	 * 			description="Erreur serveur",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Erreurs"), 
	 * 				description="Tableau d'erreur"),
	 * 		)
	 * 	)
	 */

	public function byPosition(Request $position)
	{
		$lat = $position->lat;
		$lon = $position->lon;

		$Geotest = new GeoGestion();
		$validGeo = $Geotest->validateLatLong($lat, $lon);

		if ($validGeo) {
			try {
				$result = DB::select('SELECT *, get_distance_metres(?, ?, lat, lon) AS distance FROM places ORDER BY distance', [$lat, $lon])[0];
			} catch (\Throwable $error) {
				Log::error($error);
				return Response::json(['Erreur server' => "Erreur récupération balise."], 500);
			}
			if ($result) {
				$beacon_id = $result->id;
				$current_date = date("Y-m-d h:i:s");
				$newLog = [
					'created_at' => $current_date,
					'places_id' => $beacon_id,
				];
				try {
					DB::table('logs')->insert($newLog);
				} catch (\Throwable $error) {
					Log::error($error);
				}
				return Response::json(($result), 200);
			}
		} else {
			return Response::json(['error' => "erreur coordonnées géo."], 400);
		}
	}

	/**
	 *  @OA\Post(
	 * 		path="/places/{id}",
	 * 		@OA\Parameter(
	 *         name="id",
	 * 		   in="path",
	 *         description="Id de la balise recherchée",
	 *         required=true,
	 * 		   @OA\Schema(
	 * 			  type="integer",
	 *         ),
	 * 		),
	 * 		@OA\Response(
	 * 			response="200",
	 * 			description="Une balise appelée par son id",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Balises"), 
	 * 				description="Tableau de la balise correspondante"),
	 * 		),
	 * 		@OA\Response(
	 * 			response="404",
	 * 			description="Erreur",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Erreurs"), 
	 * 				description="Tableau d'erreur"
	 * 			)
	 * 		),
	 * 		@OA\Response(
	 * 			response="500",
	 * 			description="Erreur serveur",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Erreurs"), 
	 * 				description="Tableau d'erreur"),
	 * 		)
	 * 	)
	 */

	public function byId($id)
	{
		$user = Auth::user();
		$user_id = $user->id;

		try {
			$spotById = DB::table('places')->where('id', $id)->where('user_id', $user_id)->get();
			if (count($spotById) === 1) {
				return Response::json(($spotById), 200);
			} else {
				return Response::json(['Erreur balise' => "La balise n'existe pas."], 404);
			}
		} catch (\Throwable $error) {
			Log::error($error);
			return Response::json(['Erreur server' => "Erreur lors de la récupération des balises."], 500);
		}
	}

	/**
	 *  @OA\Get(
	 * 		path="/places",
	 * 		@OA\Response(
	 * 			response="200",
	 * 			description="Toutes les balises enregistrées",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Balises"), 
	 * 				description="Tableau de toutes les balises enregistrées"),
	 * 		),
	 * 		@OA\Response(
	 * 			response="500",
	 * 			description="Erreur serveur",
	 * 			@OA\JsonContent(
	 * 				type="array", 
	 * 				@OA\Items(ref="#/components/schemas/Erreurs"), 
	 * 				description="Tableau d'erreur"),
	 * 		)
	 * 	)
	 */

	public function allPlaces()
	{
		$user = Auth::user();
		$user_id = $user->id;
		try {
			$allSpots = DB::table('places')->where('user_id', $user_id)->get();
			return Response::json($allSpots, 200);
		} catch (\Throwable $error) {
			Log::error($error);
			return Response::json(['Erreur server' => "Erreur lors de la récupération des balises."], 500);
		}
	}
}
