import PaginationEx from "@/Components/PaginationEx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SearchInput from "@/Components/SearchInput";
import Create from "./Create"; 
import Update from "./Update"; 
import Show from "./Show"; 
import dayjs from "dayjs";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { titleCase } from "@/lib/util";
import { cn } from "@/shadcn/lib/utils";
import { Eye, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shadcn/ui/dialog";
import { Separator } from "@/shadcn/ui/separator";
import { useToast } from "@/shadcn/hooks/use-toast";

export default function Index({ auth, model, queryParams = null }) {
    queryParams = queryParams || {};
    const resourceName = "expense"; 
    const { toast } = useToast();
    const { flash } = usePage().props;
    const [search, setSearch] = useState(queryParams.search || "");
    const [loading, setLoading] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        open: false,
        process: "",
        data: null,
    });

    const onLoading = () => {
        setLoading(true);
    };

    const onSearchSubmit = (e) => {
        e.preventDefault();
        onLoading(); // Set loading state when searching
        router.get(route("expenses.index"), {
            search: search,
            sort_field: "date",
            sort_direction: "desc",
        }).then(() => setLoading(false)); // Reset loading state when data is loaded
    };

    const sortChanged = (name) => {
        onLoading(); // Set loading state when sorting
        if (name === queryParams.sort_field) {
            queryParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("expenses.index"), { ...queryParams }).then(() => setLoading(false)); // Reset loading state when data is loaded
    };

    useEffect(() => {
        if (flash?.message) {
            toast({
                className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
                description: flash.message,
            });
            flash.message = "";
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {titleCase(resourceName)}
                </h2>
            }
        >
            <Head title={titleCase(resourceName)} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="md:flex justify-between mb-6">
                                <SearchInput
                                    search={search}
                                    onSearchSubmit={onSearchSubmit}
                                    route={route("expenses.index")}
                                />
                                <Create resourceName={resourceName} />
                            </div>

                            <div className="rounded shadow">
                                <div className="relative p-3 dark:bg-gray-600 bg-gray-200 rounded-tl-lg rounded-tr-lg flex items-center">
                                    <PaginationEx
                                        links={model.links}
                                        meta={model.meta}
                                        onLoading={onLoading}
                                    />
                                </div>

                                <table className="border-collapse table-auto w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th onClick={() => sortChanged("name")} className="cursor-pointer">
                                                <div className="flex items-center gap-1">Name</div>
                                            </th>
                                            <th onClick={() => sortChanged("date")} className="cursor-pointer">
                                                <div className="flex items-center gap-1">Date</div>
                                            </th>
                                            <th onClick={() => sortChanged("amount")} className="cursor-pointer">
                                                <div className="flex items-center gap-1">Amount</div>
                                            </th>
                                            <th className="flex items-center gap-1">Description</th>
                                            <th className="flex items-center gap-1">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-slate-800">
                                        {Array.isArray(model.data) ? (
                                            model.data.length > 0 ? (
                                                model.data.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.name}</td>
                                                        <td>{dayjs(item.date).format("MMMM D, YYYY")}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.description}</td>
                                                        <td>
                                                            <div className="flex space-x-2">
                                                                <Eye onClick={() => setDialogConfig({ open: true, process: "view", data: item })} />
                                                                <Pencil onClick={() => setDialogConfig({ open: true, process: "update", data: item })} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">No expenses found.</td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">Invalid data format.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <div className="p-3 dark:bg-gray-600 bg-gray-200 flex items-center">
                                    <PaginationEx links={model.links} meta={model.meta} onLoading={onLoading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog open={dialogConfig.open} onOpenChange={setDialogConfig}>
                    <DialogContent className="sm:max-w-[600px] dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-none">
                        <DialogHeader>
                            <DialogTitle>{titleCase(dialogConfig.process + " " + resourceName)}</DialogTitle>
                        </DialogHeader>

                        <Separator className="h-[1px] mb-4 bg-slate-500" />

                        {dialogConfig.process === "view" && <Show model={dialogConfig.data} />}
                        {dialogConfig.process === "update" && <Update model={dialogConfig.data} params={queryParams} />}
                    </DialogContent>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
}
