import { useState } from "react";
import {
  Pencil,
  Upload,
  Trash2,
  ArrowLeft,
} from "lucide-react";

export default function AdminUpdateProperties() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Luxury Villa",
      price: "7500000",
      bedrooms: 3,
      bathrooms: 2,
      location: "Gurgaon",
      images: [],
      description: "Premium luxury villa",
    },
    {
      id: 2,
      name: "Modern Apartment",
      price: "4500000",
      bedrooms: 2,
      bathrooms: 2,
      location: "Delhi",
      images: [],
      description: "City side apartment",
    },
  ]);

  const [editingProperty, setEditingProperty] = useState(null);

  /* ================= CRUD ================= */

  const handleDelete = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const handleImageAdd = (files) => {
    setEditingProperty((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleImageReplace = (index, file) => {
    setEditingProperty((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? file : img)),
    }));
  };

  const handleImageRemove = (index) => {
    setEditingProperty((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    setProperties((prev) =>
      prev.map((p) => (p.id === editingProperty.id ? editingProperty : p))
    );
    setEditingProperty(null);
  };

  /* ================= EDIT PAGE ================= */

  if (editingProperty) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
        <button
          onClick={() => setEditingProperty(null)}
          className="mb-4 flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-400"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="text-2xl md:text-3xl font-semibold text-purple-400 mb-6">
          Edit Property
        </h1>

        <div className="max-w-4xl rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2"
              value={editingProperty.name}
              onChange={(e) =>
                setEditingProperty({ ...editingProperty, name: e.target.value })
              }
              placeholder="Property Name"
            />

            <input
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2"
              value={editingProperty.price}
              onChange={(e) =>
                setEditingProperty({ ...editingProperty, price: e.target.value })
              }
              placeholder="Price"
            />

            <input
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2"
              value={editingProperty.bedrooms}
              onChange={(e) =>
                setEditingProperty({
                  ...editingProperty,
                  bedrooms: e.target.value,
                })
              }
              placeholder="Bedrooms"
            />

            <input
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2"
              value={editingProperty.bathrooms}
              onChange={(e) =>
                setEditingProperty({
                  ...editingProperty,
                  bathrooms: e.target.value,
                })
              }
              placeholder="Bathrooms"
            />

            <input
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 md:col-span-2"
              value={editingProperty.location}
              onChange={(e) =>
                setEditingProperty({
                  ...editingProperty,
                  location: e.target.value,
                })
              }
              placeholder="Location"
            />
          </div>

          {/* ================= IMAGES ================= */}

          <div className="mt-6">
            <p className="text-sm text-zinc-400 mb-2">Property Images</p>

            <div className="flex gap-3 overflow-x-auto">
              {editingProperty.images.map((img, i) => (
                <div
                  key={i}
                  className="relative h-24 w-24 rounded-lg overflow-hidden border border-zinc-800"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    className="h-full w-full object-cover"
                    alt=""
                  />

                  {/* Delete */}
                  <button
                    onClick={() => handleImageRemove(i)}
                    className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>

                  {/* Replace */}
                  <label className="absolute bottom-1 right-1 bg-black/60 rounded-full p-1 cursor-pointer">
                    <Upload size={14} className="text-purple-400" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageReplace(i, e.target.files[0])
                      }
                    />
                  </label>
                </div>
              ))}
            </div>

            {/* ADD IMAGE BUTTON (FIXED POSITION) */}
            <label className="mt-4 inline-flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-zinc-400 hover:border-purple-400">
              <Upload size={16} /> Add Images
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageAdd(Array.from(e.target.files))}
              />
            </label>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 w-full rounded-lg bg-purple-600 py-2.5 hover:bg-purple-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  /* ================= LIST PAGE ================= */

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-purple-400 mb-6">
        Update Properties
      </h1>

      <div className="grid gap-4">
        {properties.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="font-medium text-lg">{item.name}</p>
                <p className="text-sm text-zinc-400">{item.location}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProperty(item)}
                  className="flex items-center gap-2 rounded-lg border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-sm text-purple-400"
                >
                  <Pencil size={14} /> Update
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-400"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
