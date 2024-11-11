<?php

namespace App\Policies;

use App\Models\Expense;
use App\Models\User;

class ExpensePolicy
{
    /**
     * Determine whether the user can view any expenses.
     */
    public function viewAny(User $user): bool
    {
        return true; // Adjust based on your authorization logic
    }

    /**
     * Determine whether the user can view the expense.
     */
    public function view(User $user, Expense $expense): bool
    {
        return true; // Adjust based on your authorization logic
    }

    /**
     * Determine whether the user can create expenses.
     */
    public function create(User $user): bool
    {
        return true; // Adjust based on your authorization logic
    }

    /**
     * Determine whether the user can update the expense.
     */
    public function update(User $user, Expense $expense): bool
    {
        
        return true;
        //return $user->id === $expense->created_by; // Only allow the creator to update
    }

    /**
     * Determine whether the user can delete the expense.
     */
    public function delete(User $user, Expense $expense): bool
    {
        return true;
        //return $user->id === $expense->created_by; // Only allow the creator to delete
    }

    /**
     * Determine whether the user can restore the expense.
     */
    public function restore(User $user, Expense $expense): bool
    {
        return true; // Adjust based on your authorization logic
    }

    /**
     * Determine whether the user can permanently delete the expense.
     */
    public function forceDelete(User $user, Expense $expense): bool
    {
        return true; // Adjust based on your authorization logic
    }
}
