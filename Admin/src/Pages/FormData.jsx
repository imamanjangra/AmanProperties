import { useEffect, useState } from "react";
import FormResponseCard from "../Components/FormResponseCard";
import toast from "react-hot-toast";
import API from "../Services/API";

export default function FormData() {
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState("");

  const fetchForm = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/forms");
      setFormData(data);
    } catch (error) {
      console.log("Failed to fetch Form data", error);
      toast.error("Failed to Fetch Form data ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForm();
  }, []);
  console.log(formdata);

  const copyNumber = (number) => {
    try {
      navigator.clipboard.writeText(number);
      toast.success("Mobile Number Copy to Clipboard ");
    } catch (error) {
      toast.error("Failed to copy Mobile NUmber! ");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/form/${id}`);
      setFormData(formdata.filter((item) => item._id !== id));
      toast.success("Delete Todo successfully");
    } catch (error) {
      console.log("Failed to delete Form data");
      toast.error("Failed to Delete Form data");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-purple-400">
          Form Responses
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          User inquiries from website forms
        </p>
      </div>

      <div className="grid gap-4 ">
        {loading ? (
          <div className="text-sm text-gray-500">loading...</div>
        ) : formdata.length === 0 ? (
          <div className="text-sm text-gray-500">no responses</div>
        ) : (
          formdata.map((item) => (
            <FormResponseCard
              key={item._id}
              item={item}
              onDelete={handleDelete}
              onCopy={copyNumber}
            />
          ))
        )}
      </div>
    </div>
  );
}
