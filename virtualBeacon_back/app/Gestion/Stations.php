<?php

namespace App\Gestion;

use OpenApi\Annotations as OA;

/**
 *@OA\Schema()
 */

class Stations
{
   /**
    * @OA\Property(type="integer")
    * @var int
    */
   public $id;

   /**
    * @OA\Property(type="string")
    * @var string
    */
   public $Nom_de_la_station;

   /**
    * @OA\Property(type="string")
    * @var string
    */
   public $geo;

   /**
    * @OA\Property(type="integer")
    * @var int
    */
   public $Nombre_vélo_électrique;

   /**
    * @OA\Property(type="integer")
    * @var int
    */
   public $Nombre_de_vélo_mécanique;
}
