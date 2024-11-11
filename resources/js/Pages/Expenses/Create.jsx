/**
 * Expense Tracker - Create Expense
 * teachasgreywolf
 * May 17, 2024
 */

import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { titleCase } from "@/lib/util";
import LabelEx from "@/Components/LabelEx";
import InputError from "@/Components/InputError";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import { Label } from "@/shadcn/ui/label";
import dayjs from "dayjs"; // Import dayjs for date formatting

const CreateExpense = () => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",           // Changed from title to name
        amount: "",
        description: "",
        date: dayjs().format("YYYY-MM-DD"), // Set current date as default
        created_by: auth.user.id,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("expenses.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog className="bg-slate-400" open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-600 rounded-full hover:bg-green-500 px-10">
                    Add Expense
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-none">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Add New Expense</DialogTitle>
                    </DialogHeader>

                    <Separator className="h-[1px] my-4 bg-slate-500" />

                    <div className="grid gap-4 mb-7 pt-3">
                        <div>
                            <LabelEx htmlFor="name" required>Name</LabelEx>
                            <Input
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                type="text"
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <LabelEx htmlFor="amount" required>Amount</LabelEx>
                            <Input
                                value={data.amount}
                                onChange={(e) => setData("amount", e.target.value)}
                                type="number"
                                step="0.01" // Allow decimal values
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                            <InputError message={errors.amount} className="mt-2" />
                        </div>

                        <div>
                            <LabelEx htmlFor="date" required>Date</LabelEx>
                            <Input
                                value={data.date}
                                onChange={(e) => setData("date", e.target.value)}
                                type="date"
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                            <InputError message={errors.date} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        {processing ? (
                            <Button disabled className="rounded-full w-40">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Adding...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="bg-green-600 hover:bg-green-500 rounded-full w-40"
                            >
                                Save Expense
                            </Button>
                        )}

                        <DialogClose asChild>
                            <Button type="button" variant="secondary" className="rounded-full w-40">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateExpense;
