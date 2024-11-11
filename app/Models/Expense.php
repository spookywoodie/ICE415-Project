<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'amount',
        'description',
        'date',
        'created_by',
    ];

    /**
     * Get the user who created the expense.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
