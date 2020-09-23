<?php

namespace App\Gestion;

use OpenApi\Annotations as OA;

/**
 *@OA\Schema()
 */

class Erreurs
{
    /**
     * @OA\Property(type="string")
     * @var string
     */
    public $name;

    /**
     * @OA\Property(type="string")
     * @var string
     */
    public $message;
}
