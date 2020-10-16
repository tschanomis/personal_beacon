<?php

namespace App\Gestion;

use OpenApi\Annotations as OA;

/**
 *@OA\Schema()
 */

class Balises
{
   /**
    * @OA\Property(type="integer")
    * @var int
    */
   public $id;

   /**
    * @OA\Property(type="number")
    * @var int
    */
   public $lat;

   /**
    * @OA\Property(type="number")
    * @var int
    */
   public $lon;

   /**
    * @OA\Property(type="string")
    * @var string
    */
   public $name;

   /**
    * @OA\Property(type="string")
    * @var string
    */
   public $description;

   /**
    * @OA\Property(type="integer")
    * @var int
    */
   public $user_id;

   /**
    * @OA\Property(type="string")
    * @var string
    */
   public $created_at;

   /**
    * @OA\Property(type="string")
    * @var string
    */
   public $updtated_at;
}
