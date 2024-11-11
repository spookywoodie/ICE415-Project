<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;
use App\Http\Requests\UpdateExpenseRequest; // Import the UpdateExpenseRequest
use App\Http\Resources\ExpenseResource; // Import the ExpenseResource
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Redirect;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $model = Expense::query()
        ->where('description', 'like', '%' . request()->query('search') . '%')
        ->orWhere('amount', 'like', '%' . request()->query('search') . '%')
        ->orWhereHas('user', function (Builder $query) { // Assuming expenses are linked to users (recorded by)
            $query->where('name', 'like', '%' . request()->query('search') . '%');
        })
        ->orderBy(
            request('sort_field', 'created_at'), // Assuming you want to sort by created_at by default
            request('sort_direction', 'desc') // Default sort direction is descending
        )
        ->paginate(5) // Paginate results, 5 per page
        ->appends(request()->query()); // Preserve query parameters for pagination links

    return Inertia::render('Expenses/Index', [
        'model' => ExpenseResource::collection($model), // Return the collection of expenses
        'queryParams' => request()->query(), // Return the query parameters for the search and sort
    ]);

    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Expenses/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ]);

        $expense = Expense::create($request->all());

        return Redirect::route('expenses.index')->with('success', 'Expense created successfully.');
    }

   /**
 * Display the specified resource.
 */
public function show(string $id)
{
    $expense = Expense::findOrFail($id); // Retrieve the expense by ID

    // Use ExpenseResource for formatting the response
    return Inertia::render('Expenses/Show', [
        'model' => new ExpenseResource($expense), // Ensure it's called 'model' to match your Show component's prop
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $expense = Expense::findOrFail($id);
        return Inertia::render('Expenses/Edit', [
            'expense' => new ExpenseResource($expense) // Use ExpenseResource for single expense
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenseRequest $request, string $id) // Use UpdateExpenseRequest
    {
        $expense = Expense::findOrFail($id);
        $expense->update($request->validated()); // Use validated data

        return Redirect::route('expenses.index')->with('success', 'Expense updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $expense = Expense::findOrFail($id);
        $expense->delete();

        return Redirect::route('expenses.index')->with('success', 'Expense deleted successfully.');
    }
}
