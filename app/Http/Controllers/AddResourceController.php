<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProvinceRequest;
use App\Http\Requests\StoreRegionRequest;
use App\Http\Requests\StoreExpenseRequest; // Import the expense request
use App\Models\Province;
use App\Models\Region;
use App\Models\Expense; // Import the Expense model

class AddResourceController extends Controller
{
    public function addRegion(StoreRegionRequest $request)
    {
        Region::create($request->validated());

        session()->flash('message', 'Successfully created a new region');
    }

    public function addProvince(StoreProvinceRequest $request)
    {
        Province::create($request->validated());

        session()->flash('message', 'Successfully created a new province');
    }

    public function addExpense(StoreExpenseRequest $request) // New method for adding expenses
    {
        Expense::create($request->validated());

        session()->flash('message', 'Successfully created a new expense');
    }
}
