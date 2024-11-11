/**
 * Expense Tracker - Show Component
 * Displays details of a specific expense entry
 */

import dayjs from "dayjs";
import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";

const Show = ({ model, onDialogConfig }) => {
    return (
        <>
            <div className="flex space-x-10 mb-7 pt-3 w-full">
                <div className="space-y-6 w-2/3">
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Amount</Label>
                        <div className="text-lg font-semibold">
                            ${model.amount.toFixed(2)}
                        </div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Description</Label>
                        <div className="text-lg font-semibold">
                            {model.description || "N/A"}
                        </div>
                    </div>
                </div>

                <div className="space-y-8 w-1/3">
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Date</Label>
                        <div className="text-lg font-semibold">
                            {dayjs(model.date).format("MMMM D, YYYY")}
                        </div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Recorded By</Label>
                        <div className="text-lg font-semibold">
                            {model.createdBy.name}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    className="bg-blue-600 hover:bg-blue-500 rounded-full w-40"
                    onClick={(e) =>
                        onDialogConfig({
                            open: true,
                            process: "update",
                            data: model,
                        })
                    }
                >
                    Update
                </Button>

                <Button
                    variant="secondary"
                    onClick={(e) =>
                        onDialogConfig({
                            open: false,
                            process: "",
                            data: null,
                        })
                    }
                    className="rounded-full w-40"
                >
                    Close
                </Button>
            </div>
        </>
    );
};

export default Show;
