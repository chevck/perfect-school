import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type BillItem = {
  id: string;
  description: string;
  amount: number;
};

type BillFormData = {
  studentName: string;
  parentName: string;
  class: string;
  term: string;
  billNumber: string;
  date: string;
  items: BillItem[];
  previewType: "standard" | "modern" | "minimal";
};

const CreateBillForm = () => {
  const [formData, setFormData] = useState<BillFormData>({
    studentName: "",
    parentName: "",
    class: "",
    term: "",
    billNumber: `BILL-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split("T")[0],
    items: [],
    previewType: "standard",
  });

  const [newItem, setNewItem] = useState<{
    description: string;
    amount: string;
  }>({
    description: "",
    amount: "",
  });

  const [editingItem, setEditingItem] = useState<{
    id: string | null;
    description: string;
    amount: string;
  } | null>(null);

  const [formStep, setFormStep] = useState<"edit" | "preview">("edit");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const handleEditItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingItem) return;

    const { name, value } = e.target;
    setEditingItem({
      ...editingItem,
      [name]: value,
    });
  };

  const addItem = () => {
    if (!newItem.description || !newItem.amount) return;

    const amount = parseFloat(newItem.amount);
    if (isNaN(amount)) return;

    const newBillItem: BillItem = {
      id: Date.now().toString(),
      description: newItem.description,
      amount: amount,
    };

    setFormData({
      ...formData,
      items: [...formData.items, newBillItem],
    });

    setNewItem({
      description: "",
      amount: "",
    });
  };

  const startEditItem = (item: BillItem) => {
    setEditingItem({
      id: item.id,
      description: item.description,
      amount: item.amount.toString(),
    });
  };

  const saveEditItem = () => {
    if (!editingItem || !editingItem.id) return;

    const amount = parseFloat(editingItem.amount);
    if (isNaN(amount)) return;

    const updatedItems = formData.items.map((item) =>
      item.id === editingItem.id
        ? {
            ...item,
            description: editingItem.description,
            amount: amount,
          }
        : item,
    );

    setFormData({
      ...formData,
      items: updatedItems,
    });

    setEditingItem(null);
  };

  const cancelEditItem = () => {
    setEditingItem(null);
  };

  const removeItem = (id: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id),
    });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const handlePreview = () => {
    setFormStep("preview");
  };

  const handleBackToEdit = () => {
    setFormStep("edit");
  };

  const handleSaveAsDraft = () => {
    // In a real app, this would save to database
    alert("Bill saved as draft");
  };

  const handleProcess = () => {
    // In a real app, this would process and save the bill
    alert("Bill processed successfully");
    handleClear();
  };

  const handleClear = () => {
    setFormData({
      studentName: "",
      parentName: "",
      class: "",
      term: "",
      billNumber: `BILL-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      items: [],
      previewType: "standard",
    });
    setFormStep("edit");
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">
          {formStep === "edit" ? "Create New Bill" : "Bill Preview"}
        </h2>
        <div className="flex gap-2">
          {formStep === "edit" ? (
            <Button
              onClick={handlePreview}
              disabled={
                !formData.studentName ||
                !formData.parentName ||
                formData.items.length === 0
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              Preview Bill
            </Button>
          ) : (
            <Button onClick={handleBackToEdit} variant="outline">
              Back to Edit
            </Button>
          )}
        </div>
      </div>

      {formStep === "edit" ? (
        <div className="space-y-6">
          {/* Student and Parent Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="studentName"
                className="text-sm font-medium text-gray-700"
              >
                Child's Name *
              </label>
              <Input
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Enter child's name"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="parentName"
                className="text-sm font-medium text-gray-700"
              >
                Parent's Name *
              </label>
              <Input
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                placeholder="Enter parent's name"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="class"
                className="text-sm font-medium text-gray-700"
              >
                Class
              </label>
              <Input
                id="class"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                placeholder="Enter class"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="term"
                className="text-sm font-medium text-gray-700"
              >
                Term
              </label>
              <Input
                id="term"
                name="term"
                value={formData.term}
                onChange={handleInputChange}
                placeholder="Enter term"
              />
            </div>
          </div>

          {/* Bill Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Bill Items</h3>

            {/* Add New Item Form */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow">
                <Input
                  name="description"
                  value={newItem.description}
                  onChange={handleNewItemChange}
                  placeholder="Item description"
                  disabled={!!editingItem}
                />
              </div>
              <div className="w-full sm:w-32">
                <Input
                  name="amount"
                  value={newItem.amount}
                  onChange={handleNewItemChange}
                  placeholder="Amount"
                  type="number"
                  min="0"
                  step="0.01"
                  disabled={!!editingItem}
                />
              </div>
              <Button
                onClick={addItem}
                disabled={
                  !newItem.description || !newItem.amount || !!editingItem
                }
                className="whitespace-nowrap"
              >
                Add Item
              </Button>
            </div>

            {/* Edit Item Form */}
            {editingItem && (
              <div className="flex flex-col sm:flex-row gap-3 bg-blue-50 p-3 rounded-md">
                <div className="flex-grow">
                  <Input
                    name="description"
                    value={editingItem.description}
                    onChange={handleEditItemChange}
                    placeholder="Item description"
                  />
                </div>
                <div className="w-full sm:w-32">
                  <Input
                    name="amount"
                    value={editingItem.amount}
                    onChange={handleEditItemChange}
                    placeholder="Amount"
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={saveEditItem}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={cancelEditItem}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Items Table */}
            {formData.items.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">
                          ${item.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditItem(item)}
                              disabled={!!editingItem}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                ></path>
                              </svg>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500"
                              onClick={() => removeItem(item.id)}
                              disabled={!!editingItem}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">
                        ${calculateTotal().toFixed(2)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 border rounded-md bg-gray-50">
                <p className="text-gray-500">No items added yet</p>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClear}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Clear
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveAsDraft}
              disabled={
                !formData.studentName ||
                !formData.parentName ||
                formData.items.length === 0
              }
            >
              Save as Draft
            </Button>
            <Button
              onClick={handlePreview}
              disabled={
                !formData.studentName ||
                !formData.parentName ||
                formData.items.length === 0
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              Preview
            </Button>
          </div>
        </div>
      ) : (
        /* Bill Preview */
        <div className="space-y-6">
          {/* Preview Type Selection */}
          <div className="flex justify-center gap-4 mb-4">
            <Button
              onClick={() =>
                setFormData({ ...formData, previewType: "standard" })
              }
              variant={
                formData.previewType === "standard" ? "default" : "outline"
              }
              className={
                formData.previewType === "standard"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : ""
              }
            >
              Standard
            </Button>
            <Button
              onClick={() =>
                setFormData({ ...formData, previewType: "modern" })
              }
              variant={
                formData.previewType === "modern" ? "default" : "outline"
              }
              className={
                formData.previewType === "modern"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : ""
              }
            >
              Modern
            </Button>
            <Button
              onClick={() =>
                setFormData({ ...formData, previewType: "minimal" })
              }
              variant={
                formData.previewType === "minimal" ? "default" : "outline"
              }
              className={
                formData.previewType === "minimal"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : ""
              }
            >
              Minimal
            </Button>
          </div>

          {/* Standard Preview */}
          {formData.previewType === "standard" && (
            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    The Perfect School
                  </h3>
                  <p className="text-gray-500">123 Education Lane</p>
                  <p className="text-gray-500">Knowledge City, KS 12345</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    Bill #{formData.billNumber}
                  </p>
                  <p className="text-gray-500">
                    Date: {new Date(formData.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Bill To:
                  </h4>
                  <p className="font-medium">{formData.parentName}</p>
                  <p>Parent of {formData.studentName}</p>
                  {formData.class && <p>Class: {formData.class}</p>}
                  {formData.term && <p>Term: {formData.term}</p>}
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">
                          ${item.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">
                        ${calculateTotal().toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>Payment Terms: Due within 30 days</p>
                <p>Thank you for your prompt payment.</p>
              </div>
            </div>
          )}

          {/* Modern Preview */}
          {formData.previewType === "modern" && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <div className="flex flex-col items-center mb-8 border-b pb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">PS</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-1">
                  The Perfect School
                </h3>
                <p className="text-gray-500 text-center">
                  123 Education Lane, Knowledge City, KS 12345
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-blue-700 mb-1">
                      Invoice
                    </h4>
                    <p className="text-xl font-bold text-gray-900">
                      #{formData.billNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-sm uppercase tracking-wider text-blue-700 mb-1">
                      Date Issued
                    </h4>
                    <p className="text-gray-900">
                      {new Date(formData.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm uppercase tracking-wider text-blue-700 mb-3">
                  Bill To
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-lg font-semibold">{formData.parentName}</p>
                  <p className="text-gray-600">
                    Parent of {formData.studentName}
                  </p>
                  {formData.class && (
                    <p className="text-gray-600">Class: {formData.class}</p>
                  )}
                  {formData.term && (
                    <p className="text-gray-600">Term: {formData.term}</p>
                  )}
                </div>
              </div>

              <h4 className="text-sm uppercase tracking-wider text-blue-700 mb-3">
                Invoice Items
              </h4>
              <div className="overflow-hidden rounded-lg border border-gray-200 mb-6">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="text-blue-700">
                        Description
                      </TableHead>
                      <TableHead className="text-right text-blue-700">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.items.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-b border-gray-100"
                      >
                        <TableCell className="font-medium">
                          {item.description}
                        </TableCell>
                        <TableCell className="text-right">
                          ${item.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end mb-8">
                <div className="w-64 bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-blue-200">
                    <span>Total:</span>
                    <span className="text-blue-700">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 text-center">
                <p className="text-blue-600 font-medium mb-1">
                  Payment Terms: Due within 30 days
                </p>
                <p className="text-gray-500">
                  Thank you for your business with The Perfect School!
                </p>
              </div>
            </div>
          )}

          {/* Minimal Preview */}
          {formData.previewType === "minimal" && (
            <div className="bg-white p-8 max-w-3xl mx-auto">
              <div className="border-b border-gray-900 pb-4 mb-8">
                <h3 className="text-2xl font-bold tracking-tight mb-1">
                  THE PERFECT SCHOOL
                </h3>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">
                    Invoice #{formData.billNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(formData.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="font-medium">{formData.parentName}</p>
                <p className="text-gray-600">
                  Parent of {formData.studentName}
                </p>
                {formData.class && (
                  <p className="text-gray-600">Class: {formData.class}</p>
                )}
                {formData.term && (
                  <p className="text-gray-600">Term: {formData.term}</p>
                )}
              </div>

              <table className="w-full mb-8 text-left">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3">{item.description}</td>
                      <td className="py-3 text-right">
                        ${item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-medium">
                    <td className="pt-4">Total</td>
                    <td className="pt-4 text-right">
                      ${calculateTotal().toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="text-sm text-gray-600 border-t border-gray-200 pt-4 mt-8">
                <p>Payment due within 30 days.</p>
                <p className="mt-1">
                  The Perfect School · 123 Education Lane · Knowledge City, KS
                  12345
                </p>
              </div>
            </div>
          )}

          {/* Preview Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleBackToEdit}>
              Back to Edit
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveAsDraft}
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              Save as Draft
            </Button>
            <Button
              onClick={handleProcess}
              className="bg-green-600 hover:bg-green-700"
            >
              Process Bill
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBillForm;
