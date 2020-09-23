<?php

namespace App\Gestion;

use OpenApi\Annotations as OA;

/**
 *@OA\Schema()
 */

class Suppression
{

	/**
	 * @OA\Property(type="string")
	 * @var string
	 */
	public $Message;

	/**
	 * @OA\Property(type="string")
	 * @var string
	 */
	public $name;
}
