<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class ControllerLogs extends Controller
{
	public function getLogs()
	{
		try {
			$allLogs = DB::table('logs')->get();
			return Response::json($allLogs, 200);
		} catch (\Throwable $error) {
			Log::error($error);
			return Response::json(['Erreur server' => "Erreur lors de la récupération des logs."], 500);
		}
	}
}
