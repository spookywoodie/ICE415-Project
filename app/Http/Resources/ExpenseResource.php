<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'amount' => $this->amount,
            'description' => $this->description,
            'date' => $this->date,
            'createdBy' => $this->created_by, // Ensure this is properly structured if it's a relation
        ];
    }
}
