<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // You can implement your authorization logic here
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date' => 'required|date', // Ensure the date is required and is a valid date
            'category' => 'required|max:255', // Required category with a maximum length
            'amount' => 'required|numeric|min:0', // Required numeric amount, must be non-negative
            'description' => 'nullable|string|max:1000', // Optional description, max length of 1000 characters
            'created_by' => 'required', // Required field for who created the expense
        ];
    }
}
