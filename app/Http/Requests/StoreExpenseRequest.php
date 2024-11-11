<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Here you can implement your authorization logic if needed.
        // For now, we'll allow all users to make this request.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',   // Name of the expense
            'amount' => 'required|numeric|min:0',  // Amount of the expense, must be a non-negative number
            'description' => 'nullable|string|max:500', // Optional description
            'date' => 'required|date',               // Date of the expense
            // Add any other fields specific to your expense model as necessary
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The expense name is required.',
            'amount.required' => 'The expense amount is required.',
            'amount.numeric' => 'The expense amount must be a number.',
            'amount.min' => 'The expense amount must be at least 0.',
            'date.required' => 'The expense date is required.',
            'date.date' => 'The expense date must be a valid date.',
        ];
    }
}
